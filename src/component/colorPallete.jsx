
import { colors } from '../helpers/data'
import SVG from '../libs/svg'

const ColorPallete = ({
  colorPallete,
  setColorPallete
}) => {
  
  return (
    <div className="elementColorPalletePopup">
      <div className="elementColorPalletePopupContainer">
        
      </div>
      {colors.map((item, idx) => 
      <div 
        key={idx}
        style={{ backgroundColor: item }}
        className="elementColorPalletePopupItem"
      >
        <div 
          className="elementSvgContainer"
          onClick={() => setColorPallete('')}
        >
          <SVG svg={'close'}></SVG>
        </div>
      </div>
      )}
      
    </div>
  )
}

export default ColorPallete
