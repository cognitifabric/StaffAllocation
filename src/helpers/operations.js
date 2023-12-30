
export const handleChangeTeam = (team, setTeamID, setAllocations) => {

  let newAllocations = []
  
  newAllocations = [...team.allocations]
  newAllocations.sort((a, b) => a.order - b.order) 
  
  setTeamID(team.id)
  setAllocations(newAllocations)
  
}

export const changeSort = (sortType, listType, allocations, setAllocations, setSortTwo, setSortThree, sortTwo, sortThree) => {
  
  if(listType == 'two'){
    let newList = []
    
    if(sortType == 'text'){
      newList = allocations
        .slice()
        .sort( (a, b) => {

        const textA = a[sortType].toLowerCase();
        const textB = b[sortType].toLowerCase();

        if (textA < textB) return sortTwo ? -1 : 1;
        if (textA > textB) return sortTwo ? 1 : -1;
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
        
        if (numA < numB) return sortTwo ? 1 : -1;
        if (numA > numB) return sortTwo ? -1 : 1;
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

    // setSavedSortTwo(sortTwo)
    setAllocations(newAllocations)
    setSortTwo(!sortTwo)

  }

  if(listType == 'three'){
    let newList = []
    
    if(sortType == 'text'){
      newList = allocations
        .slice()
        .sort( (a, b) => {

          const textA = a[sortType].toLowerCase();
          const textB = b[sortType].toLowerCase();

          if (textA < textB) return sortThree ? -1 : 1;
          if (textA > textB) return sortThree ? 1 : -1;
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
        
        if (numA < numB) return sortThree ? 1 : -1;
        if (numA > numB) return sortThree ? -1 : 1;
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

    // setSavedSortThree(sortThree)
    setAllocations(newAllocations)
    setSortThree(!sortThree)

  }
  

}

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