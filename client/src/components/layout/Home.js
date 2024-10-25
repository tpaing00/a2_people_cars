import { useQuery } from "@apollo/client";
import AddCar from "../forms/AddCar";
import AddPerson from "../forms/AddPerson";
import PeopleCar from "../lists/PeopleCar";
import { GET_PEOPLE } from "../../graphql/queries";

const Home = () => {
  const {  data } = useQuery(GET_PEOPLE);

  return (
    <div>
      <h1 style={heading}>PEOPLE AND THEIR CARS</h1>
      <AddPerson />
      <AddCar Peopledetails={data} />
      <PeopleCar />
    </div>
  );
};


export default Home;

const heading = {
    borderBottomColor: "lightgray",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    fontSize: 20,
    textAlign: "center",
    paddingBottom: "2rem",
  };
