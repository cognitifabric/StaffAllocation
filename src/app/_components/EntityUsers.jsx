import SVG from '../../libs/svg'
import { useMutation } from '@apollo/client';

//// MUTATIONS
import ADD_ENTITY_USER from '../../mutations/addEntityUser'
import GET_USERS from '@/queries/fetchUsers'

const EntityUsers = ({
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
  userType,
  allUsers
}) => {
  console.log(allUsers)
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
          <div className="element-white curved-eased">
            { allUsers.length > 0 && allUsers.map((account) => 
              account.username == user.username && account.users.length > 0 && account.users.map((item, idx) => 
                <div 
                  key={idx}
                  // onClick={(e) => (setUserType('editor'), setUserTypeFormField('Editor'), setInputDropdown(''), setMessage(''))}
                  className="justifyBetween listItem"
                >
                  <div>{item.username} / {item.role}</div>
                  <div className="flex gap2">
                    <div
                      className="svgItem"
                      onClick={() => (
                        setPopup('editEntityUser'),
                        setUser(item)
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
                        setPopup('edit'),
                        setUser(item)
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
                </div>
              )
            )}
          </div>
          <div className="form-group">
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

export default EntityUsers
