import React from "react";
import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonsForm from "./components/PersonForm";
import axios from "axios";
import services from "./services/contact";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");

  const [number, setNumber] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const [message, setMessage] = useState(null);

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/api/persons").then((response) => {
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
    };

    const existingPerson = persons.find(
      (person) => person.name === nameObject.name
    );

    if (existingPerson) {
      if (
        window.confirm(
          `${nameObject.name} is already added to phonebook, replace the old number with the new one?`
        )
      ) {
        services.update(existingPerson.id, nameObject).then((result) => {
          console.log("Updated Number");

          // Fetch the updated data after the update is successful
          services.getAll().then((updatedData) => {
            setPersons(updatedData);
          });
        });
      }
    } else {
      services.create(nameObject).then((returnedObject) => {
        setPersons(persons.concat(returnedObject));
        setMessage(`Added ${nameObject.name}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
    }

    setNewName("");
    setNumber("");

    // services.create(nameObject).then((returnedObject) => {
    //   setNewName(returnedObject.name);
    //   setNumber(returnedObject.number);

    //   setNewName("");
    //   setNumber("");
    // });

    // console.log("nameObject.name: ", nameObject.name);
    // console.log("nameObject.number: ", nameObject.number);

    // if (persons.some((person) => nameObject.name === person.name)) {
    //   if (
    //     window.confirm(
    //       `${nameObject.name} is already added to pho
    //       nebook, replace the old number with the new one?`
    //     )
    //   ) {
    //     services.update(id, nameObject).then((result) => {
    //       console.log("Updated number");
    //     });
    //   }
    // }

    // persons.some((person) => nameObject.name === person.name);
    // setPersons(persons.concat(nameObject));
    // setMessage(`Added ${nameObject.name}`);
    // setTimeout(() => {
    //   setMessage(null);
    // }, 5000);
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

  const handleremove = (id, person) => {
    console.log("id: ", id);
    console.log("person: ", person);

    if (window.confirm(`Delete ${person}?`))
      console.log("id from window.confirm: ", id);
    services.remove(id).then(() => {
      setPersons(persons.filter((person) => person.id !== id));
      console.log("Remove triggered");
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
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
      <Persons
        handleremove={handleremove}
        persons={persons}
        searchQuery={searchQuery}
      />
      <div>
        debug: {newName} {number}
      </div>
    </div>
  );
};

export default App;
