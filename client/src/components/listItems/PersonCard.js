import { Card, Button } from "antd";
import CarCard from "./CarCard";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UpdatePerson from "../forms/UpdatePerson";
import RemovePerson from "../buttons/RemovePerson";

const PersonCard = ({ id, firstName, lastName, carsOwned, listOfPeople }) => {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const navigateToPersonDetails = (personId) => {
    navigate(`/people/${personId}`);
  };

  const renderCarList = () =>
    carsOwned.length > 0
      ? carsOwned.map((car) => (
          <CarCard
            key={car.id}
            id={car.id}
            year={car.year}
            make={car.make}
            model={car.model}
            price={car.price}
            personId={car.personId}
            listOfPeople={listOfPeople}
          />
        ))
      : null;

  return (
    <>
      {isEditing ? (
        <UpdatePerson
          id={id}
          firstName={firstName}
          lastName={lastName}
          onCancel={toggleEditMode}
          carList={renderCarList()}
        />
      ) : (
        <Card
          title={`${firstName} ${lastName}`}
          style={{ margin: "1rem 0" }}
          actions={[
            <EditOutlined key="edit" onClick={toggleEditMode} />,
            <RemovePerson id={id} />,
          ]}
        >
          {renderCarList()}
          <Button onClick={() => navigateToPersonDetails(id)} style={{ marginTop: "10px" }}>
            Learn More
          </Button>
        </Card>
      )}
    </>
  );
};

export default PersonCard;
