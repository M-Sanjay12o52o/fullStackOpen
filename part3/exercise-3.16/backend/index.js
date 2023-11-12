import express from "express";
const app = express();
import Person from "./models/phonebook.js";
import cors from "cors";

app.use(cors());

const PORT = 3001;

app.use(express.json());

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((people) => {
    response.json(people);
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((err) => {
      console.error("Error saving contact details: ", err);
      response.status(500).json({ err: "Internal Server Error" });
    });
});

app.delete("/api/persons/:id", (request, response, next) => {
  // const id = Number(request.params.id);
  const id = request.params.id;

  console.log("id from app.delete: ", id);
  console.log(typeof id, "type of id from app.delete");

  console.log("Deleting person with ID:", id);

  Person.findByIdAndDelete(id)
    .then((result) => {
      if (result) {
        response.status(204).end();
      } else {
        response.status(404).json({ error: "Person not found" });
      }
    })
    .catch((error) => next(error));
});

app.get("/info", (request, response) => {
  Person.countDocuments({})
    .then((personsLength) => {
      const currentTime = Date.now();

      console.log("current time: ", currentTime);
      console.log("persons length: ", personsLength);

      response.send(
        `<p>Phonebook has info for ${personsLength} people</p><p>${new Date(
          currentTime
        )}</p>`
      );
    })
    .catch((err) => {
      console.error("Error fetching persons count: ", err);
      response.status(500).json({ error: "Internal Server Error" });
    });
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
