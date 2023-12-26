
import SVG from '../libs/svg.js'
import { useEffect, useState } from 'react'

const ColumnListLeft = ({
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
  containerRefLeft,
  colorPallete,
  setColorPallete,
  headingSettings,
  setPalleteType,
  handlePermissions
}) => {
  
  return (
    <div 
      className="scrollHorizontal whalf scrollVertical freezedPanes"
      ref={containerRefLeft}
    >
    <div className="w100">
    { allocations && allocations.map(( allocation, idx ) => 
      allocation.order == 2 &&
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
        <div className="container-flex-right wfull">
          <div className="container-flex-right wfull h10 fontSize-16 capitalize scrollReverse">
            { allocation.fillBars.map( ( fillBar, idx) => 
              <div 
                key={idx}
                id={fillBar.id}
                className="element-button-allocation curved-eased lightContrast schemeTwo fontSize-12 capitalize h6"
                draggable
                data-test-id="2"
                onDragOver={(e)=> onDragOver(e)}
                onDragStart={(e) => onDragStartFillBar(e, fillBar, allocation.id, allocation)}
                onDrop={(e) => {
                  if(handlePermissions()){
                    handleOnDropFillbar(e, allocation)
                  }
                }}
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
                  className="progressBar schemeTwoAbsolute curved-eased"
                  style={{ 
                    width: `${ Math.min(100, Math.max(0, (fillBar.allocation/fillBar.fte) * 100 ))}%`,
                    backgroundColor: headingSettings.length > 0 ? headingSettings[0].color : '#587B7F'  
                  }}
                >
                </div>
                <input 
                  type="text"
                  style={{ borderColor: headingSettings.length > 0 ? headingSettings[0].color : '#587B7F' }}  
                  className="elementInnerBox schemeTwo"
                  value={ fillBar.allocation ? parseFloat(fillBar.allocation.replace(/(\.\d*?[1-9])0+$/g, '$1')) : ''}
                  readOnly
                  // onChange={(e) => updateFillBarData(allocation.id, idx, 'allocation', e.target.value) }
                >
                </input>
                <input 
                  type="text"
                  className="elementInnerText darkContrast curved-eased"
                  value={ fillBar.text }
                  readOnly
                  // onChange={(e) => updateFillBarData(allocation.id, idx, 'text', e.target.value) }
                >
                </input>
                {/* <input 
                  type="text"
                  className="elementInnerBox schemeTwo"
                  value={ fillBar.fte }
                  onChange={(e) => updateFillBarData(allocation.id, idx, 'fte', e.target.value) }
                >
                </input> */}
            </div>
          )}
          </div>
          <div 
            id={allocation.id}
            className="element-button-allocation w20 curved-eased lightContrast schemeOne fontSize-12 capitalize h6"
            draggable
            data-test-id="2"
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
                className="elementSvgContainer positionLeftZero noColor"
              >
                  <SVG svg={'pallete'}></SVG>
              </div>
            }
            <div 
              className="progressBar schemeOneAbsolute curved-eased"
              style={{ 
                width: `${ Math.min(100, Math.max(0, (allocation.allocation/allocation.fte) * 100 ))}%`,
                backgroundColor: allocation.color
              }}
            >
            </div>
            <input 
              type="text"
              style={{ borderColor: allocation.color }}
              className="elementInnerBox schemeTwo"
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
              style={{ borderColor: allocation.color }}
              className={`elementInnerBox schemeTwo ${allocation.allocation > parseFloat(allocation.fte) ? ' redText' : ''}`}
              value={ allocation.allocation ? parseFloat(allocation.allocation.replace(/(\.\d*?[1-9])0+$/g, '$1')) : '' }
              readOnly
              // onChange={(e) => updateAllocationItems(allocation.id, 'allocation', e.target.value) }
            >
            </input>
          </div>
        </div>       
      </div>
    )}
    </div>
    </div>
  )
}

export default ColumnListLeft
