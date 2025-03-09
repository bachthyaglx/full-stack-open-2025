const PersonForm = (props) => {
    const {addPerson, newName, handleNameChange, newNumber, handleNumberChange} = props
    return (
        <div>
            <form onSubmit={addPerson}>
                <div>name: <input value={newName} onChange={handleNameChange} /></div>
                <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default PersonForm 
