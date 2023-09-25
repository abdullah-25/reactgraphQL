import axios from "axios";
import Github from "./db";
import { useEffect, useState, useCallback } from "react";

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
        console.log(response.data.data.viewer.search);
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
      {console.log(userRepository)}
      {userRepository ? (
        <ul className="list-group list-group-flush">
          {userRepository.map((user) => (
            <li className="list-group-item" key={user.id}>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column">
                  <a className="h5 mb-0 text-decoration-none" href={user.url}>
                    {user.name}
                  </a>
                  <p className="small">{user.description}</p>
                  <span className="px-1 py-0 ms-1 d-inline-block btn btn-sm btn-success">
                    {user.viewerSubscription}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
