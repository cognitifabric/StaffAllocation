import SVG from '../../libs/svg'
import { useMutation } from '@apollo/client';

//// MUTATIONS
import ADD_ENTITY_USER from '../../mutations/addEntityUser'
import GET_USERS from '@/queries/fetchUsers'

const AddEntityUser = ({
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
  setMessage,
  error,
  setPopup,
  user,
  setUser,
  userType
}) => {

  const loadingColor = 'white'
  const [ addEntityUserMutation, { dataAddEntityUser, loadingAddEntityUser, errorAddEntityUser}] = useMutation(ADD_ENTITY_USER, { refetchQueries: [ GET_USERS ]})

  const addEntityUser = async () => {
    
    // if(!username && !userType) return setError('Username or role must be different')
    setLoading(true)

    try {
      
      const response = await addEntityUserMutation({ variables: { id: user.id, username: username, role: userType} })
      setUser('')
      setLoading(false)
      setUsername('')
      setUserType('')
      setUserTypeFormField('')
      setMessage('Invite sent')
      
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
              value={username}
              placeholder="Email"
              onChange={(e) => (
                setError(''),
                setLoading(''),
                setMessage(''),
                setUsername(e.target.value)
              )}
            />
          </div>
          <div className="form-group element-white curved-eased">
            <input
              className="curved-eased capitalize"
              onClick={() => setInputDropdown('userType')} 
              value={userTypeFormField.split(/(?=[A-Z])/).join('')} 
              placeholder="user type"
              // onChange={(e) => (setInputDropdown(''), stateMethod(caseType, 'leader', e.target.value))}
              readOnly
            />
            <div 
              onClick={() => (
                inputDropdown == 'userType' ? setInputDropdown('') : setInputDropdown('userType')
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
            { inputDropdown == 'userType' &&
              <div 
                className="form-group-list" 
                ref={myRefs}
              >
                <div 
                  className="form-group-list-item" 
                  onClick={(e) => (setUserType('editor'), setUserTypeFormField('Editor'), setInputDropdown(''), setMessage(''))}
                >
                  Editor
                </div>
                <div 
                  className="form-group-list-item" 
                  onClick={(e) => (setUserType('viewer'), setUserTypeFormField('Viewer'), setInputDropdown(''), setMessage(''))}
                >
                  Viewer
                </div>
              </div>
            }
          </div>
          <div className="form-group">
          <button
            className="form-group-button-large"
            onClick={() => addEntityUser()}
            >
              {!loading && <span>Add Entity User</span>} 
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

export default AddEntityUser
