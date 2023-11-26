

import SVG from '../../../public/svg'
import { useRouter } from 'next/navigation';

const Navigation = ({
  loggedOut,
  removeCookie
}) => {
  
  const router = useRouter();
  
  const logOut = () => {

    removeCookie('accessToken')
    removeCookie('user')
    router.push('/')
    
  }
  
  return (
    <div className="nav">
      <div className="nav-logo">StaffingMap</div>
      <div className="nav-list">
        {!loggedOut &&
        <>
          <div 
            className="nav-list-item"
            onClick={() => logOut()}
          >
            Logout
          </div>
          <div className="nav-icon">
            <SVG
              svg={'account'}
              width={30}
              height={30}
              schemeOne={'#FFFFFF'}
            >
            </SVG>
          </div>
          </>
        }
      </div>
    </div>
  )
}

export default Navigation
