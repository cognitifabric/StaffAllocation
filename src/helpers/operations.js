
const _ = require('lodash');

export const handleChangeTeam = (team, setTeamID, setAllocations, setSelectedTeam) => {

  let newAllocations = []
  
  newAllocations = [...team.allocations]
  newAllocations.sort((a, b) => a.order - b.order) 
  
  setTeamID(team.id)
  setSelectedTeam(team)
  setAllocations(newAllocations)
  
}

export const changeSort = (
  sortType,
  listType,
  allocations,
  setAllocations,
  setSortTwo,
  setSortThree,
  sortTwo,
  sortThree,
  sortLeftType,
  sortRightType,
  setSortLeftType,
  setSortRightType
) => {
  if (listType === "two") {
    // Determine if the sort type is changing or staying the same
    const isSameSortType = sortLeftType.type === sortType;

    // Update sort direction
    const newSortDirection = isSameSortType ? !sortTwo : true;

    // Sort logic
    const newList = allocations
      .slice()
      .filter(item => item.order === 2) // Only items with order === 2 (left column)
      .sort((a, b) => {
        if (sortType === "text") {
          // Handle text-based sorting
          const textA = a[sortType].toLowerCase();
          const textB = b[sortType].toLowerCase();
          return newSortDirection ? textA.localeCompare(textB) : textB.localeCompare(textA);
        } else {
          // Handle numeric sorting (fte or allocation)
          const numA = parseFloat(a[sortType]);
          const numB = parseFloat(b[sortType]);
          return newSortDirection ? numA - numB : numB - numA;
        }
      });

    // Update allocations
    const newAllocations = [...allocations];
    let newIndex = 0;
    newAllocations.forEach((item, index) => {
      if (item.order === 2) {
        newAllocations[index] = newList[newIndex++];
      }
    });

    setAllocations(newAllocations);

    // Update state
    setSortTwo(newSortDirection);
    setSortLeftType({ type: sortType, order: listType });
  }

  if (listType === "three") {
    // Determine if the sort type is changing or staying the same
    const isSameSortType = sortRightType.type === sortType;

    // Update sort direction
    const newSortDirection = isSameSortType ? !sortThree : true;

    // Sort logic
    const newList = allocations
      .slice()
      .filter(item => item.order === 3) // Only items with order === 3 (right column)
      .sort((a, b) => {
        if (sortType === "text") {
          // Handle text-based sorting
          const textA = a[sortType].toLowerCase();
          const textB = b[sortType].toLowerCase();
          return newSortDirection ? textA.localeCompare(textB) : textB.localeCompare(textA);
        } else {
          // Handle numeric sorting (fte or allocation)
          const numA = parseFloat(a[sortType]);
          const numB = parseFloat(b[sortType]);
          return newSortDirection ? numA - numB : numB - numA;
        }
      });

    // Update allocations
    const newAllocations = [...allocations];
    let newIndex = 0;
    newAllocations.forEach((item, index) => {
      if (item.order === 3) {
        newAllocations[index] = newList[newIndex++];
      }
    });

    setAllocations(newAllocations);

    // Update state
    setSortThree(newSortDirection);
    setSortRightType({ type: sortType, order: listType });
  }
};

export const savedSort = (sortType, listType, allocations, setAllocations, setSortTwo, setSortThree, savedSortTwo, savedSortThree) => {
  
  if(listType == 'two'){
    let newList = []

    if(sortType == 'text'){
      newList = allocations
        .slice()
        .sort( (a, b) => {

        const textA = a[sortType].toLowerCase();
        const textB = b[sortType].toLowerCase();

        if (textA < textB) return savedSortTwo ? -1 : 1;
        if (textA > textB) return savedSortTwo ? 1 : -1;
        return 0;

      }).filter((item) => {
        if(item.order == 2) return item
      })
    }

    if(sortType !== 'text'){
      newList = allocations
        .slice()
        .sort( (a, b) => {

        const numA = parseFloat(a[sortType]);
        const numB = parseFloat(b[sortType]);
        
        if (numA < numB) return savedSortTwo ? 1 : -1;
        if (numA > numB) return savedSortTwo ? -1 : 1;
        return 0;

      }).filter((item) => {
        if(item.order == 2) return item
      })
    }

    let newAllocations = [...allocations]

    newAllocations.forEach((item, index) => {
      if (item.order === 2) {
        const targetItem = newList.shift();
        newAllocations[index] = targetItem;
      }
    });

    setAllocations(newAllocations)
    setSortTwo(!savedSortTwo)

  }

  if(listType == 'three'){
    let newList = []
    
    if(sortType == 'text'){
      newList = allocations
        .slice()
        .sort( (a, b) => {

          const textA = a[sortType].toLowerCase();
          const textB = b[sortType].toLowerCase();

          if (textA < textB) return savedSortThree ? -1 : 1;
          if (textA > textB) return savedSortThree ? 1 : -1;
          return 0;

        }).filter((item) => {
        if(item.order == 3) return item
      })
    }

    if(sortType !== 'text'){
      newList = allocations
        .slice()
        .sort( (a, b) => {

        const numA = parseFloat(a[sortType]);
        const numB = parseFloat(b[sortType]);
        
        if (numA < numB) return savedSortThree ? 1 : -1;
        if (numA > numB) return savedSortThree ? -1 : 1;
        return 0

      }).filter((item) => {
        if(item.order == 3) return item
      })
    }

    let newAllocations = [...allocations]
    

    newAllocations.forEach((item, index) => {
      if (item.order === 3) {
        const targetItem = newList.shift();
        newAllocations[index] = targetItem;
      }
    });

    setAllocations(newAllocations)
    setSortThree(!savedSortThree)

  }
  

}

export const compareArrays = (oldArray, newArray, key) => {
  return newArray.find(newObj => !oldArray.some(oldObj => oldObj[key] === newObj[key]));
}

// Utility function to check object equality
export const isEqual = (objA, objB) => {
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (objA[key] !== objB[key]) {
      return false;
    }
  }

  return true;

}

export const removeObjectFromArray = (array, targetObj) => {
  return array.filter(obj => obj !== targetObj);
}

export const updateObjectById = (oldArray, newArray, providedId) => {
  const updatedObject = newArray.find(obj => obj.id === providedId);

  if (updatedObject) {
    const index = oldArray.findIndex(obj => obj.id === providedId);

    if (index !== -1) {
      // Replace the old object with the updated object
      oldArray[index] = updatedObject;
    }
  }

  return oldArray;
}
