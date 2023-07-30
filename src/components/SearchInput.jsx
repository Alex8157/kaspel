// src/components/SearchInput.js
import React from "react";
import { Input } from "antd";

const SearchInput = ({ onSearch }) => {
  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  return (
    <Input
      placeholder="Поиск..."
      allowClear
      onChange={handleSearch}
      style={{ marginBottom: 20 }}
    />
  );
};

export default SearchInput;
