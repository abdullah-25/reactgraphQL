import axios from "axios";
import Github from "./db";
import { useEffect, useState } from "react";

function App() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const githubQuery = {
      query: `{
        viewer{
          name
        }
      }`,
    };
    axios
      .post(Github.baseURL, githubQuery, { headers: Github.headers })
      .then((response) => {
        setUserName(response.data.data.viewer.name);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App container mt-5">
      <h1 className="text-primary">
        <i className="bi bi-diagram-2-fill"></i> Repos
      </h1>
      <p>Hi there {userName}</p>
    </div>
  );
}

export default App;
