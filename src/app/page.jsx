"use client"
import Image from 'next/image'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { gql, useQuery } from "@apollo/client";


const query = gql`
  query {
    users {
      id
      username
    }
  }
`;

export default function Home() {

  const loadingColor = 'white'
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { loadingQuery, errorQuery, data } = useQuery(query)

  const login = async () => {

    setLoading(true)
    
    const form = new FormData();
    form.append('username', username);
    form.append('password', password);
    

    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_API, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      
      setLoading(false)
      window.location.href = '/staffing'
      
    } catch (error) {
      console.error('Error submitting data:', error);
      setLoading(false)
      if(error) setError(error.response.data)
      
    }
    
  }

  if (loadingQuery) return 'Loading...';
  if (errorQuery) return `Error! ${errorQuery.message}`;
   
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
