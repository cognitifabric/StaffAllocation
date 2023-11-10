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
    }
    
    setLoading(false)
    
  }

  if (loadingLogin) return 'Loading...';
  if (errorLogin) return `Error! ${errorQuery.message}`;
   
  return (
    <div className="container-center">
      <div className="w70 box-curved-3 schemeTwo-background">
        <div className="form-group element-white curved">
          <input 
            className="curved"
            type="text" 
            value={username}
            placeholder="username"
            onKeyDown={(e) => e.key == 'Enter' ? login() : null }
            onChange={(e) => (
              setError(''),
              setUsername(e.target.value)
            )}
          />
        </div>
        <div className="form-group element-white curved">
          <input 
            className="curved"
            type="password" 
            value={password}
            placeholder="password"
            onKeyDown={(e) => e.key == 'Enter' ? login() : null }
            onChange={(e) => (
              setError(''),
              setPassword(e.target.value)
            )}
          />
        </div>
        <div className="form-group container-centerWidth">
          <button
           className="form-group-button-small element-white"
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
        {error && 
          <div className="container-center padding-0">
            <div className="form-group-error-light">
              {error}
            </div>
          </div>
        }
      </div>
    </div>
  )
}
