import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", id: 1 }]);

  const [newName, setNewName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);
    const nameObject = {
      name: newName,
      id: persons.length + 1,
    };

    console.log("nameObject.name: ", nameObject.name);

    {
      persons.some((person) => nameObject.name === person.name)
        ? alert(`${nameObject.name} is already added to phonebook`)
        : setPersons(persons.concat(nameObject));
    }

    setNewName("");
  };

  // useEffect(() => {
  //   console.log("persons ", persons);
  // }, [persons]);

  const handleInput = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.id}>{person.name}</p>
      ))}
      <div>debug: {newName}</div>
    </div>
  );
};

export default App;
