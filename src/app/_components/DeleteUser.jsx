import SVG from '../../libs/svg'
import { useMutation } from '@apollo/client';

//// MUTATIONS
import DELETE_USER from '../../mutations/deleteUser'
import GET_USERS from '@/queries/fetchUsers'

const DeleteUser = ({
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
  userType
}) => {

  const loadingColor = 'white'
  const [ deletedUserMutation, { dataDeletedUser, loadingDeletedUser, errorDeletedUser}] = useMutation(DELETE_USER, { refetchQueries: [ GET_USERS ]})

  const sendDeletedUser = () => {

    try {
      
      setLoading(true)
      deletedUserMutation({ variables: { id: user.id } })
      setUser('')
      setLoading(false)
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
          <div className="form-group">
          <button
            className="form-group-button-large"
            onClick={() => sendDeletedUser()}
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

export default DeleteUser
