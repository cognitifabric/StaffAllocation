
import SVG from '../../libs/svg'
import { useState, useRef } from 'react'
import { useMutation } from '@apollo/client';

//// MUTATIONS
import USER_INVITE from '@/mutations/inviteUser'

const SystemAdminSettings = ({
  error,
  setError,
  loading,
  setLoading,
  message,
  setMessage,
  allUsers
}) => {

  const myRefs = useRef()
  const loadingColor = 'white'
  const [sendInvite, setSendInvite] = useState(false)
  const [username, setUsername] = useState('')
  const [userType, setUserType] = useState('')
  const [userTypeFormField, setUserTypeFormField] = useState('')
  const [inputDropdown, setInputDropdown] = useState('')
  const [ sendInviteMutation, { dataInviteUser, loadingInviteUser, errorInviteUser}] = useMutation(USER_INVITE)

  const reset = () => {
    setUsername(''),
    setUserType(''),
    setUserTypeFormField(''),
    setLoading('')
    setError('')
    setMessage('')
  }

  const sendInviteForm = async () => {

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(username)){ return setError('Email invalid') }
    if(!userType){ return setError('Please select a user type')}
    
    setLoading('sendInvite')
    setError('')

    try {
      const response = await sendInviteMutation({ 
        variables: { username: username, role: userType }
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
          className="listUsersHeading"
        >
          <span>Email</span>
          <span>Role</span>
        </div>
      </div>
      <div className="listUsers">
        {allUsers && allUsers.map((user, idx) => 
          <div 
            key={idx}
            className="listUsersUser"
          >
            <span>{user.username}</span>
            <span>{user.role}</span>
          </div>
        )}
      </div>
      {sendInvite &&
        <div className="popUpSendInvite">
          <div className="popUpBox">
            <div 
              className="popUpBoxClose"
              onClick={() => (
                setSendInvite(false),
                reset()
              )}
            >
              <SVG 
                svg={'close'}
                width={25}
                height={25}
                color={'white'}
              >
              </SVG>
            </div>
            <div className="w40 box-curved-3 boxForm">
              <div className="form-group element-white curved-eased">
                <input 
                  className="curved-eased"
                  type="text" 
                  value={username}
                  placeholder="email"
                  onChange={(e) => (
                    setError(''),
                    setLoading(''),
                    setUsername(e.target.value)
                  )}
                />
              </div>
              <div className="form-group element-white curved-eased">
                <input
                  className="curved-eased"
                  onClick={() => setInputDropdown('inviteUser')} 
                  value={userTypeFormField} 
                  placeholder="user type"
                  // onChange={(e) => (setInputDropdown(''), stateMethod(caseType, 'leader', e.target.value))}
                  readOnly
                />
                <div 
                  onClick={() => (
                    inputDropdown == 'inviteUser' ? setInputDropdown('') : setInputDropdown('inviteUser')
                  )}
                >
                  <SVG 
                    svg={'arrowDown'}
                    width={20}
                    height={20}
                    color={'#8D5A97'}
                  >
                  </SVG>
                </div>
                { inputDropdown == 'inviteUser' &&
                  <div 
                    className="form-group-list" 
                    ref={myRefs}
                  >
                    <div 
                      className="form-group-list-item" 
                      onClick={(e) => (setUserType('systemAdmin'), setUserTypeFormField('System Admin'), setInputDropdown(''))}
                    >
                      System Admin
                    </div>
                    <div 
                      className="form-group-list-item" 
                      onClick={(e) => (setUserType('entityAdmin'), setUserTypeFormField('Entity Admin'), setInputDropdown(''))}
                    >
                      Entity Admin
                    </div>
                    {/* <div 
                      className="form-group-list-item" 
                      onClick={(e) => (setUserType('entityUser'), setUserTypeFormField('Entity User'), setInputDropdown(''))}
                    >
                      Entity User
                    </div> */}
                  </div>
                }
              </div>
              <div className="form-group">
              <button
                className="form-group-button-large"
                onClick={() => sendInviteForm()}
                >
                  {!loading && <span>Send Invite</span>} 
                  {loading && 
                  <div className="loading">
                    <span style={{backgroundColor: loadingColor}}></span>
                    <span style={{backgroundColor: loadingColor}}></span>
                    <span style={{backgroundColor: loadingColor}}></span>
                  </div>
                  }
              </button>
              </div>
              {message && 
                <div className="container-center padding-0">
                  <div className="text-schemeOne">
                    {message}
                  </div>
                </div>
              }
              {error && 
                <div className="container-center padding-0">
                  <div className="text-schemeOne">
                    {error}
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default SystemAdminSettings
