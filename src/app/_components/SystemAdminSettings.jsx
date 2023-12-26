
import SVG from '../../libs/svg'
import { useState, useRef, useEffect } from 'react'
import { useMutation } from '@apollo/client';

//// MUTATIONS
import USER_INVITE from '@/mutations/inviteUser'

//// COMPONENTS
import SendInvite from '../_components/SendInvite'
import EditUser from '../_components/EditUser'
import DeleteUser from '../_components/DeleteUser'
import AddEntityUser from '../_components/AddEntityUser'
import EditEntityUser from '../_components/EditEntityUser'
import EntityUsers from './EntityUsers';
import DeleteEntityUser from './DeleteEntityUser';

const SystemAdminSettings = ({
  currentUser,
  error,
  setError,
  loading,
  setLoading,
  message,
  setMessage,
  allUsers
}) => {

  const myRefs = useRef()
  const [sendInvite, setSendInvite] = useState(false)
  const [popup, setPopup] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [userType, setUserType] = useState('')
  const [userTypeFormField, setUserTypeFormField] = useState('')
  const [inputDropdown, setInputDropdown] = useState('')
  const [user, setUser] = useState('')
  const [ sendInviteMutation, { dataInviteUser, loadingInviteUser, errorInviteUser}] = useMutation(USER_INVITE)
  
  const reset = () => {
    setName('')
    setUsername('')
    setUserType('')
    setUserTypeFormField('')
    setLoading('')
    setError('')
    setMessage('')
  }

  const sendInviteForm = async () => {

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!name){ return setError('Name is required')}
    if(!emailPattern.test(username)){ return setError('Email invalid') }
    if(!userType){ return setError('Please select a user type')}
    
    setLoading('sendInvite')
    reset(),
    setError('')

    try {
      const response = await sendInviteMutation({ 
        variables: { name: name, username: username, role: userType }
      })

      setLoading('')
      setMessage(response.data.inviteUser.message)
      
    } catch (error) {
      console.log(error)
      setLoading('')
      if(error) setError(error.message)
    }

    
  }
  
  return (
    <div className="maxContainer">
      <div className="mt10 flex items-center">
        <h1 className="headerOne">All Entity&rsquo;s</h1>
        <div 
          className="flex items-center ml5 hoverCursor"
          onClick={() => setSendInvite(true)}
        >
          <SVG
            svg={'plus'}
            width={50}
            height={50}
            color={'#8D5A97'}
          >
          </SVG>
        </div>
      </div>
      <div className="listUsers">
        <div 
          className="listUsersHeading rounded"
        >
          <span>Name</span>
          <span>Email</span>
          <span>Role</span>
        </div>
      </div>
      <div className="listUsers">
        {allUsers.length > 0 && allUsers.map((user, idx) => 
          currentUser.data.user.id !== user.id &&
          <div 
            key={idx}
            className="listUsersUser"
          >
            <span>{user.name}</span>
            <span>{user.username}</span>
            <span className="capitalize">{user.role.split(/(?=[A-Z])/).join(' ')}</span>
            {user.role == 'systemAdmin' &&
              <div className="flexSVGGroup">
                <div 
                  className="svgItem"
                  onClick={() => (
                    setPopup('edit'),
                    setUser(user)
                  )}
                >
                  <SVG 
                    svg={'edit'}
                    width={25}
                    height={25}
                    color={'#8D5A97'}
                  >
                  </SVG>
                </div>
                <div 
                  className="svgItem"
                  onClick={() => ( 
                    setPopup('delete'),
                    setUser(user)
                  )}
                >
                  <SVG 
                    svg={'thrashCan'}
                    width={25}
                    height={25}
                    color={'#8D5A97'}
                  >
                  </SVG>
                </div>
              </div>
            }
            {user.role == 'entityAdmin' &&
              <div className="flexSVGGroup">
                <div 
                  className="svgItem"
                  onClick={() => (
                    setPopup('edit'),
                    setUser(user)
                  )}
                >
                  <SVG 
                    svg={'edit'}
                    width={25}
                    height={25}
                    color={'#8D5A97'}
                  >
                  </SVG>
                </div>
                <div 
                  className="svgItem"
                  onClick={() => (
                    setPopup('delete'),
                    setUser(user)
                  )}
                >
                  <SVG 
                    svg={'thrashCan'}
                    width={25}
                    height={25}
                    color={'#8D5A97'}
                  >
                  </SVG>
                </div>
                <div 
                  className="svgItem"
                  onClick={() => (
                    setPopup('addEntityUser'),
                    setUser(user)
                  )}
                >
                  <SVG 
                    svg={'plus'}
                    width={50}
                    height={50}
                    color={'#8D5A97'}
                  >
                  </SVG>
                </div>
                <div 
                  className="svgItem"
                  onClick={() => (
                    setPopup('entityUsers'),
                    setUser(user)
                  )}
                >
                  <SVG 
                    svg={'users'}
                    width={25}
                    height={25}
                    color={'#8D5A97'}
                  >
                  </SVG>
                </div>
              </div>
            }
          </div>
        )}
      </div>
      {sendInvite &&
        <SendInvite 
          setSendInvite={setSendInvite}
          reset={reset}
          username={username}
          setError={setError}
          setLoading={setLoading}
          setUsername={setUsername}
          setInputDropdown={setInputDropdown}
          userTypeFormField={userTypeFormField}
          inputDropdown={inputDropdown}
          myRefs={myRefs}
          setUserType={setUserType}
          setUserTypeFormField={setUserTypeFormField}
          loading={loading}
          sendInviteForm={sendInviteForm}
          message={message}
          error={error}
          name={name}
          setName={setName}
        />
      }
      {popup === 'edit' &&
        <EditUser
          setSendInvite={setSendInvite}
          reset={reset}
          username={username}
          setError={setError}
          setLoading={setLoading}
          setUsername={setUsername}
          setInputDropdown={setInputDropdown}
          userTypeFormField={userTypeFormField}
          inputDropdown={inputDropdown}
          myRefs={myRefs}
          setUserType={setUserType}
          setUserTypeFormField={setUserTypeFormField}
          loading={loading}
          sendInviteForm={sendInviteForm}
          message={message}
          error={error}
          setPopup={setPopup}
          user={user}
          setUser={setUser}
          userType={userType}
          name={name}
          setName={setName}
        />
      }
      {popup === 'delete' &&
        <DeleteUser
          setSendInvite={setSendInvite}
          reset={reset}
          username={username}
          setError={setError}
          setLoading={setLoading}
          setUsername={setUsername}
          setInputDropdown={setInputDropdown}
          userTypeFormField={userTypeFormField}
          inputDropdown={inputDropdown}
          myRefs={myRefs}
          setUserType={setUserType}
          setUserTypeFormField={setUserTypeFormField}
          loading={loading}
          sendInviteForm={sendInviteForm}
          message={message}
          error={error}
          setPopup={setPopup}
          user={user}
          setUser={setUser}
          userType={userType}
        />
      }
      {popup === 'addEntityUser' &&
        <AddEntityUser
          setSendInvite={setSendInvite}
          reset={reset}
          username={username}
          setError={setError}
          setLoading={setLoading}
          setUsername={setUsername}
          setInputDropdown={setInputDropdown}
          userTypeFormField={userTypeFormField}
          inputDropdown={inputDropdown}
          myRefs={myRefs}
          setUserType={setUserType}
          setUserTypeFormField={setUserTypeFormField}
          loading={loading}
          sendInviteForm={sendInviteForm}
          message={message}
          setMessage={setMessage}
          error={error}
          setPopup={setPopup}
          user={user}
          setUser={setUser}
          userType={userType}
        />
      }
      {popup === 'entityUsers' &&
        <EntityUsers
          setSendInvite={setSendInvite}
          reset={reset}
          username={username}
          setError={setError}
          setLoading={setLoading}
          setUsername={setUsername}
          setInputDropdown={setInputDropdown}
          userTypeFormField={userTypeFormField}
          inputDropdown={inputDropdown}
          myRefs={myRefs}
          setUserType={setUserType}
          setUserTypeFormField={setUserTypeFormField}
          loading={loading}
          sendInviteForm={sendInviteForm}
          message={message}
          setMessage={setMessage}
          error={error}
          setPopup={setPopup}
          user={user}
          setUser={setUser}
          userType={userType}
          allUsers={allUsers}
        />
      }
      {popup === 'editEntityUser' &&
        <EditEntityUser
          setSendInvite={setSendInvite}
          reset={reset}
          username={username}
          setError={setError}
          setLoading={setLoading}
          setUsername={setUsername}
          setInputDropdown={setInputDropdown}
          userTypeFormField={userTypeFormField}
          inputDropdown={inputDropdown}
          myRefs={myRefs}
          setUserType={setUserType}
          setUserTypeFormField={setUserTypeFormField}
          loading={loading}
          sendInviteForm={sendInviteForm}
          message={message}
          setMessage={setMessage}
          error={error}
          setPopup={setPopup}
          user={user}
          setUser={setUser}
          userType={userType}
        />
      }
      {popup === 'deleteEntityUser' &&
        <DeleteEntityUser
          setSendInvite={setSendInvite}
          reset={reset}
          username={username}
          setError={setError}
          setLoading={setLoading}
          setUsername={setUsername}
          setInputDropdown={setInputDropdown}
          userTypeFormField={userTypeFormField}
          inputDropdown={inputDropdown}
          myRefs={myRefs}
          setUserType={setUserType}
          setUserTypeFormField={setUserTypeFormField}
          loading={loading}
          sendInviteForm={sendInviteForm}
          message={message}
          setMessage={setMessage}
          error={error}
          setPopup={setPopup}
          user={user}
          setUser={setUser}
          userType={userType}
        />
      }
    </div>
  )
}

export default SystemAdminSettings
