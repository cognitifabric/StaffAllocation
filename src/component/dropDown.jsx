import React, { useState } from 'react';
import SVG from '../libs/svg'

const Dropdown = ({
  changeSort,
  listType,
  allocations,
  setSortLeftType,
  setSortRightType,
  setAllocations,
  setSortTwo,
  setSortThree,
  sortTwo,
  sortThree,
  setSavedSortTwo,
  setSavedSortThree
}) => {

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div 
      className="dropdown"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="svgContainer">
        <SVG svg={'dropdown'}></SVG>
      </div>
      {isOpen && 
        <ul className="dropdown-menu curved-eased">
          <li
            onClick={() => (
              changeSort('text', listType, allocations, setAllocations, setSortTwo, setSortThree, sortTwo, sortThree, setSavedSortTwo, setSavedSortThree),
              listType == 'two' ? setSortLeftType({ type: 'text', order: listType }) : setSortLeftType(''),
              listType == 'three' ? setSortRightType({ type: 'text', order: listType }) : setSortRightType('')
            )}
          >
            A-Z
          </li>
          <li
            onClick={() => (
              changeSort('fte', listType, allocations, setAllocations, setSortTwo, setSortThree, sortTwo, sortThree, setSavedSortTwo, setSavedSortThree),
              listType == 'two' ? setSortLeftType({ type: 'fte', order: listType }) : setSortLeftType(''),
              listType == 'three' ? setSortRightType({ type: 'fte', order: listType }) : setSortRightType('')
            )}
          >
            FTE
          </li>
          <li
            onClick={() => (
              changeSort('allocation', listType, allocations, setAllocations, setSortTwo, setSortThree, sortTwo, sortThree),
              listType == 'two' ? setSortLeftType({ type: 'allocation', order: listType }) : setSortLeftType(''),
              listType == 'three' ? setSortRightType({ type: 'allocation', order: listType }) : setSortRightType('')
            )}
          >
            Allocation
          </li>
        </ul>
      }
    </div>
  );
};

export default Dropdown;