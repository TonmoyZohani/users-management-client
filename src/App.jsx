import { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
      {" "}
      <h2>Users Management System</h2> <br></br> Numbers of Users:{" "}
      {users.length}
    </div>
  );
}

export default App;
