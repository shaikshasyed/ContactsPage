import {Component} from 'react'
import ContactItem from './components/ContactItem'

import './App.css'

const initialContactsList = [
  {
    id: 1,
    name: 'Ram',
    mobileNo: 9999988888,
    isFavorite: false,
  },
  {
    id: 2,
    name: 'Pavan',
    mobileNo: 8888866666,
    isFavorite: true,
  },
  {
    id: 3,
    name: 'Nikhil',
    mobileNo: 9999955555,
    isFavorite: false,
  },
]

class App extends Component {
  state = {
    contactsList: initialContactsList,
    name: '',
    mobileNo: '',
  }

  componentDidMount() {
    const savedContacts = JSON.parse(localStorage.getItem('contactsList'))
    if (savedContacts) {
      this.setState({contactsList: savedContacts})
    }
  }

  handleSaveBtn = () => {
    const {contactsList} = this.state

    localStorage.setItem('contactsList', JSON.stringify(contactsList))

    alert('Contacts Saved Successfully')
  }

  onAddContact = event => {
    event.preventDefault()

    const {name, mobileNo} = this.state

    const newContact = {
      id: Date.now(),
      name,
      mobileNo,
      isFavorite: false,
    }
    this.setState(prevState => ({
      contactsList: [...prevState.contactsList, newContact],
      name: '',
      mobileNo: '',
    }))
  }

  removeContact = id => {
    this.setState(prevState => {
      const updatedContacts = prevState.contactsList.filter(
        eachContact => eachContact.id !== id,
      )
      localStorage.setItem('contactsList', JSON.stringify(updatedContacts))
      return {contactsList: updatedContacts}
    })
  }

  onChangeMobileNo = event => {
    this.setState({mobileNo: event.target.value})
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  toggleFavorite = id => {
    this.setState(prevState => ({
      contactsList: prevState.contactsList.map(each => {
        if (each.id === id) {
          return {...each, isFavorite: !each.isFavorite}
        }
        return each
      }),
    }))
  }

  render() {
    const {name, mobileNo, contactsList} = this.state
    return (
      <div className="app-container">
        <div className="responsive-container">
          <h1 className="heading">Contacts</h1>
          <form className="contact-form-container" onSubmit={this.onAddContact}>
            <input
              value={name}
              onChange={this.onChangeName}
              className="input"
              placeholder="Name"
            />
            <input
              className="input"
              value={mobileNo}
              onChange={this.onChangeMobileNo}
              placeholder="Mobile Number"
            />
            <div className="btns">
              <button type="submit" className="button">
                Add Contact
              </button>
              <button
                type="button"
                className="save-btn"
                onClick={this.handleSaveBtn}
              >
                Save
              </button>
            </div>
          </form>
          <ul className="contacts-table">
            <li className="table-header">
              <p className="table-header-cell name-column">Name</p>
              <hr className="separator" />
              <p className="table-header-cell">Mobile Number</p>
            </li>
            {contactsList.map(eachContact => (
              <ContactItem
                key={eachContact.id}
                contactDetails={eachContact}
                toggleFavorite={this.toggleFavorite}
                removeContact={this.removeContact}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default App
