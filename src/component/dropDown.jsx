import React, { useState } from 'react';
import SVG from '../libs/svg'

const Dropdown = ({
  changeSort,
  listType,
  allocations
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
            onClick={() => changeSort('text', listType)}
          >
            A-Z
          </li>
          <li
            onClick={() => changeSort('fte', listType)}
          >
            FTE
          </li>
          <li
            onClick={() => changeSort('allocation', listType)}
          >
            Allocation
          </li>
        </ul>
      }
    </div>
  );
};

export default Dropdown;