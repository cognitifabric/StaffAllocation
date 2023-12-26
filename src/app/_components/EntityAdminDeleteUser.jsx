import SVG from '../../libs/svg'
import { useMutation } from '@apollo/client';

//// MUTATIONS
import DELETE_ENTITY_USER from '../../mutations/deleteEntityUser'
import GET_USER from '@/queries/fetchUser'

const DeleteEntityUser = ({
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
  const [ deleteEntityUserMutation, { dataDeleteEntityUser, loadingDeleteEntityUser, errorDeleteEntityUser}] = useMutation(DELETE_ENTITY_USER, { refetchQueries: [ GET_USER ]})

  const sendDeleteUser = () => {
    
    try {

      setLoading(true)
      deleteEntityUserMutation({ variables: { id: user.id } })
      setUser('')
      setLoading(false)
      setUser(user)
      setPopup('editAllEntityUsers')
      
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
          <div className="form-group">
          <button
            className="form-group-button-large"
            onClick={() => sendDeleteUser()}
            >
              {!loading && <span>Delete User</span>} 
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

export default DeleteEntityUser
