

import SVG from '../../../public/svg'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const Navigation = ({
  loggedOut,
  removeCookie,
  user,
  setPopup,
  cookies 
}) => {
  
  const router = useRouter();
  const [menu, setMenu] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  
  const logOut = () => {

    removeCookie('accessToken')
    removeCookie('user')
    router.push('/')
    
  }

  useEffect(() => {
    // console.log(cookies)
    if(user){
      setName(user.data.user.name)
      setRole(cookies ? cookies.user.role : user.data.user.role)
    }
  }, [user])
  
  return (
    <div className="nav">
      <div className="nav-logo">StaffingMap</div>
      <div className="nav-list">
        {!loggedOut &&
        <>
          <div 
            className="nav-icon nav-account"
            onClick={() => menu == '' ? setMenu('settings') : setMenu('')}
          >
            <SVG
              svg={'account'}
              width={30}
              height={30}
              schemeOne={'#FFFFFF'}
            >
            </SVG>
            { menu == 'settings' && role == 'viewer' &&
              <div className="nav-account-menu">
                <h1>Admin: {name}</h1>
                <div className="nav-account-menu-item">My Profile</div>
                <div 
                  className="nav-account-menu-item" 
                  onClick={() => logOut()}
                >
                  Logout
                </div>
              </div>
            } 
            { menu == 'settings' && role == 'editor' &&
              <div className="nav-account-menu">
                <h1>Admin: {name}</h1>
                <div className="nav-account-menu-item">My Profile</div>
                <div 
                  className="nav-account-menu-item" 
                  onClick={() => logOut()}
                >
                  Logout
                </div>
              </div>
            } 
            { menu == 'settings' && role == 'entityAdmin' &&
              <div className="nav-account-menu">
                <h1>Admin: {name}</h1>
                <div className="nav-account-menu-item">My Profile</div>
                <div 
                  className="nav-account-menu-item"
                  onClick={() => setPopup('editAllEntityUsers')}
                >
                  Edit Users
                </div>
                <div 
                  className="nav-account-menu-item" 
                  onClick={() => logOut()}
                >
                  Logout
                </div>
              </div>
            } 
            { menu == 'settings' && role == 'systemAdmin' &&
              <div className="nav-account-menu">
                <h1>Admin: {name}</h1>
                <div 
                  className="nav-account-menu-item" 
                  onClick={() => logOut()}
                >
                  Logout
                </div>
              </div>
            } 
          </div>
          </>
        }
      </div>
    </div>
  )
}

export default Navigation
