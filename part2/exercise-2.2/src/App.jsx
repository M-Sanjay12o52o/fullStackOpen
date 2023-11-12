const Course = (props) => {
  const partsName = props.course.parts.map((part) => part.name);

  console.log("partsName, ", partsName);

  const totalExercises = props.course.parts.reduce(
    (total, part) => total + part.exercises,
    0
  );

  return (
    <div>
      <h1>{props.course.name}</h1>
      {props.course.parts.map((part) => (
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      ))}
      <p>total number of exercises {totalExercises}</p>
    </div>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "recoil",
        exercises: 10,
        id: 4,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
