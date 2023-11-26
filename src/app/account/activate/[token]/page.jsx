
'use client'
import Nav from '../../../_components/Navigation'
import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation';
import { isStrongPassword } from '../../../../helpers/utilities'
import { useMutation } from '@apollo/client';

//// MUTATIONS
import ACTIVATE_ACCOUNT from '../../../../mutations/activateAccount'

const ActivateAccount = ({

}) => {
  
  const loadingColor = 'white'
  const router = useRouter()
  const params = useParams()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [inValid, setInvalid] = useState(false)
  const [ activateAccount, { dataActivateForm, loadingActivateForm, errorActivateForm }] = useMutation(ACTIVATE_ACCOUNT)

  const activateAccountForm = async () => {
    // J#uP1t3r@2023!
    if(password !== confirmPassword) return setError(`Passwords don't match`)
    if(!isStrongPassword(password)) return setInvalid(true)

    setLoading('activateAccount')
    setError('')
    
    try {
      const response = await activateAccount({ 
        variables: { password: password, token: params.token }
      })

      setLoading('')
      setMessage(response.data.activateAccount.message)
      router.push('/');
      
    } catch (error) {
      console.log(error)
      setLoading('')
      if(error) setError(error.message)
    }

  }
  
  return (
    <>
      <Nav
        loggedOut={true}
      >
      </Nav>
      <div className="wfull justify-center flex mt5">
        <div className="boxForm justify-center w40 form-group element-white curved-eased">
          <h1>Activate Account</h1>
          <div className="form-group element-white curved-eased">
            <input 
              className="curved-eased"
              type="password" 
              value={password}
              placeholder="password"
              onChange={(e) => (
                setError(''),
                setLoading(''),
                setInvalid(false),
                setPassword(e.target.value)
              )}
            />
          </div>
          <div className="form-group element-white curved-eased">
            <input 
              className="curved-eased"
              type="password" 
              value={confirmPassword}
              placeholder="confirm password"
              onChange={(e) => (
                setError(''),
                setLoading(''),
                setInvalid(false),
                setConfirmPassword(e.target.value)
              )}
            />
          </div>
          <button
            className="form-group-button-large"
            onClick={() => activateAccountForm()}
          >
              {!loading && <span>Create Account</span>} 
              {loading && 
              <div className="loading">
                <span style={{backgroundColor: loadingColor}}></span>
                <span style={{backgroundColor: loadingColor}}></span>
                <span style={{backgroundColor: loadingColor}}></span>
              </div>
              }
          </button>
          {message && 
            <div className="container-center padding-0 mt1">
              <div className="text-schemeOne">
                {message}
              </div>
            </div>
          }
          {error && 
            <div className="container-center padding-0 mt1">
              <div className="text-schemeOne">
                {error}
              </div>
            </div>
          }
          {inValid && 
            <div className="container-center padding-0 mt">
              <div className="text-schemeOne">
                <ul>
                  <li>Must have uppercase</li>
                  <li>Must have lowercase</li>
                  <li>Must have number</li>
                  <li>Must have a special character</li>
                  <li>Must be at least 8 characters long</li>
                </ul>
              </div>
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default ActivateAccount
