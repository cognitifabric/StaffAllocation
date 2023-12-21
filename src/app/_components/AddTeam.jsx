
import { useState } from "react"
import SVG from '../../libs/svg'

const AddTeam = ({
  loading,
  setLoading,
  submitError,
  setSubmitError,
  addTeam,
  setPopup,
  year
}) => {
  
  const loadingColor = 'white'
  const [team, setTeam] = useState('')
  const [message, setMessage] = useState('')

  const submitAddTeam = async () => {
    
    try {
      
      const response = await addTeam({
        variables: {
          id: year,
          team: team
        }
      })

      setTeam('')
      setLoading('')
      setSubmitError('')
      setMessage('Team was created')
      
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
              value={team}
              placeholder="team"
              onChange={(e) => (
                setSubmitError(''),
                setLoading(''),
                setTeam(e.target.value)
              )}
            />
          </div>
          <div className="form-group">
          <button
            className="form-group-button-large"
            onClick={() => submitAddTeam()}
            >
              {!loading && <span>Add Team</span>} 
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

export default AddTeam
