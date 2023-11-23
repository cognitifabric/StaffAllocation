
import SVG from '../../../public/svg'

const Navigation = ({}) => {
  
  return (
    <div className="nav">
      <div className="nav-logo">Staffing</div>
      <div className="nav-list">
        <div className="nav-list-item">Logout</div>
        <div className="nav-icon">
          <SVG
            svg={'account'}
            width={30}
            height={30}
            schemeOne={'#FFFFFF'}
          >
          </SVG>
        </div>
      </div>
    </div>
  )
}

export default Navigation
