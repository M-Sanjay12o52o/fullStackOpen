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

export default Courses;
