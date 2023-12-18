import React, { useState } from 'react';
import SVG from '../libs/svg'

const Dropdown = ({
  changeSort,
  listType,
  allocations,
  setSortLeftType,
  setSortRightType
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
              changeSort('text', listType),
              listType == 'two' ? setSortLeftType({ type: 'text', order: listType }) : null,
              listType == 'three' ? setSortRightType({ type: 'text', order: listType }) : null
            )}
          >
            A-Z
          </li>
          <li
            onClick={() => (
              changeSort('fte', listType),
              listType == 'two' ? setSortLeftType({ type: 'fte', order: listType }) : null,
              listType == 'three' ? setSortRightType({ type: 'fte', order: listType }) : null
            )}
          >
            FTE
          </li>
          <li
            onClick={() => (
              changeSort('allocation', listType),
              listType == 'two' ? setSortLeftType({ type: 'allocation', order: listType }) : null,
              listType == 'three' ? setSortRightType({ type: 'allocation', order: listType }) : null
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