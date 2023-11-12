import React from "react";
import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");

  const [number, setNumber] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <p>
        filter shown with -{" "}
        <input value={searchQuery} onChange={handleSearch} />
      </p>
      <form onSubmit={handleSubmit}>
        <h2>Add a new</h2>
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

      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((person) => (
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
