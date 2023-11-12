// import mongoose from "mongoose";
const mongoose = require("mongoose");

const password = process.argv[2];

const url = `mongodb+srv://sanjayMERNDb:${password}@cluster1.re8rp8u.mongodb.net/phoneBook?retryWrites=true&w=majority
`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
});

if (process.argv.length < 5) {
  //   console.log("hello from if block");
  //   console.log("give password as argument");
  // Display all persons in the phonebook

  Person.find({}).then((result) => {
    console.log("phone book: ");
    // console.log("hello from inside foreach");
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length >= 5) {
  person.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
    process.exit(1);
  });
}
