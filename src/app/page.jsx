"use client"
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useMutation, useQuery } from '@apollo/client';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';

//// MUTATIONS
import USER_LOGIN from '@/mutations/login'

export default function Home() {

  const loadingColor = 'white'
  const router = useRouter();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [cookies, setCookie] = useCookies(['accessToken', 'user']);
  const [ userLogin, { data, loadingLogin, errorLogin }] = useMutation(USER_LOGIN);

  const login = async () => {

    setLoading(true)

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
              Don't have an account?
            </div>
            <div className="container-center padding-0 elementLink">
              <a href="/signup" className="fontSize-16 schemeOne">Sign Up</a>
            </div>
            {error && 
              <div className="container-center padding-0">
                <div className="form-group-error-light">
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
