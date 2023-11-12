const express = require("express");
const app = express();

const PORT = 3001;

app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  const currentTime = Date.now();
  const personsLength = persons.length;

  console.log("current time: ", currentTime);
  console.log("persons length: ", personsLength);

  response.send(
    `<p>Phonebook has info for ${personsLength} people</p><p>${new Date(
      currentTime
    )}</p>`
  );
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
