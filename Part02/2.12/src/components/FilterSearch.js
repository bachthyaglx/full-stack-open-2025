import React from "react";

const FilterSearch = ({input, handleSearchCountry}) => {
    return (
      <div>
        find countries <input value={input} onChange={handleSearchCountry} />
      </div>
    )
  }

export default FilterSearch

