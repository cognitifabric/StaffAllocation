
import { useState } from "react"
import { isValidYear, findObjectById } from '../../helpers/utilities'
import SVG from '../../libs/svg'

const EditYear = ({
  loading,
  setLoading,
  submitError,
  setSubmitError,
  addYear,
  setPopup,
  user,
  setYears,
  refetch,
  yearID,
  years,
  editYear,
  setEditYear,
  updateYear
}) => {
  
  const loadingColor = 'white'
  const [year, setYear] = useState(editYear.year)
  const [message, setMessage] = useState('')

  const submitEditYear = async () => {

    if(!isValidYear(year)) return setSubmitError('Invalid year')
    setLoading('addYear')
    
    try {
      
      const response = await updateYear({
        variables: {
          id: editYear.id,
          year: year
        }
      })
      
      setYear('')
      setLoading('')
      setPopup('')
      setSubmitError('')
      setMessage('Year was updated')
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
          <div className="form-group element-white curved-eased">
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
          </div>
          <div className="form-group">
          <button
            className="form-group-button-large"
            onClick={() => submitEditYear()}
            >
              {!loading && <span>Update Year</span>} 
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

export default EditYear
