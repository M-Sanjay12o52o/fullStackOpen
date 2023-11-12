import React from "react";
import { useState } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonsForm from "./components/PersonForm";

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

      <Filter searchQuery={searchQuery} handleSearch={handleSearch} />

      <h2>Add a new</h2>
      <PersonsForm
        newName={newName}
        number={number}
        handleName={handleName}
        handleNumber={handleNumber}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>

      <Persons persons={persons} searchQuery={searchQuery} />

      <div>
        debug: {newName} {number}
      </div>
    </div>
  );
};

export default App;
