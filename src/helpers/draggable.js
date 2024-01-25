import { switchPositions } from '@/helpers/utilities';

export {
  onDragStart,
  onDragOver,
  onDrop,
  onDragStartFillBar,
  onDropFillBar
}

const onDragStart = (e, allocation, allocations) => {

  const object = new Object()
  object.allocation     = allocation
  object.allocations    = allocations
  
  e.dataTransfer.setData('text/plain', JSON.stringify(object));
}

const onDragStartFillBar = (e, fillBar, id, allocation) => {

  const object = new Object()
  object.fillBar      = fillBar
  object.id           = id
  object.allocation   = allocation
  
  e.dataTransfer.setData('text/plain', JSON.stringify(object));
  
}

const onDragOver = (e) => {
  // if (e.target.childNodes.length > 1) { return; }
  e.preventDefault()
}

const onDrop = (e) => {
  e.preventDefault();
  let droppedItem = JSON.parse(e.dataTransfer.getData('text/plain', e.dataTransfer.getData("object")))

  if(!droppedItem.allocations) return false

  const allocationContainer = droppedItem.allocations.find((item) => {

    if(item.id === e.currentTarget.id) return item
    
  })
  
  if(droppedItem.allocation.order == allocationContainer.order) return false
  if(droppedItem.allocation.order == 3) return false

  const onDropId = e.currentTarget.id
  const object = new Object()

  const pickedContainer = droppedItem.allocations.find((item) => {

    if(item.id === onDropId) return item
    
  })
  
  droppedItem.allocation.allocation   = ""
  object.allocation                   = droppedItem
  object.onDropId                     = onDropId
  object.pickedContainer              = pickedContainer
  object.pickedContainer.allocation   = ""
  
  return object
  
}

const onDropFillBar = (e) => {
  e.preventDefault();
  
  let droppedItem = JSON.parse(e.dataTransfer.getData('text/plain', e.dataTransfer.getData("object")))

  const onDropId    = e.currentTarget.id
  let item          = {...droppedItem.allocation}
  
  let newItem = switchPositions(item, droppedItem.fillBar.id, onDropId)

  return newItem
  
}