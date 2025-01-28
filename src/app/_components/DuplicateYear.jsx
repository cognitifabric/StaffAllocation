
import { useState } from "react"
import { isValidYear, findObjectById } from '../../helpers/utilities'
import SVG from '../../libs/svg'

const DuplicateYear = ({
  loading,
  setLoading,
  submitError,
  setSubmitError,
  setPopup,
  duplicateYear,
  editYear,
  setEditYear,
  user,
  refetch
}) => {
  
  const loadingColor = 'white'
  const [message, setMessage] = useState('')

  const submitDuplicateYear = async () => {

    setLoading('duplicateYear')

    if(!user.data) return setSubmitError('Login to continue')
    
    try {
      
      const response = await duplicateYear({
        variables: {
          id: user.data.user.id,
          yearID: editYear.id
        }
      })
      
      setEditYear('')
      setLoading('')
      setPopup('')
      setSubmitError('')
      setMessage('Year was duplicated')
      refetch()
      
    } catch (error) {
      console.log(error)
      if(error) setSubmitError(error.message)
    }
    
  }
  
  return (
    <div className="popUpBackground">
      <div className="popUpBox">
        <div 
          className="popUpBoxClose"
          onClick={() => (
            setLoading(''),
            setSubmitError(''),
            setPopup('')
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
          {/* <div className="form-group element-white curved-eased">
            <input 
              className="curved-eased"
              type="text" 
              value={year}
              placeholder="year"
              onChange={(e) => (
                setSubmitError(''),
                setLoading(''),
                setYear(e.target.value)
              )}
            />
          </div> */}
          <div className="form-group">
          <button
            className="form-group-button-large"
            onClick={() => submitDuplicateYear()}
            >
              {!loading && <span>Duplicate Year</span>} 
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

export default DuplicateYear