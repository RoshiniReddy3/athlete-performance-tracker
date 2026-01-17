import { useEffect, useState } from "react";
import "./App.css";

function App() {
  // -------- Athlete --------
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [sport, setSport] = useState("");
  const [athleteMsg, setAthleteMsg] = useState("");

  // -------- Athletes list --------
  const [athletes, setAthletes] = useState([]);

  // -------- Score --------
  const [athleteId, setAthleteId] = useState("");
  const [testName, setTestName] = useState("");
  const [value, setValue] = useState("");
  const [scoreMsg, setScoreMsg] = useState("");

  // -------- Leaderboard --------
  const [leaderboard, setLeaderboard] = useState([]);

  // -------- Fetch athletes & leaderboard --------
  const loadData = async () => {
    const a = await fetch("http://localhost:5000/athletes");
    setAthletes(await a.json());

    const l = await fetch("http://localhost:5000/leaderboard");
    setLeaderboard(await l.json());
  };

  useEffect(() => {
    loadData();
  }, []);

  // -------- Add Athlete --------
  const addAthlete = async () => {
    setAthleteMsg("");

    try {
      const res = await fetch("http://localhost:5000/athletes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          role: "coach"
        },
        body: JSON.stringify({
          name,
          age: Number(age),
          sport
        })
      });

      if (!res.ok) throw new Error();

      setAthleteMsg("Athlete added successfully!");
      setName("");
      setAge("");
      setSport("");
      loadData();
    } catch {
      setAthleteMsg("Error adding athlete");
    }
  };

  // -------- Add Score --------
  const addScore = async () => {
    setScoreMsg("");

    try {
      const res = await fetch("http://localhost:5000/scores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          role: "coach"
        },
        body: JSON.stringify({
          athlete_id: athleteId,
          test_name: testName,
          value: Number(value)
        })
      });

      if (!res.ok) throw new Error();

      setScoreMsg("Score added successfully!");
      setAthleteId("");
      setTestName("");
      setValue("");
      loadData();
    } catch {
      setScoreMsg("Error adding score");
    }
  };

  return (
    <div className="container">
      <h1>Athlete Performance Tracker</h1>

      {/* Add Athlete */}
      <section className="card">
        <h2>Add Athlete</h2>

        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={e => setAge(e.target.value)}
        />

        <input
          placeholder="Sport"
          value={sport}
          onChange={e => setSport(e.target.value)}
        />

        <button onClick={addAthlete}>Add Athlete</button>
        {athleteMsg && <p>{athleteMsg}</p>}
      </section>

      {/* Add Score */}
      <section className="card">
        <h2>Add Test Score</h2>

        <select value={athleteId} onChange={e => setAthleteId(e.target.value)}>
          <option value="">Select Athlete</option>
          {athletes.map(a => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>

        <input
          placeholder="Test Name (e.g. 30m Sprint)"
          value={testName}
          onChange={e => setTestName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Value"
          value={value}
          onChange={e => setValue(e.target.value)}
        />

        <button onClick={addScore}>Add Score</button>
        {scoreMsg && <p>{scoreMsg}</p>}
      </section>

      {/* Leaderboard */}
      <section className="card">
        <h2>Leaderboard</h2>

        <table width="100%" border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Athlete</th>
              <th>Total Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((l, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{l.name}</td>
                <td>{l.total_score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default App;
