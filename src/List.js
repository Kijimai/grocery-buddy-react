import React from "react"
import { FaEdit, FaTrash, FaRegWindowClose } from "react-icons/fa"
const List = ({ items, isEditing, removeItem, editItem, undoEdit }) => {
  return (
    <div className="grocery-list">
      {items.map((item) => {
        const { id, title } = item
        return (
          <article key={id} className="grocery-item">
            <p contentEditable="true" className="title">
              {title}
            </p>
            <div className="btn-container">
              <button
              title="Edit this item"
                onClick={() => editItem(id)}
                type="button"
                className="edit-btn"
              >
                <FaEdit />
              </button>
              {isEditing && <button onClick={undoEdit} type='button' className="undo-edit" title="Undo edit mode">
                <FaRegWindowClose />
              </button> }

              <button
              title="Delete this item"
                onClick={() => removeItem(id)}
                type="button"
                className="delete-btn"
              >
                <FaTrash />
              </button>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default List
