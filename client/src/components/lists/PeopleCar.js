import { useQuery } from "@apollo/client";
import FormTitle from "../layout/Title";
import { GET_PEOPLE } from "../../graphql/queries";
import PersonCard from "../listItems/PersonCard";


const PeopleCarsDetail = () => {
  const { loading, error, data } = useQuery(GET_PEOPLE);

  if (loading) return "loading...";
  if (error) return `Error: ${error.message}`;

  return (
    <div style={{ width: "100%" }}>
      <FormTitle formTitle="Records" />
      {data.people.length > 0 ? (
        data.people.map((person) => (
          <div key={person.id}>
            <PersonCard
              id={person.id}
              firstName={person.firstName}
              lastName={person.lastName}
              carsOwned={person.carsOwned}
              listOfPeople={data.people}
            />
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default PeopleCarsDetail;
