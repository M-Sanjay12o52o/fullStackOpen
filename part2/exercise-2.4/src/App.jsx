const Courses = (props) => {
  // const courseNames = props.courses.map((course) => course.name);
  // console.log("courseNames ", courseNames);

  // const partsName = props.courses.map((course) =>
  //   course.parts.map((part) => <li key={part.id}>{part.name}</li>)
  // );
  // console.log("partsName ", partsName);

  return (
    <div>
      <h1>Web development curriculum</h1>

      {props.courses.map((course) => (
        <div key={course.id}>
          <h2>{course.name}</h2>
          <ul>
            {course.parts.map((part) => (
              <li key={part.id}>
                {part.name} {part.exercises}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
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
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
    {
      name: "Full Stack Web Development",
      id: 3,
      parts: [
        {
          name: "Front-end Technologies",
          exercises: 15,
          id: 1,
        },
        {
          name: "Back-end Technologies",
          exercises: 12,
          id: 2,
        },
      ],
    },
    {
      name: "Data Science and Machine Learning",
      id: 4,
      parts: [
        {
          name: "Introduction to Data Science",
          exercises: 8,
          id: 1,
        },
        {
          name: "Machine Learning Algorithms",
          exercises: 13,
          id: 2,
        },
      ],
    },
  ];

  return <Courses courses={courses} />;
};

export default App;
