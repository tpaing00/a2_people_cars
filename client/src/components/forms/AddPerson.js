import { useMutation } from "@apollo/client";
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ADD_PERSON, GET_PEOPLE } from "../../graphql/queries";
import FormTitle from "../layout/Title";

const AddPerson = () => {
  const [form] = Form.useForm();
  const [personId, setPersonId] = useState(uuidv4());
  const [addPerson] = useMutation(ADD_PERSON);
  const [, updateState] = useState();

  useEffect(() => {
    updateState({});
  }, []);

  const handleSubmit = (formData) => {
    const { firstName, lastName } = formData;

    setPersonId(uuidv4());

    addPerson({
      variables: {
        id: personId,
        firstName,
        lastName,
      },
      update: (cache, { data: { addPerson } }) => {
        const existingData = cache.readQuery({ query: GET_PEOPLE });
        cache.writeQuery({
          query: GET_PEOPLE,
          data: {
            ...existingData,
            people: [...existingData.people, addPerson],
          },
        });
      },
    });
    form.resetFields();
  };

  return (
    <>
      <FormTitle formTitle="Add Person" />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Form
          form={form}
          name="add-person-form"
          layout="inline"
          size="default"
          onFinish={handleSubmit}
          style={{ margin: "2rem 0" }}
        >
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: "Please enter the first name" }]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: "Please enter the last name" }]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                disabled={
                  !form.isFieldsTouched(true) ||
                  form.getFieldsError().some(({ errors }) => errors.length)
                }
              >
                Add Person
              </Button>
            )}
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default AddPerson;
