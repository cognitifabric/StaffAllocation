
import SVG from '../libs/svg.js'

const ColumnListRight = ({
  allocations,
  onDragOver,
  handleOnDrop,
  onDragStartFillBar,
  handleOnDropFillbar,
  isHovered,
  setHovered,
  glowAll,
  handleDeleteFillbar,
  onDragStart,
  handleDeleteAllocation,
  updateAllocationItems,
  updateFillBarData,
  containerRefRight,
  colorPallete,
  setColorPallete,
  headingSettings,
  setPalleteType,
  handlePermissions
}) => {
  
  return (
    <div 
      className="scrollHorizontal whalf scrollVertical freezedPanes"
      ref={containerRefRight}
    >
    <div className="w100">
      { allocations && allocations.map(( allocation, idx ) => 
        allocation.order == 3 &&
        <div 
          id={allocation.id}
          key={idx}
          className="lightGray-background curved"
          onDragOver={(e)=> onDragOver(e)}
          onDrop={(e) => {
            if(handlePermissions()){
              handleOnDrop(e)
            }
          }}
        >
          <div className="container-flex-left wfull">
            <div 
              id={allocation.id}
              className="element-button-allocation w20 curved-eased lightContrast schemeFour fontSize-12 capitalize h6"
              data-test-id="3"
              draggable
              onDragStart={(e) => onDragStart(e, allocation, allocations)}
              onMouseEnter={() => setHovered(`hover${allocation.id}${idx}`)}
              onMouseLeave={() => setHovered('')}
              onClick={() => glowAll(allocation.id)}
            >
              { isHovered == `hover${allocation.id}${idx}` &&
                <div 
                  onClick={(e) => {
                    if(handlePermissions()){
                      handleDeleteAllocation(e, allocation)
                    }
                  }}
                  className="elementSvgContainer">
                    <SVG svg={'thrashCan'}></SVG>
                </div>
              }
              { isHovered == `hover${allocation.id}${idx}` &&
              <div 
                onClick={(e) => {
                  if(handlePermissions()){
                    setColorPallete(allocation.id),
                    setPalleteType('allocations')
                  }
                }}
                className="elementSvgContainer positionRight noColor"
              >
                  <SVG svg={'pallete'}></SVG>
              </div>
            }
              <div 
                className="progressBar schemeFourAbsolute curved-eased"
                style={{ 
                  width: `${ Math.min(100, Math.max(0, (allocation.allocation/allocation.fte) * 100 ))}%`,
                  backgroundColor: allocation.color
                }}
              >
              </div>
              <input 
                type="text"
                className="elementInnerBox schemeFour"
                style={{ borderColor: allocation.fte }}
                value={ allocation.fte }
                onChange={(e) => {
                  if(handlePermissions()){
                    updateAllocationItems(allocation.id, 'fte', e.target.value) 
                  }
                }}
              >
              </input>
              <input 
                type="text"
                className="elementInnerText darkContrast curved-eased"
                value={ allocation.text }
                onChange={(e) => {
                  if(handlePermissions()){
                    updateAllocationItems(allocation.id, 'text', e.target.value) 
                  }
                }}
              >
              </input>
              <input
                type="text"
                style={{ borderColor: allocation.allocation }}
                className={`elementInnerBox schemeFour ${allocation.allocation > parseFloat(allocation.fte) ? ' redText' : ''}`}
                value={ allocation.allocation ? parseFloat(allocation.allocation.replace(/(\.\d*?[1-9])0+$/g, '$1')) : ''}
                readOnly
                // onChange={(e) => updateAllocationItems(allocation.id, 'allocation', e.target.value) }
              >
              </input>
            </div>
            
            <div className="container-flex-left wfull h10 fontSize-16 capitalize scrollHorizontal">
              { allocation.fillBars && allocation.fillBars.map(( fillBar, idx) => 
              <div 
                key={idx}
                id={fillBar.id}
                draggable
                data-test-id="3"
                onDragOver={(e)=> onDragOver(e)}
                onDragStart={(e) => onDragStartFillBar(e, fillBar, allocation.id, allocation)}
                onDrop={(e) => {
                  if(handlePermissions()){
                    handleOnDropFillbar(e, allocation)
                  }
                }}
                className="element-button-allocation curved-eased lightContrast schemeFive fontSize-12 capitalize h6"
                onMouseEnter={() => setHovered(`hover${fillBar.id}${allocation.id}`)}
                onMouseLeave={() => setHovered('')}
                onClick={() => glowAll(fillBar.id)}
              >
                { isHovered == `hover${fillBar.id}${allocation.id}` &&
                  <div 
                    className="elementSvgContainer"
                    onClick={(e) => {
                      if(handlePermissions()){
                        handleDeleteFillbar(e, allocation, fillBar.id)
                      }
                    }}
                  >
                    <SVG svg={'thrashCan'}></SVG>
                  </div>
                }
                <div 
                  className="progressBar schemeFiveAbsolute curved-eased"
                  style={{ 
                    width: `${ Math.min(100, Math.max(0, (fillBar.allocation/fillBar.fte) * 100 ))}%`,
                    backgroundColor: headingSettings && headingSettings.length > 0 ? headingSettings[3].color : '#587B7F'
                  }}
                >
                </div>
                {/* <input 
                  type="text"
                  className="elementInnerBox schemeFive"
                  value={ fillBar.fte }
                  onChange={(e) => updateFillBarData(allocation.id, idx, 'fte', e.target.value) }
                >
                </input> */}
                <input 
                  type="text" 
                  className="elementInnerText darkContrast curved-eased"
                  value={ fillBar.text }
                  onChange={(e) => {
                    if(handlePermissions()){
                      updateFillBarData(allocation.id, idx, 'text', e.target.value) 
                    }
                  }}
                >
                </input>
                <input 
                  type="text"
                  style={{ borderColor: headingSettings && headingSettings.length > 0 ? headingSettings[3].color : '#587B7F' }} 
                  className="elementInnerBox schemeFive"
                  value={ fillBar.allocation ? fillBar.allocation.replace(/(\.\d*?[1-9])0+$/g, '$1') : '' }
                  onChange={(e) => {
                    if(handlePermissions()){
                      updateFillBarData(allocation.id, idx, 'allocation', e.target.value) 
                    }
                  }}
                >
                </input>
              </div>
              )}
            </div>

            </div>
        </div>
      )}
    </div>
    </div>
  )
}

export default ColumnListRight
