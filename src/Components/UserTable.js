// UserTable.js
import React from 'react';
import { Table } from 'react-bootstrap';

const UserTable = ({ users }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>User Name</th>
          <th>Followers</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={user.id}>
            <td>{index + 1}</td>
            <td>{user.login}</td>
            <td>{user.followers}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UserTable;
