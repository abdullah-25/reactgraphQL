import axios from "axios";
import Github from "./db";
import { useEffect, useState, useCallback } from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import InitialState from "./demoGrid";

function App() {
  const [userName, setUserName] = useState("");
  const [userRepository, setUserRepository] = useState(null);

  const fetchData = useCallback(() => {
    const githubQuery = {
      query: `{
        
          viewer {
            name
          }
          search(
            query: "user:abdullah-25"
            type: REPOSITORY
            first: 10
          ) {
            nodes {
              ... on Repository {
                name
                description
                id
                url
                viewerSubscription
              }
            }
          }
        
      }`,
    };
    axios
      .post(Github.baseURL, githubQuery, { headers: Github.headers })
      .then((response) => {
        setUserName(response.data.data.viewer.name);
        setUserRepository(response.data.data.search.nodes);
        // console.log(response.data.data.viewer.search);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App container mt-5">
      <h1 className="text-primary">
        <i className="bi bi-diagram-2-fill"></i> Repos
      </h1>
      <p>Hi there {userName}</p>

      {userRepository ? (
        <InitialState props={userRepository} />
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}

export default App;
