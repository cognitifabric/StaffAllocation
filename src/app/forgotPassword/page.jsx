"use client"
import { useState } from "react"
import { useMutation } from '@apollo/client'

//// MUTATIONS
import FORGOT_PASSWORD from '@/mutations/forgotPassword'

const ForgotPassword = ({}) => {

  const loadingColor = 'white'
  const [error, setError] = useState('')
  const [loading, setLoading] = useState('')
  const [username, setUsername] = useState('')
  const [forgotPassword, { dataForgotPassword, loadingForgotPassword, errorForgotPassword }] = useMutation(FORGOT_PASSWORD)

  const submitForgotPassword = async () => {

    if(!username) return setError('Please enter your username')
    setLoading(true)

    try {
      
      const { data } = await forgotPassword({
        variables: {
          username: username
        }
      });

      setError(data.forgotPassword.message)
      setLoading(false)
      
      
    } catch (error) {
      console.error(error);
      setLoading(false)
      if(error) setError(error.message)
    }
    
  }
  
  return (
    <div className="wfull h100">
      <div className="wfull container-center boxBackground">
        <div className="w40percent boxForm curved-eased padding-3">
          <div className="form-group element-white curved-eased">
            <input 
              className="curved-eased"
              type="text" 
              value={username}
              placeholder="username"
              onKeyDown={(e) => e.key == 'Enter' ? login() : null }
              onChange={(e) => (
                setError(''),
                setLoading(''),
                setUsername(e.target.value)
              )}
            />
          </div>
          <div className="form-group">
            <button
            className="form-group-button-large"
            onClick={() => submitForgotPassword()}
            >
              {!loading && <span>Reset Password</span>} 
              {loading && 
              <div className="loading">
                <span style={{backgroundColor: loadingColor}}></span>
                <span style={{backgroundColor: loadingColor}}></span>
                <span style={{backgroundColor: loadingColor}}></span>
              </div>
              }
            </button>
          </div>
          <div className="container-center padding-0 text-black fontSize-16">
            Already have an account?
          </div>
          <div className="container-center padding-0 elementLink">
            <a href="/" className="fontSize-16 schemeOne">Login</a>
          </div>
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

export default ForgotPassword
