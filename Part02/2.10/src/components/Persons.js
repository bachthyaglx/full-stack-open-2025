const Persons = ({persons, input}) => {
  //create a new array by filtering the original array
  const filteredNames = persons.filter(i => {
    //if no input, return the original
    if (input==='') {
      return i;
    }
    //return the item which contains the user input
    else {
      return i.name.toLowerCase().includes(input)
    }
  })

  return (
    <div>
      {filteredNames.map(i => <div key={i.id}>{i.name} {i.number}</div>)}
    </div>
  )
}
    
export default Persons