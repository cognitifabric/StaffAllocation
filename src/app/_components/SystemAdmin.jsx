import Nav from './Navigation'
import SystemAdminSettings from './SystemAdminSettings'
import { useState } from 'react'

const SystemAdmin = ({
  allUsers,
  setAllUsers,
  removeCookie
}) => {
  
  const [error, setError] = useState('')
  const [loading, setLoading] = useState('')
  const [message, setMessage] = useState('')
  
  return (
    <>
      <Nav
        removeCookie={removeCookie}
      >
      </Nav>
      <SystemAdminSettings
        error={error}
        setError={setError}
        loading={loading}
        setLoading={setLoading}
        message={message}
        setMessage={setMessage}
        allUsers={allUsers}
        setAllUsers={setAllUsers}
      >
      </SystemAdminSettings>
    </>
  )
}

export default SystemAdmin
