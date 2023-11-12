import React from "react";
import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonsForm from "./components/PersonForm";
import axios from "axios";
import services from "./services/contact";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");

  const [number, setNumber] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise resolved");
      setPersons(response.data);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);
    const nameObject = {
      name: newName,
      number: number,
      // id: persons.length + 1,
    };

    services.create(nameObject).then((returnedObject) => {
      setNewName(returnedObject.name);
      setNumber(returnedObject.number);
    });

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
