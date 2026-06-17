'use client'

import { Trash2 } from 'lucide-react'
import '../styles/delete-popup.css'

/**
 * Reusable delete confirmation popup.
 *
 * Props:
 *   isOpen    — boolean, controls visibility
 *   itemName  — string shown in the body ("Are you sure you want to delete …?")
 *   loading   — boolean, disables the confirm button while the API call is in flight
 *   onConfirm — called when the user clicks "Delete"
 *   onCancel  — called when the user clicks "Cancel" or the overlay
 */
export default function DeleteConfirmPopup({ isOpen, itemName, loading, onConfirm, onCancel }) {
  if (!isOpen) return null

  return (
    <div className="del-popup-overlay" onClick={onCancel}>
      <div className="del-popup" onClick={(e) => e.stopPropagation()}>
        <div className="del-popup-icon">
          <Trash2 size={22} />
        </div>

        <h3 className="del-popup-title">Delete Item</h3>
        <p className="del-popup-desc">
          Are you sure you want to delete{' '}
          {itemName ? <span className="del-popup-name">"{itemName}"</span> : 'this item'}?
          {' '}This action cannot be undone.
        </p>

        <div className="del-popup-actions">
          <button className="del-popup-cancel" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
          <button className="del-popup-confirm" onClick={onConfirm} disabled={loading}>
            {loading ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}
