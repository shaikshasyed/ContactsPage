import {RiDeleteBinLine} from 'react-icons/ri'

import './index.css'

const ContactItem = props => {
  const {contactDetails, toggleFavorite, removeContact} = props
  const {id, name, mobileNo, isFavorite} = contactDetails

  const starImgUrl = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/star-filled-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/star-outline-img.png'


  const handlefavorite = () => {
    toggleFavorite(id)
  }

  const handleDelete = () => {
    removeContact(id)
  }

  return (
    <li className="table-row">
      <div className="table-cell name-column">
        <p>{name}</p>
      </div>
      <hr className="separator" />
      <div className="table-cell mobile-no-column">
        <p className="mobile-no-value">{mobileNo}</p>
        <button
          type="button"
          className="favorite-icon-container"
          onClick={handlefavorite}
        >
          <img src={starImgUrl} className="favorite-icon" alt="star" />
        </button>
        <button
          type="button"
          className="delete-icon-container"
          onClick={handleDelete}
        >
          <RiDeleteBinLine className="delete-icon" />
        </button>
      </div>
    </li>
  )
}

export default ContactItem
