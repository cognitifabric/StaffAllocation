
import { useState, useEffect } from 'react'
import { findObjectById } from '@/helpers/utilities'
import SVG from '../../libs/svg'

//// COMPONENTS
import DropDown from '../../component/dropDown'

const HeadingSettings = ({
  yearID,
  dataUser,
  teamID,
  isHovered,
  setHovered,
  changeSort,
  allocations,
  setSortLeftType,
  setSortRightType,
  setAllocations,
  setSortTwo,
  setSortThree,
  sortTwo,
  sortThree,
  setSavedSortTwo,
  setSavedSortThree,
  updateHeadingSetting,
  handlePermissions,
  setColorPallete,
  setPalleteType,
  selectedYear,
  selectedTeam,
  headingSettings
}) => {
  
  return (
    <>
      <div className="container-flex-right whalf border-right">
        <div
          style={{ backgroundColor: selectedTeam && selectedTeam.settings.length > 0 ? selectedTeam.settings[0].color : '#254D32' }} 
          className="element-button-text curved-eased wfull"
          onMouseEnter={() => setHovered(`${ selectedTeam && selectedTeam.settings.find(( item ) =>  item.order === 1).id}`)}
          onMouseLeave={() => setHovered('')}
        >
          { selectedTeam && selectedTeam.settings.length > 0 && isHovered == selectedTeam.settings.find(( item ) =>  item.order === 1).id &&
          <div 
            onClick={(e) => {
              if(handlePermissions()){
                setColorPallete(selectedTeam.settings.find(( item ) =>  item.order === 1).id),
                setPalleteType('headings')
              }
            }}
            className="elementSvgContainer positionLeftZero noColor"
          >
              <SVG svg={'pallete'}></SVG>
          </div>
          }
          <input 
            type="text"
            style={{ backgroundColor: selectedTeam && selectedTeam.settings.length > 0 ? selectedTeam.settings[0].color : '#587B7F' }} 
            className="element-button-text curved-eased wfull fontSize-16 capitalize"
            value={ selectedTeam && selectedTeam.settings.length > 0 ? selectedTeam.settings.find(( item ) =>  item.order === 1).content : 'Districts' }
            onChange={(e) => {
              if(handlePermissions()){
                updateHeadingSetting(1, e.target.value)
              }
            }}
          >
          </input>
        </div>
        <div
          style={{ backgroundColor: selectedTeam && selectedTeam.settings.length > 0 ? selectedTeam.settings[1].color : '#587B7F' }}  
          className="element-button-text curved-eased w20"
          onMouseEnter={() => setHovered(`${ selectedTeam && selectedTeam.settings.find(( item ) =>  item.order === 2).id}`)}
          onMouseLeave={() => setHovered('')}
        >
          { selectedTeam && selectedTeam.settings.length > 0 && isHovered == selectedTeam.settings.find(( item ) =>  item.order === 2).id &&
          <div 
            onClick={(e) => {
              if(handlePermissions()){
                setColorPallete( selectedTeam && selectedTeam.settings.find(( item ) =>  item.order === 2).id),
                setPalleteType('headings')
              }
            }}
            className="elementSvgContainer positionLeftZero noColor"
          >
              <SVG svg={'pallete'}></SVG>
          </div>
          }
          <input 
            type="text"
            style={{ backgroundColor: selectedTeam && selectedTeam.settings.length > 0 ? selectedTeam.settings[1].color : '#587B7F' }}  
            className="element-button-text curved-eased w20 fontSize-16 capitalize"
            value={ selectedTeam && selectedTeam.settings.length > 0 ? selectedTeam.settings.find(( item ) =>  item.order === 2).content : 'Employees' }
            onChange={(e) => {
              if(handlePermissions()){
                updateHeadingSetting(2, e.target.value) 
              }
            }}
          >
          </input>
        </div>
        <div 
          className="element-button-icon"
        >
          <DropDown
            changeSort={changeSort}
            listType="two"
            allocations={allocations}
            setSortLeftType={setSortLeftType}
            setSortRightType={setSortRightType}
            setAllocations={setAllocations}
            setSortTwo={setSortTwo}
            setSortThree={setSortThree}
            sortTwo={sortTwo}
            sortThree={sortThree}
            setSavedSortTwo={setSavedSortTwo}
            setSavedSortThree={setSavedSortThree}
          >
          </DropDown>
        </div>
      </div>
      <div className="container-flex-left whalf">
        <div 
          className="element-button-icon"
        >
          <DropDown
            changeSort={changeSort}
            listType="three"
            allocations={allocations}
            setSortLeftType={setSortLeftType}
            setSortRightType={setSortRightType}
            setAllocations={setAllocations}
            setSortTwo={setSortTwo}
            setSortThree={setSortThree}
            sortTwo={sortTwo}
            sortThree={sortThree}
            setSavedSortTwo={setSavedSortTwo}
            setSavedSortThree={setSavedSortThree}
          >
          </DropDown>
        </div>
        <div
          style={{ backgroundColor: selectedTeam && selectedTeam.settings.length > 0 ? selectedTeam.settings[2].color : '#587B7F' }}  
          className="element-button-text curved-eased w20"
          onMouseEnter={() => setHovered(`${selectedTeam && selectedTeam.settings.find(( item ) =>  item.order === 3).id}`)}
          onMouseLeave={() => setHovered('')}
        >
          { selectedTeam && selectedTeam.settings.length > 0 && isHovered == selectedTeam.settings.find(( item ) =>  item.order === 3).id &&
          <div 
            onClick={(e) => {
              if(handlePermissions()){
                  setColorPallete(selectedTeam.settings.find(( item ) =>  item.order === 3).id),
                  setPalleteType('headings')
              }
            }}
            className="elementSvgContainer positionLeftZero noColor"
          >
              <SVG svg={'pallete'}></SVG>
          </div>
          }
          <input 
            type="text"
            style={{ backgroundColor: selectedTeam && selectedTeam.settings.length > 0 ? selectedTeam.settings[2].color : '#587B7F' }}  
            className="element-button-text curved-eased w20 fontSize-16 capitalize"
            value={ selectedTeam && selectedTeam.settings.length > 0 ? selectedTeam.settings.find(( item ) =>  item.order === 3).content : 'Locations' }
            onChange={(e) => 
              {
                if(handlePermissions()){
                  updateHeadingSetting(3, e.target.value) 
                }
              }
            }
          >
          </input>
        </div>
        <div
          style={{ backgroundColor: selectedTeam && selectedTeam.settings.length > 0 ? selectedTeam.settings[3].color : '#587B7F' }}  
          className="element-button-text curved-eased wfull"
          onMouseEnter={() => setHovered(`${selectedTeam && selectedTeam.settings.find(( item ) =>  item.order === 4).id}`)}
          onMouseLeave={() => setHovered('')}
        >
          { selectedTeam && selectedTeam.settings.length > 0 && isHovered == selectedTeam.settings.find(( item ) =>  item.order === 4).id &&
          <div 
            onClick={(e) => {
              if(handlePermissions()){
                setColorPallete(selectedTeam && selectedTeam.settings.find(( item ) =>  item.order === 4).id),
                setPalleteType('headings')
              }
            }}
            className="elementSvgContainer positionLeftZero noColor"
          >
              <SVG svg={'pallete'}></SVG>
          </div>
          }
          <input 
            type="text"
            style={{ backgroundColor: selectedTeam && selectedTeam.settings.length > 0 ? selectedTeam.settings[3].color : '#587B7F' }}  
            className="element-button-text curved-eased wfull fontSize-16 capitalize"
            value={ selectedTeam && selectedTeam.settings.length > 0 ? selectedTeam.settings.find(( item ) =>  item.order === 4).content : 'Allocations' }
            onChange={(e) => {
              if(handlePermissions()){
                updateHeadingSetting(4, e.target.value)
              }
            }}
          >
          </input>
        </div>
      </div>
    </>
  )
}

export default HeadingSettings
