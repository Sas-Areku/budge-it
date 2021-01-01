import React from 'react'

export function RemoveModal(props) {
  return (
    <div className="remove-modal-container">
      <div className="remove-modal">
        <h3>Are you sure?</h3>
        <p>Removing a category will permanently remove all items within it.</p>

        <div className="btn-wrapper">
          <button 
            className="confirm-btn" 
            onClick={(e) => props.confirmRemove(e)}
          >
            Remove
          </button>

          <button 
            className="cancel-btn" 
            onClick={() => props.toggleRemove()}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}