//Deploy external lib to generate unique id!? UUID
import React, { useState, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';
import List from "./List"
import Alert from "./Alert"

const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  if(list) {
    return JSON.parse(localStorage.getItem('list'))
  } else {
    return []
  }
}

function App() {
  const [name, setName] = useState("")
  const [list, setList] = useState(getLocalStorage())
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name) {
      //display alert if submitted with empty values
      showAlert(true, "Please enter a valid value!", "danger")
    } else if (name && isEditing) {
      //deal with edit function
      const newEdit = list.map((item) => {
        if (item.id === editID) {
          return { ...item, title: name }
        }
        return item
      })
      setList(newEdit)
      setName("")
      setEditID(null)
      setIsEditing(false)
      showAlert(true, "Value changed!", "success")
    } else {
      // show alert
      showAlert(true, "A new item has been added to the list.", "success")
      const newItem = { id: uuidv4(), title: name }
      setList([...list, newItem])
      setName("")
    }
  }

  //This function now has multiple uses, besides setting the alert, it can also be passed into a component instead of being hardcoded within the conditional above
  const showAlert = (show = false, message = "", type = "") => {
    setAlert({ show, type, message })
  }

  const handleClear = () => {
    setList([])
    showAlert(true, "All items have been cleared from the list.", "success")
  }

  const removeItem = (id) => {
    showAlert(true, "item removed", "danger")
    const newItems = list.filter((listItem) => id !== listItem.id)
    setList(newItems)
  }

  const editItem = (id) => {
    const editableItem = list.find((item) => item.id === id)
    setIsEditing(true)
    setEditID(id)
    setName(editableItem.title)
  }

  const undoEdit = (id) => {
    setIsEditing(false)
    setName("")
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  return (
    <>
      <section className="section-center">
        <form className="grocery-form" onSubmit={handleSubmit}>
          {alert.show && (
            <Alert {...alert} removeAlert={showAlert} list={list} />
          )}
          <h3>Grocery Buddy</h3>
          <div className="form-control">
            <input
              type="text"
              className="grocery"
              placeholder="ex: eggs, milk, etc"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button className="submit-btn" type="submit">
              {isEditing ? "edit" : "submit"}
            </button>
          </div>
        </form>
        <div className="grocery-container">
          <List
            items={list}
            isEditing={isEditing}
            removeItem={removeItem}
            editItem={editItem}
            undoEdit={undoEdit}
          />
          <button onClick={handleClear} className="clear-btn">
            Clear Items
          </button>
        </div>
      </section>
    </>
  )
}

export default App
