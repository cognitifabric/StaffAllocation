
import { useState } from "react"
import { isValidYear, findObjectById } from '../../helpers/utilities'
import SVG from '../../libs/svg'

const EditTeam = ({
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
  editTeam,
  setEditYear,
  updateTeam
}) => {
  
  const loadingColor = 'white'
  const [team, setTeam] = useState(editTeam.team)
  const [message, setMessage] = useState('')

  const submitEditTeam = async () => {

    if(!team) return setSubmitError('Team name is required')
    setLoading('editTeam')
    
    try {
      
      const response = await updateTeam({
        variables: {
          id: editTeam.id,
          team: team
        }
      })
      
      setTeam('')
      setLoading('')
      setSubmitError('')
      setPopup('')
      setMessage('Team was updated')
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
            onClick={() => submitEditTeam()}
            >
              {!loading && <span>Update Team</span>} 
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

export default EditTeam
