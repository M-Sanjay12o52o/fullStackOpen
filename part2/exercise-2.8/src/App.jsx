import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "120-345-345", id: 1 },
  ]);

  const [newName, setNewName] = useState("");

  const [number, setNumber] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);
    const nameObject = {
      name: newName,
      number: number,
      id: persons.length + 1,
    };

    console.log("nameObject.name: ", nameObject.name);
    console.log("nameObject.number: ", nameObject.number);

    {
      persons.some((person) => nameObject.name === person.name)
        ? alert(`${nameObject.name} is already added to phonebook`)
        : setPersons(persons.concat(nameObject));
    }

    setNewName("");
    setNumber("");
  };

  const handleNumber = (event) => {
    setNumber(event.target.value);
  };

  const handleName = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleName} />
        </div>
        <div>
          number: <input value={number} onChange={handleNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
      <div>
        debug: {newName} {number}
      </div>
    </div>
  );
};

export default App;
