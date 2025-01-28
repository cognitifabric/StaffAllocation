"use client"
import { useState } from "react"
import { useRouter, useParams } from 'next/navigation';
import { useMutation } from '@apollo/client'
import { isStrongPassword } from '@/helpers/utilities'
import SVG from '@/libs/svg'

//// MUTATIONS
import RESET_PASSWORD from '@/mutations/resetPassword'

const ResetPassword = ({}) => {

  const loadingColor = 'white'
  const router = useRouter()
  const params = useParams()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [inputType, setInputType] = useState('password')
  const [resetPassword, { dataResetPassword, loadingResetPassword, errorResetPassword }] = useMutation(RESET_PASSWORD)

  const submitResetPassword = async () => {

    if(!isStrongPassword(password)) return setError("The password must be at least 8 characters long, have one uppercase letter (A-Z), have one lowercase letter (a-z), and one digit (0-9).")
    setLoading(true)


    try {
      
      const { data } = await resetPassword({
        variables: {
          password: password,
          token: params.token
        }
      });

      console.log(data)
      setError(data.resetPassword.message)
      setLoading(false)
      
      
    } catch (error) {
      console.error(error);
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
              type={inputType}
              value={password}
              placeholder="password"
              onKeyDown={(e) => e.key == 'Enter' ? login() : null }
              onChange={(e) => (
                setError(''),
                setLoading(''),
                setPassword(e.target.value)
              )}
            />
            <div 
              onClick={() => {
                !showPassword ? (setShowPassword(true), setInputType('text')) : (setShowPassword(false), setInputType('password'))
              }}  
            >
              {showPassword &&
                <SVG 
                  svg={'eyeClosed'}
                  width={20}
                  height={20}
                  color={'#8D5A97'}
                >
                </SVG>
              }
              {!showPassword &&
                <SVG 
                  svg={'eye'}
                  width={20}
                  height={20}
                  color={'#8D5A97'}
                >
                </SVG>
              }
            </div>
          </div>
          <div className="form-group">
            <button
            className="form-group-button-large"
            onClick={() => submitResetPassword()}
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
              <div className="text-schemeOne text-center">
                {error}
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
