"use client"
import { useState, useRef } from 'react'
import axios from 'axios'
import { useMutation, useQuery } from '@apollo/client';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';
import SVG from '../libs/svg'

//// MUTATIONS
import USER_LOGIN from '@/mutations/login'
import USER_ENTITY_LOGIN from '@/mutations/loginEntityUser'

export default function Home() {

  const loadingColor = 'white';
  const router = useRouter();
  const myRefs = useRef();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [cookies, setCookie] = useCookies(['accessToken', 'user']);
  const [userType, setUserType] = useState('')
  const [userTypeFormField, setUserTypeFormField] = useState('')
  const [inputDropdown, setInputDropdown] = useState('')
  const [userLogin, { data, loadingLogin, errorLogin }] = useMutation(USER_LOGIN);
  const [entityUserLogin, { dataEntityUser, loadingEntityUserLogin, errorEntityUserLogin }] = useMutation(USER_ENTITY_LOGIN);

  const login = async () => {

    if(!userType) return setError('Please select a user type')
    setLoading(true)

    if(userType == 'admin'){
      try {
        const response = await userLogin({ variables: { username: username, password: password } })
        const { token } = response.data.login;
  
        // Handle successful login (use response data)
        // Set cookies with a 1-hour expiration time
        setCookie('accessToken', token, { path: '/', expires: new Date(Date.now() + 60 * 60 * 1000) });
        setCookie('user', JSON.stringify(response.data.login), { path: '/', expires: new Date(Date.now() + 60 * 60 * 1000) });
  
        // Callback or additional logic after successful login
        router.push('/staffing');
  
      } catch (error) {
        // Handle login error (use error)
        console.error(error);
        if(error) setError(error.message)
      }
    } else if (userType == 'user'){
      try {
        const response = await entityUserLogin({ variables: { username: username, password: password } })

        const { token } = response.data.loginEntityUser;
  
        // Handle successful login (use response data)
        // Set cookies with a 1-hour expiration time
        setCookie('accessToken', token, { path: '/', expires: new Date(Date.now() + 60 * 60 * 1000) });

        setCookie('user', JSON.stringify(response.data.loginEntityUser), { path: '/', expires: new Date(Date.now() + 60 * 60 * 1000) });
  
        // Callback or additional logic after successful login
        router.push('/staffing');
  
      } catch (error) {
        // Handle login error (use error)
        console.error(error);
        if(error) setError(error.message)
      }
    }
    
    setLoading(false)
    
  }

  if (loadingLogin) return 'Loading...';
  if (errorLogin) return `Error! ${errorQuery.message}`;
   
  return (
    <div className="columnsTwo">
      <div className="w60percent" style={{ backgroundImage: `url('/media/loginBackground.jpeg')`}}>
        <div className="wfull slantedColumnRight" style={{ backgroundImage: `url('/media/loginBackground.jpeg')`}}>
      </div>
      </div>
      <div className="w60percent overlay">
        <div className="wfull container-center slantedColumnLeft">
          <div className="w40 box-curved-3 boxForm counteractSkew">
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
            <div className="form-group element-white curved-eased">
              <input 
                className="curved-eased"
                type="password" 
                value={password}
                placeholder="password"
                onKeyDown={(e) => e.key == 'Enter' ? login() : null }
                onChange={(e) => (
                  setError(''),
                  setLoading(''),
                  setPassword(e.target.value)
                )}
              />
            </div>
            <div className="form-group element-white curved-eased">
              <input
                className="curved-eased capitalize"
                onClick={() => setInputDropdown('userType')} 
                value={userTypeFormField.split(/(?=[A-Z])/).join('')} 
                placeholder="user type"
                // onChange={(e) => (setInputDropdown(''), stateMethod(caseType, 'leader', e.target.value))}
                readOnly
              />
              <div 
                onClick={() => (
                  inputDropdown == 'userType' ? setInputDropdown('') : setInputDropdown('userType')
                )}
              >
                <SVG 
                  svg={'arrowDown'}
                  width={20}
                  height={20}
                  color={'#8D5A97'}
                >
                </SVG>
              </div>
              { inputDropdown == 'userType' &&
                <div 
                  className="form-group-list" 
                  ref={myRefs}
                >
                  <div 
                    className="form-group-list-item" 
                    onClick={(e) => (setUserType('admin'), setUserTypeFormField('admin'), setInputDropdown(''))}
                  >
                    Admin
                  </div>
                  <div 
                    className="form-group-list-item" 
                    onClick={(e) => (setUserType('user'), setUserTypeFormField('user'), setInputDropdown(''))}
                  >
                    Guest User
                  </div>
                </div>
              }
            </div>
            <div className="form-group">
              <button
              className="form-group-button-large"
              onClick={() => login()}
              >
                {!loading && <span>Sign In</span>} 
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
              Don&rsquo;t have an account?
            </div>
            <div className="container-center padding-0 elementLink">
              <a href="/signup" className="fontSize-16 schemeOne">Sign Up</a>
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
    </div>
  )
}
