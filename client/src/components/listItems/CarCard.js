import { Card } from "antd";
import { useState } from "react";
import UpdateCar from "../forms/UpdateCar";
import { EditOutlined } from "@ant-design/icons";
import RemoveCar from "../buttons/RemoveCar";

const CarCard = (props) => {


  const [editMode, setEditmode] = useState(false);

  const handleEditButton = () => {
    setEditmode(!editMode);
  };

  return (
    <>
      {editMode ? (
        <UpdateCar
          carsOwned={props}
          onCancel={handleEditButton}
          listOfPeople={props.listOfPeople}
        />
      ) : (
        <Card
          type="inner"
          title={`${props.year} ${props.make} ${props.model} -> $ ${props.price}`}
          style={{ margin: "1rem 0" }}
          actions={[
            <EditOutlined key="edit" onClick={handleEditButton} />,
            <RemoveCar id={props.id} />,
          ]}
        ></Card>
      )}
    </>
  );
};

export default CarCard;
