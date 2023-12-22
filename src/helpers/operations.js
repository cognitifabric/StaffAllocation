
export const handleChangeTeam = (team, setTeamID, setAllocations) => {

  let newAllocations = []
  
  newAllocations = [...team.allocations]
  newAllocations.sort((a, b) => a.order - b.order) 
  
  setTeamID(team.id)
  setAllocations(newAllocations)
  
}