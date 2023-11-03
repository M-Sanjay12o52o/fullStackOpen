import { useState } from "react";
import "./App.css";

const StatisticLine = (props) => {
  return (
    <tr style={{ border: "2px solid black" }}>
      <td style={{ border: "2px solid black" }}>{props.text}</td>
      <td style={{ border: "2px solid black" }}>{props.value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  return (
    <>
      <h2>Statistics</h2>
      <table style={{ border: "2px solid black" }}>
        <tbody>
          <StatisticLine text="Good" value={props.good} />
          <StatisticLine text="Neutral" value={props.neutral} />
          <StatisticLine text="Bad" value={props.bad} />
          <StatisticLine text="Total" value={props.total} />
          <StatisticLine text="Average" value={props.average} />
          <StatisticLine text="Positive" value={`${props.positive}`} />
        </tbody>
      </table>
    </>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState(0);

  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  console.log("votes: ", votes);

  var ary = new Uint8Array(...votes);

  const average = total > 0 ? ((good - bad) / total).toFixed(2) : 0;
  const positive = total > 0 ? ((good / total) * 100).toFixed(2) : 0;

  const handleAnecdotes = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length);

    // setSelected(anecdotes[randomNumber]);
    setSelected(randomNumber);
  };

  const handleVote = () => {
    const newVotes = [...votes];
    console.log("newVotes: ", newVotes);
    newVotes[selected] += 1;
    console.log("newVotes[selected] ", newVotes[selected]);
    console.log("selected: ", selected);
    setVotes(newVotes);
  };

  const highestVote = Math.max(...votes);
  const indexOfHighestVote = votes.indexOf(highestVote);
  console.log("indexOfHighestVote ", indexOfHighestVote);
  const anecdoteWithHighestVote = anecdotes[indexOfHighestVote];

  return (
    <div>
      {selected !== 0 ? (
        <div>
          <p>{anecdotes[selected]}</p>
          <p>Votes: {votes[selected] || 0} votes</p>
        </div>
      ) : null}
      {selected == 0 ? (
        <div>
          <button onClick={handleVote}>vote</button>
          <button onClick={handleAnecdotes}>anecdote</button>
        </div>
      ) : (
        <div>
          <button onClick={handleVote}>vote</button>
          <button onClick={handleAnecdotes}>next anecdote</button>
        </div>
      )}

      {indexOfHighestVote > 0 ? <h2>Anecdote with most votes</h2> : null}

      {indexOfHighestVote > 0 ? <p>{anecdoteWithHighestVote}</p> : null}

      <h1>Give feedback</h1>
      <br />
      <button
        onClick={() => {
          setGood(good + 1);
          setTotal(total + 1);
        }}
      >
        Good
      </button>
      <button
        onClick={() => {
          setNeutral(neutral + 1);
          setTotal(total + 1);
        }}
      >
        Neutral
      </button>
      <button
        onClick={() => {
          setBad(bad + 1);
          setTotal(total + 1);
        }}
      >
        Bad
      </button>
      <br />
      <br />
      {total > 0 ? (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={total}
          average={average}
          positive={positive}
          votes={votes}
        />
      ) : (
        <p>No feedback given yet</p>
      )}
    </div>
  );
}

export default App;
