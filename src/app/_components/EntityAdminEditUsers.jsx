import SVG from '../../libs/svg'
import { useMutation } from '@apollo/client';

//// MUTATIONS
import UPDATE_ENTITY_USER from '../../mutations/updateEntityUser'
import GET_USER from '@/queries/fetchUser'

const EditEntityUser = ({
  reset,
  username,
  setSubmitError,
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
  submitError,
  setPopup,
  user,
  setUser,
  userType
}) => {
  
  const loadingColor = 'white'
  const [ updateEntityUserMutation, { dataUpdateEntityUser, loadingUpdateEntityUser, errorUpdateEntityUser}] = useMutation(UPDATE_ENTITY_USER, { refetchQueries: [ GET_USER ]})

  const updateEntityUser = async () => {
    
    if(!username && !userType) return setSubmitError('Username or role must be different')
    setLoading(true)

    try {
      
      const response = await updateEntityUserMutation({ variables: { id: user.id, username: username, role: userType} })
      setUser('')
      setLoading(false)
      setPopup('editAllEntityUsers')
      setUsername('')
      setUserType('')
      setMessage('User updated')
      
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
              value={username ? username : user.username}
              placeholder="Email"
              readOnly
              // onChange={(e) => (
              //   setError(''),
              //   setLoading(''),
              //   setMessage(''),
              //   setUsername(e.target.value)
              // )}
            />
          </div>
          <div className="form-group element-white curved-eased">
            <input
              className="curved-eased capitalize"
              onClick={() => setInputDropdown('userType')} 
              value={userTypeFormField.split(/(?=[A-Z])/).join('') ? userTypeFormField.split(/(?=[A-Z])/).join('') : user.role.split(/(?=[A-Z])/).join(' ')} 
              placeholder="user type"
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
            onClick={() => updateEntityUser()}
            >
              {!loading && <span>Update Entity User</span>} 
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
          {submitError && 
            <div className="container-center padding-0">
              <div className="text-schemeOne">
                {submitError}
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default EditEntityUser
