import React from "react";

const FilterSearch = ({input, handleSearchName}) => {
    return (
      <div>
        filter shown with <input value={input} onChange={handleSearchName} />
      </div>
    )
  }

export default FilterSearch