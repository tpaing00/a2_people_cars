import { useMutation } from "@apollo/client";
import { Button, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ADD_CAR, GET_PEOPLE } from "../../graphql/queries";
import FormTitle from "../layout/Title";

const AddCar = ({ Peopledetails }) => {
  const [id, setId] = useState(uuidv4());
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  const [addCar] = useMutation(ADD_CAR);

  useEffect(() => {
    forceUpdate();
  }, []);

  const onFinish = (props) => {
    const { year, make, model, price, personId } = props;
    setId(uuidv4());
    addCar({
      variables: {
        id,
        year: parseInt(year),
        make,
        model,
        price: parseFloat(price),
        personId,
      },
      update: (cache, { data: { addCar } }) => {
        const data = cache.readQuery({ query: GET_PEOPLE });

        cache.writeQuery({
          query: GET_PEOPLE,
          data: { ...data, people: [...data.people, addCar] },
        });
      },
    });
    form.resetFields();
  };

  return (
    <>
      <FormTitle formTitle="Add Car" />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Form
          name="add-car-form"
          layout="inline"
          size="default"
          form={form}
          onFinish={onFinish}
          style={{ margin: "2rem 0" }}
        >
          <Form.Item
            name="year"
            label="Year"
            rules={[{ required: true, message: "Please enter year" }]}
          >
            <Input style={{ width: "6rem" }} type="number" placeholder="Year" />
          </Form.Item>

          <Form.Item
            name="make"
            label="Make"
            rules={[{ required: true, message: "Please enter make" }]}
          >
            <Input placeholder="Make" />
          </Form.Item>

          <Form.Item
            name="model"
            label="Model"
            rules={[{ required: true, message: "Please enter model" }]}
          >
            <Input placeholder="Model" />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please enter price" }]}
          >
            <Input
              style={{ width: "6rem" }}
              type="number"
              prefix="$"
              placeholder="Price"
            />
          </Form.Item>

          <Form.Item name="personId" label="Person">
            <Select placeholder="Select a person">
              {Peopledetails ? (
                Peopledetails.people.map((person) => (
                  <Select.Option value={person.id} key={person.id}>
                    {person.firstName} {person.lastName}
                  </Select.Option>
                ))
              ) : (
                <></>
              )}
            </Select>
          </Form.Item>

          <Form.Item
            shouldUpdate={true}
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              marginTop: "1rem",
            }}
          >
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                disabled={
                  !form.isFieldsTouched(true) ||
                  form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
                }
              >
                Add Car
              </Button>
            )}
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default AddCar;
