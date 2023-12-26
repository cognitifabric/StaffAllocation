
import SVG from '../../libs/svg'

const EditEntityUsers = ({
  setPopup,
  reset,
  user,
  setUser,
  allUsers,
  message,
  setMessage,
  submitError,
  setSubmitError,
  loading,
  setLoading
}) => {
  
  const loadingColor = 'white'
  
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
            <div className="form-group">
            <button
              className="form-group-button-large"
              onClick={() => setPopup('addEntityUser')}
            >
              <span>Add Entity User</span>
            </button>
            </div>
            { allUsers.length > 0 && allUsers.map((item, idx) => 
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
                        setPopup('deleteEntityUser'),
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
          }
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

export default EditEntityUsers
