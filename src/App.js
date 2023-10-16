// App.js
import React, { useState, useEffect } from 'react';
import SearchBar from './Components/SearchBar';
import UserTable from './Components/UserTable';
import axios from 'axios';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    if (searchQuery) {
      axios
        .get(`https://api.github.com/search/users?q=${searchQuery}`)
        .then((response) => {
          const fetchedUsers = response.data.items;
          const requests = fetchedUsers.map((user) =>
            axios.get(`https://api.github.com/users/${user.login}`)
          );
          axios.all(requests).then(
            axios.spread((...responses) => {
              const updatedUsers = responses.map((res, index) => {
                console.log('Response data:', res.data); // Check the structure of the response data
                if (res.data.followers !== undefined) {
                  return {
                    id: fetchedUsers[index].id,
                    login: fetchedUsers[index].login,
                    followers: res.data.followers,
                  };
                } else {
                  console.error('Followers data not found in response:', res.data);
                  return null;
                }
              });
              setUsers(updatedUsers.filter((user) => user !== null));
            })
          );
        })
        .catch((error) => {
          console.error('Error fetching data from GitHub API: ', error);
        });
    }
  }, [searchQuery]);
  

  return (
    <div className="App">
      <SearchBar handleSearch={handleSearch} />
      {users.length > 0 ? (
        <UserTable users={users} />
      ) : (
        <p>No users to display. Search for a user to begin.</p>
      )}
    </div>
  );
};

export default App;
