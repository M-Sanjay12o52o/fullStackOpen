import React from "react";

const PersonsForm = (props) => {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <div>
          name: <input value={props.newName} onChange={props.handleName} />
        </div>
        <div>
          number: <input value={props.number} onChange={props.handleNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonsForm;
