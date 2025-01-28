"use client"
import SVG from '../../libs/svg'
import { useState, useEffect, useRef } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { ExcelRenderer } from 'react-excel-renderer';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';
import { debounce } from "lodash";
import GET_USER from '@/queries/fetchUser'
import GET_USERS from '@/queries/fetchUsers'
import ADD_SETTINGS from '@/mutations/addSettings'
import ADD_ALLOCATION from '@/mutations/addAllocation'
import UPDATE_ALLOCATION from '@/mutations/updateAllocation'
import ADD_FILLBAR from '@/mutations/addFillBar'
import UPDATE_FILLBAR from '@/mutations/updateFillBar'
import DELETE_FILLBAR from '@/mutations/deleteFillbar'
import DELETE_ALLOCATION from '@/mutations/deleteAllocation'
import UPLOAD_ALLOCATION from '@/mutations/uploadAllocation'
import ADD_YEAR from '@/mutations/addYear'
import ADD_TEAM from '@/mutations/addTeam'
import DELETE_TEAM from '@/mutations/deleteTeam'
import DELETE_YEAR from '@/mutations/deleteYear'
import UPDATE_YEAR from '@/mutations/updateYear'
import UPDATE_TEAM from '@/mutations/updateTeam'
import DUPLICATE_YEAR from '@/mutations/duplicateYear'
import io from 'socket.io-client'
const socket = io.connect(process.env.NEXT_PUBLIC_SOCKET, {transports: ['websocket', 'polling', 'flashsocket']});

//// HELPERS
import { onDragStart, onDragOver, onDrop, onDropFillBar, onDragStartFillBar } from '@/helpers/draggable';
import { sumByType, sum, findObjectById, customSort } from '@/helpers/utilities';
import { changeSort, compareArrays, findUpdatedObject, removeObjectFromArray, savedSort, updateObjectById } from '../../helpers/operations';

//// COMPONENTS
import Nav from '../_components/Navigation';
import HeadingSettings from '../_components/HeadingSettings'
import DropDown from '../../component/dropDown'
import ColumnListRight from '@/component/columnListRight';
import ColumnListLeft from '@/component/columnListLeft';
import ColorPallete from '@/component/colorPallete'
import SystemAdmin from '../_components/SystemAdmin'
import AddYear from '../_components/AddYear'
import AddTeam from '../_components/AddTeam'
import EditAllEntityUsers from '../_components/EditAllEntityUsers'
import EntityAdminEditUser from '../_components/EntityAdminEditUsers'
import EntityDeleteEntityUser from '../_components/EntityAdminDeleteUser'
import EntityAdminAddUser from '../_components/EntityAdminAddUser';
import EditYear from '../_components/EditYear'
import EditTeam from '../_components/EditTeam'

//// OPERATIONS
import { handleChangeTeam } from '../../helpers/operations';
import DuplicateYear from '../_components/DuplicateYear';

function Staffing () {

  const router = useRouter();

  const myRefs = useRef()
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken', 'user']);
  const [ headingSettings, setHeadingSettings ] = useState([])
  const [ allocations, setAllocations ] = useState([])
  const [ updatedAllocation, setUpdatedAllocation ] = useState('')
  const [ updatedFillbar, setUpdatedFillbar] = useState('')
  const [ allUsers, setAllUsers] = useState([])
  const [ loadingData, setLoadingData ] = useState(false)
  const [ yearID, setYearID] = useState('')
  const [ years, setYears] = useState([])
  const [ teamID, setTeamID] = useState('')
  const [ popup, setPopup] = useState('')
  const [ loading, setLoading] = useState('')
  const [ submitError, setSubmitError] = useState('')
  const [ sortTwo, setSortTwo ] = useState(true)
  const [ sortThree, setSortThree ] = useState(true)
  const [ sortType, setSortType] = useState('')
  const [ isTyping, setIsTyping ] = useState('');
  const [ isHovered, setHovered ] = useState('');
  const [ colorPallete, setColorPallete ] = useState('')
  const [ palleteType, setPalleteType] = useState('')
  const [ sortLeftType, setSortLeftType] = useState('')
  const [ sortRightType, setSortRightType] = useState('')
  const [ username, setUsername] = useState('')
  const [ userType, setUserType] = useState('')
  const [ userTypeFormField, setUserTypeFormField] = useState('')
  const [ editYear, setEditYear] = useState('')
  const [ editTeam, setEditTeam ] = useState('')
  const [ selectedYear, setSelectedYear] = useState('')
  const [ selectedTeam, setSelectedTeam] = useState('')
  const [ savedSortTwo, setSavedSortTwo] = useState(false)
  const [ savedSortThree, setSavedSortThree] = useState(false)
  const [ adding, setAdding] = useState(false)
  const [ updating, setUpdating] = useState(false)
  const [ deleting, setDeleting] = useState(false)
  const [ onDropID, setOnDropID] = useState('')
  const [ dragID, setDragID] = useState('')
  const [ inputDropdown, setInputDropdown] = useState('')
  const [ user, setUser] = useState('')
  const [ message, setMessage ] = useState('')
  
  const dataUser = useQuery(GET_USER, { variables: { id: cookies.user ? cookies.user.id : '', token: cookies.accessToken }})
  const users = useQuery(GET_USERS, { variables: { id: cookies.user ? cookies.user.id : ''} })
  const { refetch } = useQuery(GET_USER, {variables: { id: cookies.user ? cookies.user.id : '', token: cookies.accessToken }})
  
  const [ addSettings, { data, loadingSettings, errorSettings }] = useMutation(ADD_SETTINGS);
  const [ addAllocation, { dataAllocation, loadingAllocation, errorAllocation }] = useMutation(ADD_ALLOCATION, { refetchQueries: [ GET_USER ] });
  const [ updateAllocationMutation, { dataUpdateAllocation, loadingUpdateAllocation, errorUpdatedAllocation }] = useMutation(UPDATE_ALLOCATION, { refetchQueries: [ GET_USER ]});
  const [ addFillBar, { dataAddFillBar, loadingAddFillBar, errorAddFillBar }] = useMutation(ADD_FILLBAR, { refetchQueries: [ GET_USER ]});
  const [ updateFillBar, { dataUpdateFillBar, loadingUpdateFillBar, errorUpdateFillBar }] = useMutation(UPDATE_FILLBAR, { refetchQueries: [ GET_USER ]})
  const [ deleteFillbar, { dataDeleteFillbar, loadingDeleteFillbar, errorDeleteFillbar }] = useMutation(DELETE_FILLBAR, { refetchQueries: [ GET_USER ]})
  const [ deleteAllocation, { dataDeleteAllocation, loadingDeleteAllocation, errorDeleteAllocation }] = useMutation(DELETE_ALLOCATION, { refetchQueries: [ GET_USER ]})
  const [ uploadAllocation, { dataUploadAllocation, loadingUploadAllocation, errorUploadAllocation }] = useMutation(UPLOAD_ALLOCATION, { refetchQueries: [ GET_USER ]})
  const [ addYear, { dataAddYear, loadingAddYear, errorAddYear }] = useMutation(ADD_YEAR, { refetchQueries: [ GET_USER ]})
  const [ addTeam, { dataAddTeam, loadingAddTeam, errorAddTeam }] = useMutation(ADD_TEAM, { refetchQueries: [ GET_USER ]})
  const [ deleteTeam, { dataDeleteTeam, loadingDeleteTeam, errorDeleteTeam }] = useMutation(DELETE_TEAM, { refetchQueries: [ GET_USER ]})
  const [ deleteYear, { dataDeleteYear, loadingDeleteYear, errorDeleteYear }] = useMutation(DELETE_YEAR, { refetchQueries: [ GET_USER ]})
  const [ updateYear, { dataUpdateYear, loadingUpdateYear, errorUpdateYear }] = useMutation(UPDATE_YEAR, { refetchQueries: [ GET_USER ]})
  const [ updateTeam, { dataUpdateTeam, loadingUpdateTeam, errorUpdateTeam }] = useMutation(UPDATE_TEAM, { refetchQueries: [ GET_USER ]})
  const [ duplicateYear, { dataDuplicateTeam, loadingDuplicateTeam, errorDuplicateTeam }] = useMutation(DUPLICATE_YEAR, { refetchQueries: [ GET_USER ]})
  const elementsWithIdRef = useRef([]);
  const containerRefLeft    = useRef(null);
  const containerRefRight   = useRef(null);
  
  const reset = () => {
    setSubmitError('')
    setLoading('')
    setUsername(''),
    setUserType(''),
    setUserTypeFormField(''),
    setMessage('')
  }

  const handlePermissions = () => {
    if(cookies && cookies.user.role){
      if(cookies.user.role == 'viewer'){
        setMessage('Not allowed, user has only viwer permissions') 
        return false
      }
    }
    return true
  }
  
  useEffect(() => {
    
    let newAllocations = []

    setLoadingData(true)
    
    if(dataUser.error){ 
      console.log('DATAUSER ERROR', dataUser.error)
      dataUser.error.message = 'Invalid token' ? router.push('/') : router.push('/error') 
    }

    if(!dataUser.error) setLoadingData(false)
    if(dataUser.data && dataUser.data.user.years.length > 0) setHeadingSettings(dataUser.data.user.years[0].teams[0].settings)
    if(dataUser.data && dataUser.data.user.years.length > 0){
      
      if(!yearID && dataUser.data.user.years[0]){
        
        setYearID(dataUser.data.user.years[0].id)
        setYears(dataUser.data.user.years)

      }
      
      if(!teamID && dataUser.data.user.years[0].teams[0]) setTeamID(dataUser.data.user.years[0].teams[0].id)

      if(teamID){

        setYears(dataUser.data.user.years)

        let yearSelected = findObjectById(dataUser.data.user.years, yearID)
        setSelectedYear(yearSelected)

        let teamSelected = findObjectById(yearSelected.teams, teamID)
        
        setSelectedTeam(teamSelected)
        
        if(teamSelected && !adding && !deleting && !updating){
          newAllocations = [...teamSelected.allocations]
          newAllocations.sort((a, b) => a.order - b.order) 

          setAllocations(newAllocations)
        }

        if (teamSelected && adding) {
        
          let newAllocations = [...teamSelected.allocations];
          let oldAllocations = [...allocations];
        
          // Find the newly added allocation
          const newObj = compareArrays(oldAllocations, newAllocations, "id");
        
          if (newObj.order === 2) {
            // Add to left column and apply sorting
            const leftColumn = oldAllocations
              .filter(item => item.order === 2)
              .concat(newObj) // Add the new item
              .sort((a, b) => {
                const sortType = sortLeftType.type;
                if (sortType === "text") {
                  const textA = a.text.toLowerCase();
                  const textB = b.text.toLowerCase();
                  return sortTwo ? textA.localeCompare(textB) : textB.localeCompare(textA);
                } else {
                  const numA = parseFloat(a[sortType]);
                  const numB = parseFloat(b[sortType]);
                  return sortTwo ? numA - numB : numB - numA;
                }
              });
        
            oldAllocations = [...leftColumn, ...oldAllocations.filter(item => item.order !== 2)];
          }
        
          if (newObj.order === 3) {
            // Add to right column and apply sorting
            const rightColumn = oldAllocations
              .filter(item => item.order === 3)
              .concat(newObj) // Add the new item
              .sort((a, b) => {
                const sortType = sortRightType.type;
                if (sortType === "text") {
                  const textA = a.text.toLowerCase();
                  const textB = b.text.toLowerCase();
                  return sortThree ? textA.localeCompare(textB) : textB.localeCompare(textA);
                } else {
                  const numA = parseFloat(a[sortType]);
                  const numB = parseFloat(b[sortType]);
                  return sortThree ? numA - numB : numB - numA;
                }
              });
        
            oldAllocations = [...oldAllocations.filter(item => item.order !== 3), ...rightColumn];
          }
        
          // Preserve allocations for other items (order !== 2 && order !== 3)
          const finalAllocations = [
            ...oldAllocations.filter(item => item.order === 2),
            ...oldAllocations.filter(item => item.order === 3),
            ...oldAllocations.filter(item => item.order !== 2 && item.order !== 3),
          ];
        
          setAllocations(finalAllocations);
        }
        

        if (teamSelected && deleting) {
          console.log("DELETING...");
        
          let updatedAllocations = teamSelected.allocations.filter(
            (allocation) => allocation.id !== dragID // Remove the deleted allocation
          );
        
          // Separate into left and right columns based on `order`
          const leftColumn = updatedAllocations
            .filter((item) => item.order === 2)
            .sort((a, b) => {
              const sortType = sortLeftType.type;
              if (sortType === "text") {
                const textA = a.text.toLowerCase();
                const textB = b.text.toLowerCase();
                return sortTwo ? textA.localeCompare(textB) : textB.localeCompare(textA);
              } else {
                const numA = parseFloat(a[sortType]);
                const numB = parseFloat(b[sortType]);
                return sortTwo ? numA - numB : numB - numA;
              }
            });
        
          const rightColumn = updatedAllocations
            .filter((item) => item.order === 3)
            .sort((a, b) => {
              const sortType = sortRightType.type;
              if (sortType === "text") {
                const textA = a.text.toLowerCase();
                const textB = b.text.toLowerCase();
                return sortThree
                  ? textA.localeCompare(textB)
                  : textB.localeCompare(textA);
              } else {
                const numA = parseFloat(a[sortType]);
                const numB = parseFloat(b[sortType]);
                return sortThree ? numA - numB : numB - numA;
              }
            });
        
          // Preserve allocations for other orders
          const finalAllocations = [
            ...leftColumn,
            ...rightColumn,
            ...updatedAllocations.filter((item) => item.order !== 2 && item.order !== 3),
          ];
        
          setAllocations(finalAllocations);
        }
        

        if (teamSelected && updating) {
          console.log("UPDATING...");
        
          let newAllocations = [...teamSelected.allocations];
          let oldAllocations = [...allocations];
        
          if (onDropID && dragID) {
            let updatedArray = updateObjectById(oldAllocations, newAllocations, onDropID);
            updatedArray = updateObjectById(updatedArray, newAllocations, dragID);
        
            // Separate into left and right columns based on `order`
            const leftColumn = updatedArray
              .filter((item) => item.order === 2)
              .sort((a, b) => {
                const sortType = sortLeftType.type;
                if (sortType === "text") {
                  const textA = a.text.toLowerCase();
                  const textB = b.text.toLowerCase();
                  return sortTwo
                    ? textA.localeCompare(textB)
                    : textB.localeCompare(textA);
                } else {
                  const numA = parseFloat(a[sortType]);
                  const numB = parseFloat(b[sortType]);
                  return sortTwo ? numA - numB : numB - numA;
                }
              });
        
            const rightColumn = updatedArray
              .filter((item) => item.order === 3)
              .sort((a, b) => {
                const sortType = sortRightType.type;
                if (sortType === "text") {
                  const textA = a.text.toLowerCase();
                  const textB = b.text.toLowerCase();
                  return sortThree
                    ? textA.localeCompare(textB)
                    : textB.localeCompare(textA);
                } else {
                  const numA = parseFloat(a[sortType]);
                  const numB = parseFloat(b[sortType]);
                  return sortThree ? numA - numB : numB - numA;
                }
              });
        
            // Preserve allocations for other orders
            const finalAllocations = [
              ...leftColumn,
              ...rightColumn,
              ...updatedArray.filter((item) => item.order !== 2 && item.order !== 3),
            ];
        
            setUpdating(false)
            setAllocations(finalAllocations);
          }
        }        

        if(!teamSelected){

          newAllocations = [...dataUser.data.user.years[0].teams[0].allocations]
          newAllocations.sort((a, b) => a.order - b.order) 

        }

      }else {

        
        newAllocations = [...dataUser.data.user.years[0].teams[0].allocations]
        newAllocations.sort((a, b) => a.order - b.order) 
      }
      
      if(!adding && !deleting && !updating){
        newAllocations.sort(customSort)
        setAllocations(newAllocations)
      }

      setUser(dataUser.data.user)
      setAdding(false)
      setDeleting(false)
      setUpdating(false)
      setOnDropID('')
      setDragID('')

    }
    
  }, [dataUser])
  

  useEffect(() => {
   
    if(teamID){
      let yearSelected = findObjectById(dataUser.data.user.years, yearID)
      let teamSelected = findObjectById(yearSelected.teams, teamID)
      setSelectedTeam(teamSelected)
    }
    
  }, [teamID])


  useEffect(() => {
    
    setLoadingData(true)
    
    if(users.error){
      console.log('USERS ERROR', users.error)
    }

    if(!users.error) setLoadingData(false)
    if(users.data) setAllUsers(users.data.users)
    
  }, [users])

  useEffect(() => {
    let typingTimer;
    
    if (isTyping) {

      clearTimeout(typingTimer); // Clear any previous timers

      // Set a new timer to submit the form after 1000ms (adjust as needed)
      typingTimer = setTimeout(() => {
        
        if(isTyping == 'headings') submitAddSettings();
        if(isTyping == 'allocations') submitUpdateAllocation();
        if(isTyping == 'fillBars') submitUpdateFillbar();

      }, 500);
    }
    
    return () => {
      clearTimeout(typingTimer); // Cleanup the timer when the component unmounts
    };
  
  }, [selectedTeam.settings, allocations, isTyping])

  const updateHeadingSetting = (order, newValue, newColor) => {

    let updatedSettings = []

    if(newValue){
      updatedSettings = selectedTeam.settings.map(( item ) => {
        return item.order === order ? { ...item, content: newValue } : item
        
      })
    }

    if(newColor){
      updatedSettings = selectedTeam.settings.map(( item ) => {
        
        return item.order === order ? { ...item, color: newColor } : item
        
      })
    }

    let copy = { ...selectedTeam}
    copy.settings = updatedSettings

    if(updatedSettings.length){
      setHeadingSettings(updatedSettings)
      setSelectedTeam(copy)
      setIsTyping('headings')
    }
    
  }

  const submitAddSettings = () => {
    if(headingSettings.length > 0){
      addSettings({ variables: { teamID: teamID, settings: headingSettings } })
      setIsTyping('')
      refetch()
    }
  }
  
  const updateAllocationItems = ( id, type, newText ) => {
    
    let updateAllocation = allocations.find((item) => {
      if(item.id === id) return item
    })

    updateAllocation = { ...updateAllocation, [type]: newText }
    delete updateAllocation.fillBars
    setUpdatedAllocation(updateAllocation)
    
    const updatedAllocations = allocations.map(( item ) => {

      return item.id === id ? { ...item, [type]: newText } : item
      
    })

    setAllocations(updatedAllocations)
    setIsTyping('allocations')
    
  }

  const updateAllocationItemsRight = ( id, type, newText ) => {
    
    let updateAllocation = allocations.find((item) => {
      if(item.id === id) return item
    })

    updateAllocation = { ...updateAllocation, [type]: newText }
    delete updateAllocation.fillBars
    setUpdatedAllocation(updateAllocation)
    
    const updatedAllocations = allocations.map(( item ) => {

      return item.id === id ? { ...item, [type]: newText } : item
      
    })

    setAllocations(updatedAllocations)
    setIsTyping('allocations')
    
  }

  const submitUpdateAllocation = async () => {
    
    setUpdating(true);
  
    try {
      const { data } = await updateAllocationMutation({
        variables: {
          allocationID: updatedAllocation.id,
          userID: dataUser.data.user.id,
          allocation: updatedAllocation,
        },
        refetchQueries: [GET_USER], // Ensures server data is fetched
      });
  
      if (data) {
        // Manually update the `allocations` state if needed
        const updatedAllocations = allocations.map((item) => {
          if (item.id === updatedAllocation.id) {
            return { ...item, ...updatedAllocation };
          }
          return item;
        });
  
        setAllocations(updatedAllocations); // Update state with new data
      }
      
      setIsTyping('');
      // setUpdating(false);
    } catch (error) {
      console.error('Error updating allocation:', error);
      setUpdating(false);
    }
  };

  const handleDebouncedFillBarUpdate = debounce((updateFn) => {
    updateFn();
  }, 230);

  const updateFillBarData = (id, idx, type, newText) => {
    if (updating) return;
  
    // Update state optimistically
    const parentObject = allocations.find((obj) => obj.id === id);
    const newData = { ...parentObject };
  
    const fillBar = newData.fillBars.find((item, idxItem) => idxItem === idx);
    const newFillBar = { ...fillBar };
  
    newFillBar[type] = newText;
  
    const fillBars = [...newData.fillBars];
    fillBars[idx] = newFillBar;
    newData.fillBars = fillBars;
  
    const newAllocations = allocations.map((item) => {
      return item.id === newData.id ? newData : item;
    });
  
    setAllocations(newAllocations); // Update state locally for immediate feedback
    setUpdatedFillbar(newFillBar);
    setUpdatedAllocation(newData);
    setOnDropID(newData.id);
    setDragID(newFillBar.id);
  
    // Debounce the server call to reduce typing lag
    handleDebouncedFillBarUpdate(() => {
      setIsTyping("fillBars");
    });
  };

  const submitUpdateFillbar = async () => {
    setUpdating(true);
  
    try {
      await updateFillBar({
        variables: {
          allocationID: updatedAllocation.id,
          fillBars: updatedAllocation.fillBars,
          userID: dataUser.data.user.id,
          fillBar: updatedFillbar,
        },
      });
    } catch (error) {
      console.error("Error updating fillBar:", error);
    } finally {
      setIsTyping("");
      setUpdating(false);
      setSortType("");
    }
  };

  const handleOnDrop = (e) => {

    e.preventDefault()
    e.stopPropagation()
    let data = onDrop(e)

    if(!data) return 
    let foundDuplicate = []
    
    if(data.pickedContainer.fillBars){
      data.pickedContainer.fillBars.forEach((item) => {
        if(item.id == data.allocation.allocation.id) foundDuplicate.push(item)
      })
    }

    if(foundDuplicate.length > 0 ) return
    
    delete data.allocation.allocation.fillBars
    delete data.pickedContainer.fillBars
    setUpdating(true)
    setOnDropID(data.onDropId)
    setDragID(data.allocation.allocation.id)
    
    addFillBar({ variables: { allocationID: data.onDropId, allocation: data.allocation.allocation, userID: dataUser.data.user.id, pickedContainer: data.pickedContainer } })

    setIsTyping('')
    
  }

  const handleOnDropFillbar = (e) => {
    e.preventDefault()
    e.stopPropagation()
    let data = onDropFillBar(e)
    
    setUpdating(true)

    // updateFillBar({ variables: { allocationID: data.id, fillBars: data.fillBars, userID: dataUser.data.user.id, fillBar: {} } }) 

    setIsTyping('')

  }

  const handleDeleteFillbar = (e, allocation, deleteId) => {
    e.preventDefault()

    let newObject = { ...allocation }

    setUpdating(true)
    setOnDropID(newObject.id)
    setDragID(deleteId)

    delete newObject.fillBars
    deleteFillbar({ variables: { allocation: newObject, userID: dataUser.data.user.id, deleteId: deleteId } })
    setIsTyping('')

  }

  const handleDeleteAllocation = (e, allocation) => {
    e.preventDefault()
    
    let newObject = { ...allocation }
    
    delete newObject.fillBars

    setDeleting(true)
    
    deleteAllocation({ variables: { allocation: newObject, userID: dataUser.data.user.id } })

    setIsTyping('')

  }

  const glowAll = (id) => {
    const elementsWithId = document.querySelectorAll(`[id="${id}"`);
    
    // Convert the NodeList to an array
    const elementsArray      = Array.from(elementsWithId);
    const listGlowOrderTwo   = document.querySelectorAll(`.glowOrderTwo`);
    const listGrowOrderThree = document.querySelectorAll(`.glowOrderThree`);
    
    const elementsWithClassName = [ ...listGlowOrderTwo, ...listGrowOrderThree]
    
    // Store the array of elements in the ref
    elementsWithIdRef.current = elementsArray;
    
    // Now, you can access the elements using elementsWithIdRef.current
    elementsWithIdRef.current.forEach(element => {
      // Do something with each element
      // console.log(element.getAttribute('data-test-id'))
      
      if(elementsWithClassName.length > 0){
        
        if(elementsWithClassName[0].id == id ){
          
        }else{

          elementsWithClassName.forEach((element) => {
            
            if(element.classList.contains('glowOrderTwo')){
              element.classList.remove("glowOrderTwo")
            }

            if(element.classList.contains('glowOrderThree')){
              element.classList.remove("glowOrderThree")
            }
 
          })
        }
      }

      if(element.getAttribute('data-test-id') == 2) {
        if(element.classList.contains('glowOrderTwo')) return element.classList.remove("glowOrderTwo")
        element.classList.add("glowOrderTwo")
      }

      if(element.getAttribute('data-test-id') == 3) {
        if(element.classList.contains('glowOrderThree')) return element.classList.remove("glowOrderThree")
        element.classList.add("glowOrderThree")
      }

    });
  }

  const submitAddAllocation = (type) => {
    
    if(type == 'two'){

      let defaultAllocationOrderTwo = {
        userID: dataUser.data.user.id,
        teamID: teamID,
        order: 2,
        fte: "1",
        text: "",
        allocation: "0"
      }

      defaultAllocationOrderTwo.color = headingSettings.length > 0 ? headingSettings[1].color : '#587B7F'

      setAdding(true)

      addAllocation( { variables: defaultAllocationOrderTwo } ).then(() => {

        setTimeout(() => {
          // scrollToBottom( containerRefLeft )
        }, 200);
        
      })


    }

    if(type == 'three'){

      let defaultAllocationOrderThree = {
        userID: dataUser.data.user.id,
        teamID: teamID,
        order: 3,
        fte: "1",
        text: "",
        allocation: "0"
      }

      defaultAllocationOrderThree.color = headingSettings.length > 0 ? headingSettings[2].color : '#587B7F'

      setAdding(true)
      
      addAllocation( { variables: defaultAllocationOrderThree } ).then(() => {

        setTimeout(() => {
          // scrollToBottom( containerRefRight )
        }, 200);

      })
    }
    
  }

  const scrollToBottom = (refElement) => {
    if(refElement){
      refElement.current.classList.add('smooth-scroll');
      refElement.current.scrollTop = refElement.current.scrollHeight

      setTimeout(() => {
        refElement.current.classList.remove('smooth-scroll');
      }, 500); // Adjust the delay as needed
    }
  }

  const readFile = (e, orderType) => {

    const file = e.target.files[0];

    if(file){
      ExcelRenderer(file, (err, resp) => {
        if (err) {
          console.error(err);
        } else {
          const excelData = resp.rows;

          if(excelData.length > 0){

            let array = []

            excelData.forEach( (item) => {

              const object = new Object()
              object.order        = orderType
              object.text         = item[1] ? item[1].toString() : '0'
              object.fte          = item[0] ? item[0].toString() : '0'
              object.allocation   = '0'

              array.push(object)
              
            })

            uploadAllocation( { variables: { userID: dataUser.data.user.id, teamID: teamID, allocations: array } } ).then(() => {

              if(orderType == 2){
                setTimeout(() => {
                  scrollToBottom( containerRefLeft )
                  e.target.value = ''
                }, 200);
              }
              
              if(orderType == 3){
                setTimeout(() => {
                  scrollToBottom( containerRefRight )
                  e.target.value = ''
                }, 200);  
              }

            }).catch((error) => {
              console.log(error)
            })

          }
        }
      });
    }
    
  }

  const handleDeleteTeam = async (team) => {
    
    try {
      
      const response = await deleteTeam({
        variables: {
          teamID: team.id,
          userID: user.id
        }
      })

      setYears(response.data.deleteTeam.years)
      
    } catch (error) {
      
      console.log(error)
      if(error) setMessage(error.message)
      
    }
    
  }

  const handleDeleteYear = async (year) => {
    
    try {
      
      const response = await deleteYear({
        variables: {
          yearID: year.id,
          userID: user.id
        }
      })
  
      setYearID(response.data.deleteYear.years[0].id)
      setYears(response.data.deleteYear.years)
      
    } catch (error) {
      
      console.log(error)
      if(error) setMessage(error.message)
      
    }
    
  }

  useEffect(() => {
   
    socket.on('checkUserSettings', (client) => {
      refetch()
    })

    socket.on('checkAllocations', (client) => {
      refetch()
    })

    socket.on('checkFillbars', (client) => {
      refetch()
    })

    socket.on('checkAddFillbar', (client) => {
      refetch()
    })

    socket.on('checkDeleteFillbar', (client) => {
      refetch()
    })

    socket.on('checkDeleteAllocation', (client) => {
      refetch()
    })

    socket.on('addAllocation', (client) => {
      refetch()
    })

    socket.on('uploadAllocation', (client) => {
      refetch()
    })

    socket.on('addYear', (client) => {
      refetch()
    })

    socket.on('addTeam', (client) => {
      refetch()
    })

    socket.on('deleteYear', (client) => {
      refetch()
    })

    socket.on('deleteTeam', (client) => {
      refetch()
    })

    socket.on('updateYear', (client) => {
      refetch()
    })

    socket.on('updateTeam', (client) => {
      refetch()
    })
    
  }, [])

  if (loadingData) return <div className="loadingPage"><span>loading</span></div>
  if (dataUser.loading) return <div className="loadingPage"><span>loading</span></div>
  if (loadingSettings) return <div className="loadingPage"><span>loading</span></div>
  if (errorSettings) return `Submission error! ${error.message}`;
  if (loadingAllocation) return <div className="loadingPage"><span>loading</span></div>
  if (errorAllocation) return `Submission error! ${errorAllocation}`;
  if (loadingUpdateAllocation) return <div className="loadingPage"><span>loading</span></div>
  if (errorUpdatedAllocation) return `Submission error! ${errorUpdatedAllocation}`;
  if (!cookies.accessToken) return <div className="loadingPage"><span>loading user data</span></div>
  if (cookies.user.role == 'systemAdmin') return <SystemAdmin allUsers={allUsers} setAllUsers={setAllUsers} removeCookie={removeCookie} currentUser={dataUser}/>
  
  return (
    <>
      <Nav
        removeCookie={removeCookie}
        user={dataUser}
        popup={popup}
        setPopup={setPopup}
        cookies={cookies}
      >
      </Nav>
      {message && 
        <div className="w-full flex justify-center">
          <div className="notification relative">
            <div
              className="close"
              onClick={() => setMessage('')}
            >
              <SVG
                svg={'close'}
                color={'white'}
              >
              </SVG>
            </div>
            {message}
          </div>
        </div>
      }
      <div className="w-full flex justify-end mt padding-x">
      <div className="teams flex justify-center items-center mt5">
        <div
          className="svgItem"
          onClick={() => {
            if(handlePermissions()){
              setPopup('addTeam')
            }
          }}
        >
          <SVG 
            width={50}
            height={50}
            svg={'plus'}
            color={'#8D5A97'}
          ></SVG>
        </div>
        <div 
          className=""
        >
          { years.length > 0 && years.find(item => item.id === yearID) && years.find(item => item.id === yearID).teams.map((team, idx) => 
            <span 
              className="teamsItem relative" 
              key={idx}
              onMouseEnter={() => setHovered(`hover${team.id}${idx}`)}
              onMouseLeave={() => setHovered('')}
              onClick={() => handleChangeTeam(team, setTeamID, setAllocations, setSelectedTeam)}
            >
              {team.team}
              { isHovered == `hover${team.id}${idx}` &&
                <div 
                  onClick={(e) => {
                    if(handlePermissions()){
                      e.stopPropagation(),
                      handleDeleteTeam(team)
                    }
                  }}
                  className="teamSvg">
                    <SVG svg={'thrashCan'}></SVG>
                </div>
              }
              { isHovered == `hover${team.id}${idx}` &&
                <div 
                  onClick={(e) => {
                    if(handlePermissions()){
                      e.stopPropagation(),
                      setEditTeam(team),
                      setPopup('editTeam')
                    }
                  }}
                  className="teamSvgEdit">
                  <SVG 
                    svg={'edit2'}
                    width={20}
                    height={20}
                  >
                  </SVG>
                </div>
              }
            </span>
          )}
        </div>
      </div>
      <div className="container-center wrap">
        <div className="w-full flex items-center">
          <div className="years flex items-center justify-center">
            <div 
              className="svgItem"
              onClick={() => {
                if(handlePermissions()){
                  setPopup('addYear')
                }
              }}
            >
              <SVG 
                width={50}
                height={50}
                svg={'plus'}
                color={'#8D5A97'}
              ></SVG>
            </div>
            { years.length > 0 && years.map((year, idx) => 
              <span 
                className="yearsItem" 
                key={idx}
                onMouseEnter={() => setHovered(`hover${year.id}${idx}`)}
                onMouseLeave={() => setHovered('')}
                onClick={() => setYearID(year.id)}
              >
                {year.year}
                { isHovered == `hover${year.id}${idx}` &&
                  <div 
                    onClick={(e) => {
                      if(handlePermissions()){
                        e.stopPropagation(),
                        handleDeleteYear(year)
                      }
                    }}
                    className="yearSvg">
                    <SVG svg={'thrashCan'}></SVG>
                  </div>
                }
                { isHovered == `hover${year.id}${idx}` &&
                  <div 
                    onClick={(e) => {
                      if(handlePermissions()){
                        e.stopPropagation(),
                        setEditYear(year),
                        setPopup('editYear')
                      }
                    }}
                    className="yearSvgEdit">
                    <SVG 
                      svg={'edit2'}
                      width={20}
                      height={20}
                    >
                    </SVG>
                  </div>
                }
                { isHovered == `hover${year.id}${idx}` &&
                  <div 
                    onClick={(e) => {
                      if(handlePermissions()){
                        e.stopPropagation(),
                        setEditYear(year),
                        setPopup('duplicateYear')
                      }
                    }}
                    className="duplicateSvgEdit">
                    <SVG 
                      svg={'duplicate'}
                      width={20}
                      height={20}
                    >
                    </SVG>
                  </div>
                }
              </span>
            )}
          </div>
        </div>
        <div className="container-flex-right whalf h5 border-right">
          <div 
            className="element-button-icon"
            onClick={() => {
              if(handlePermissions()){
                submitAddAllocation('two')
              }
            }}
          >
            <SVG svg={'plus'}></SVG>
          </div>
          <div className="element-buttonFile">
            <label 
              className="curved"
              htmlFor="importAllocationOrderTwo"
            >
              import
            </label>
            <input 
              type="file"
              id="importAllocationOrderTwo"
              accept=".xlsx"
              className="element-button-text curved"
              onChange={(e) => {
                if(handlePermissions()){
                  readFile(e, 2)
                }
              }}
            >
            </input>
          </div>
        </div>
        <div className="container-flex-left whalf h5">
          <div 
            className="element-button-icon"
            onClick={() => {
              if(handlePermissions()){
                submitAddAllocation('three')
              }
            }}
          >
            <SVG svg={'plus'}></SVG>
          </div>
          <div className="element-buttonFile">
            <label 
              className="curved"
              htmlFor="importAllocationOrderThree"
            >
              import
            </label>
            <input 
              type="file"
              id="importAllocationOrderThree"
              accept=".xlsx"
              className="element-button-text curved"
              onChange={(e) => {
                if(handlePermissions()){
                  readFile(e, 3)
                }
              }}
            >
            </input>
          </div>
        </div>

        <HeadingSettings
          yearID={yearID}
          dataUser={dataUser}
          teamID={teamID}
          isHovered={isHovered}
          setHovered={setHovered}
          changeSort={changeSort}
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
          updateHeadingSetting={updateHeadingSetting}
          handlePermissions={handlePermissions}
          setColorPallete={setColorPallete}
          setPalleteType={setPalleteType}
          selectedYear={selectedYear}
          selectedTeam={selectedTeam}
          headingSettings={headingSettings}
          sortLeftType={sortLeftType}
          sortRightType={sortRightType}
        >
        </HeadingSettings>

        { colorPallete &&
          <ColorPallete
            colorPallete={colorPallete}
            setColorPallete={setColorPallete}
            headingSettings={selectedTeam.settings}
            updateHeadingSetting={updateHeadingSetting}
            palleteType={palleteType}
            setPalleteType={setPalleteType}
            updateAllocationItems={updateAllocationItems}
          >
          </ColorPallete>
        }

        <ColumnListLeft
          allocations={allocations}
          onDragOver={onDragOver}
          handleOnDrop={handleOnDrop}
          onDragStartFillBar={onDragStartFillBar}
          handleOnDropFillbar={handleOnDropFillbar}
          isHovered={isHovered}
          setHovered={setHovered}
          glowAll={glowAll}
          handleDeleteFillbar={handleDeleteFillbar}
          onDragStart={onDragStart}
          handleDeleteAllocation={handleDeleteAllocation}
          updateAllocationItems={updateAllocationItems}
          containerRefLeft={containerRefLeft}
          colorPallete={colorPallete}
          setColorPallete={setColorPallete}
          headingSettings={selectedTeam.settings}
          setPalleteType={setPalleteType}
          handlePermissions={handlePermissions}
        >
        </ColumnListLeft>

        <ColumnListRight
          allocations={allocations}
          onDragOver={onDragOver}
          handleOnDrop={handleOnDrop}
          onDragStartFillBar={onDragStartFillBar}
          handleOnDropFillbar={handleOnDropFillbar}
          isHovered={isHovered}
          setHovered={setHovered}
          glowAll={glowAll}
          handleDeleteFillbar={handleDeleteFillbar}
          onDragStart={onDragStart}
          handleDeleteAllocation={handleDeleteAllocation}
          updateAllocationItems={updateAllocationItemsRight}
          updateFillBarData={updateFillBarData}  
          containerRefRight={containerRefRight}
          colorPallete={colorPallete}
          setColorPallete={setColorPallete}
          headingSettings={selectedTeam.settings}
          setPalleteType={setPalleteType}
          handlePermissions={handlePermissions}
        >
        </ColumnListRight>
        

        <div className="container-flex-right whalf border-right">
          <div 
            className="element-button-total curved-eased lightContrast schemeOne fontSize-12 capitalize h6"
          >
            <div className="elementInnerBox schemeOne">
              {parseFloat(sumByType(allocations, 'fte', 2))}
            </div>
            <div className="elementInnerBox schemeOne">
              {parseFloat(sum(allocations, 2))}
            </div>
            <div className="elementInnerBox schemeOne">
              {parseFloat(sumByType(allocations, 'allocation', 2))}
            </div>
          </div>
        </div>
        
        <div className="container-flex-left whalf">
          <div 
            className="element-button-total curved-eased lightContrast schemeFour fontSize-12 capitalize h6"
          >
            <div className="elementInnerBox schemeFour">
              {parseFloat(sumByType(allocations, 'fte', 3))}
            </div>
            <div className="elementInnerBox schemeFour">
              {parseFloat(sum(allocations, 3))}
            </div>
            <div className="elementInnerBox schemeFour">
              {parseFloat(sumByType(allocations, 'allocation', 3))}
            </div>
          </div>
        </div>

      </div>
      </div>
      { popup == 'addYear' &&
        <AddYear
          loading={loading}
          setLoading={setLoading}
          submitError={submitError}
          setSubmitError={setSubmitError}
          addYear={addYear}
          setPopup={setPopup}
          user={dataUser}
          setYears={setYears}
          refetch={refetch}
          yearID={yearID}
          years={years}
        >
        </AddYear>
      }
      { popup == 'editYear' &&
        <EditYear
          loading={loading}
          setLoading={setLoading}
          submitError={submitError}
          setSubmitError={setSubmitError}
          addYear={addYear}
          setPopup={setPopup}
          user={dataUser}
          setYears={setYears}
          refetch={refetch}
          yearID={yearID}
          years={years}
          editYear={editYear}
          setEditYear={setEditYear}
          updateYear={updateYear}
        >
        </EditYear>
      }
      { popup == 'duplicateYear' &&
        <DuplicateYear
          loading={loading}
          setLoading={setLoading}
          submitError={submitError}
          setSubmitError={setSubmitError}
          setPopup={setPopup}
          duplicateYear={duplicateYear}
          editYear={editYear}
          setEditYear={setEditYear}
          user={dataUser}
          refetch={refetch}
        >
        </DuplicateYear>
      }
      { popup == 'addTeam' &&
        <AddTeam
          loading={loading}
          setLoading={setLoading}
          submitError={submitError}
          setSubmitError={setSubmitError}
          addTeam={addTeam}
          setPopup={setPopup}
          year={yearID}
          user={dataUser}
          setYears={setYears}
          refetch={refetch}
        >
        </AddTeam>
      }
      { popup == 'editTeam' &&
        <EditTeam
          loading={loading}
          setLoading={setLoading}
          submitError={submitError}
          setSubmitError={setSubmitError}
          addYear={addYear}
          setPopup={setPopup}
          user={dataUser}
          refetch={refetch}
          editTeam={editTeam}
          setEditTeam={setEditTeam}
          updateTeam={updateTeam}
        >
        </EditTeam>
      }
      { popup == 'editAllEntityUsers' &&
        <EditAllEntityUsers
          popup={popup}
          setPopup={setPopup}
          reset={reset}
          allUsers={dataUser.data.user.users}
          user={dataUser.data.user}
          setUser={setUser}
          message={message}
          setMessage={setMessage}
          submitError={submitError}
          setSubmitError={setSubmitError}
          loading={loading}
          setLoading={setLoading}
        >
        </EditAllEntityUsers>
      }
      {popup === 'editEntityUser' &&
        <EntityAdminEditUser
          reset={reset}
          username={username}
          setSubmitError={setSubmitError}
          setLoading={setLoading}
          setUsername={setUsername}
          setInputDropdown={setInputDropdown}
          userTypeFormField={userTypeFormField}
          inputDropdown={inputDropdown}
          myRefs={myRefs}
          setUserType={setUserType}
          setUserTypeFormField={setUserTypeFormField}
          loading={loading}
          message={message}
          setMessage={setMessage}
          submitError={submitError}
          setPopup={setPopup}
          user={user}
          setUser={setUser}
          userType={userType}
        />
      }
      {popup === 'deleteEntityUser' &&
        <EntityDeleteEntityUser
          reset={reset}
          username={username}
          setError={setSubmitError}
          setLoading={setLoading}
          setUsername={setUsername}
          setInputDropdown={setInputDropdown}
          userTypeFormField={userTypeFormField}
          inputDropdown={inputDropdown}
          myRefs={myRefs}
          setUserType={setUserType}
          setUserTypeFormField={setUserTypeFormField}
          loading={loading}
          message={message}
          setMessage={setMessage}
          error={submitError}
          setPopup={setPopup}
          user={user}
          setUser={setUser}
          userType={userType}
        />
      }
      {popup === 'addEntityUser' &&
        <EntityAdminAddUser
          reset={reset}
          username={username}
          setError={setSubmitError}
          setLoading={setLoading}
          setUsername={setUsername}
          setInputDropdown={setInputDropdown}
          userTypeFormField={userTypeFormField}
          inputDropdown={inputDropdown}
          myRefs={myRefs}
          setUserType={setUserType}
          setUserTypeFormField={setUserTypeFormField}
          loading={loading}
          message={message}
          setMessage={setMessage}
          error={submitError}
          setPopup={setPopup}
          user={dataUser.data.user}
          setUser={setUser}
          userType={userType}
        />
      }
    </>
  )
}

export default Staffing
