const Filter = ({input, handleSearchName}) => {
    return (
      <div>
        filter shown with <input value={input} onChange={handleSearchName} />
      </div>
    )
  }

export default Filter