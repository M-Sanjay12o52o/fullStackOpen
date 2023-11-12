import React from "react";

const Persons = (props) => {
  console.log(props);

  return (
    <div>
      {props.persons
        .filter((person) =>
          person.name.toLowerCase().includes(props.searchQuery.toLowerCase())
        )
        .map((person) => (
          <div>
            <p key={person.id}>
              {person.name} {person.number}
            </p>
            <button onClick={() => props.handleremove(person.id, person.name)}>
              delete
            </button>
          </div>
        ))}
    </div>
  );
};

export default Persons;
