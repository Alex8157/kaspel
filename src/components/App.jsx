import React, { useState } from "react";
import TableComponent from "./TableComponent";
import SearchInput from "./SearchInput";

const App = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  return (
    <div style={{ padding: 20 }}>
      <SearchInput onSearch={handleSearch} />
      <TableComponent searchValue={searchValue} />
    </div>
  );
};

export default App;
