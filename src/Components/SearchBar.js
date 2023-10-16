// SearchBar.js
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const SearchBar = ({ handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <Form className="mb-3">
      <Form.Group controlId="formSearch">
        <Form.Label>Search Users</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter user's name"
          value={searchQuery}
          onChange={handleChange}
        />
      </Form.Group>
    </Form>
  );
};

export default SearchBar;
