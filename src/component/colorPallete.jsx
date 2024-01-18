
import { colors } from '../helpers/data'
import SVG from '../libs/svg'

const ColorPallete = ({
  colorPallete,
  setColorPallete,
  headingSettings,
  updateHeadingSetting,
  palleteType,
  setPalleteType,
  updateAllocationItems
}) => {

  // console.log(headingSettings)
  // console.log(colorPallete)
  
  return (
    <div className="elementColorPalletePopup">
      <div className="elementColorPalletePopupContainer">
        <div 
          className="elementSvgContainer"
          onClick={() => (
            setColorPallete(''),
            setPalleteType('')
          )}
        >
          <SVG svg={'close'}></SVG>
        </div>
        {palleteType == 'headings' && colors.map((item, idx) => 
          <div 
            key={idx}
            style={{ backgroundColor: item }}
            className="elementColorPalletePopupItem"
            onClick={() => (
              updateHeadingSetting(headingSettings.find(( item ) =>  item.id === colorPallete).order, null, item),
              setColorPallete(''),
              setPalleteType('')
            )}
          >
          </div>
        )}
        {palleteType == 'allocations' && colors.map((item, idx) => 
          <div 
            key={idx}
            style={{ backgroundColor: item }}
            className="elementColorPalletePopupItem"
            onClick={() => (
              updateAllocationItems(colorPallete, 'color', item),
              setColorPallete(''),
              setPalleteType('')
            )}
          >
          </div>
        )}
      </div>      
    </div>
  )
}

export default ColorPallete
