import SVG from '../../libs/svg'
import { useMutation } from '@apollo/client';

//// MUTATIONS
import UPDATE_USER from '../../mutations/updateUser'
import GET_USERS from '@/queries/fetchUsers'

const EditUser = ({
  reset,
  username,
  setError,
  setLoading,
  setUsername,
  setInputDropdown,
  userTypeFormField,
  inputDropdown,
  myRefs,
  setUserType,
  setUserTypeFormField,
  loading,
  sendInviteForm,
  message,
  error,
  setPopup,
  user,
  setUser,
  userType,
  name,
  setName
}) => {
  
  const loadingColor = 'white'
  const [ updateUserMutation, { dataUpdateUser, loadingUpdateUser, errorUpdateUser}] = useMutation(UPDATE_USER, { refetchQueries: [ GET_USERS ]})

  const sendUpdatedUser = () => {
    
    if(!username && !userType && !name) return setError('Username, name, or role must be different')
    setLoading(true)

    try {
      
      updateUserMutation({ variables: { id: user.id, name: name, username: username, role: userType} })
      setUser('')
      setLoading(false),
      reset(),
      setPopup('')
      
    } catch (error) {
      
      console.log(error)
      if(error) setError(error)
      
    }
    
  }
  
  return (
    <div className="popUpBackground">
      <div className="popUpBox">
        <div 
          className="popUpBoxClose"
          onClick={() => (
            setPopup(''),
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
              value={name ? name : user.name}
              placeholder="email"
              onChange={(e) => (
                setError(''),
                setLoading(''),
                setName(e.target.value)
              )}
            />
          </div>
          <div className="form-group element-white curved-eased">
            <input 
              className="curved-eased"
              type="text" 
              value={username ? username : user.username}
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
              className="curved-eased capitalize"
              onClick={() => setInputDropdown('inviteUser')} 
              value={userTypeFormField.split(/(?=[A-Z])/).join('') ? userTypeFormField.split(/(?=[A-Z])/).join('') : user.role.split(/(?=[A-Z])/).join(' ')} 
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
            onClick={() => sendUpdatedUser()}
            >
              {!loading && <span>Update User</span>} 
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
  )
}

export default EditUser
