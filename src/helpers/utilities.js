export {
  switchPositions,
  isEmptyObject,
  sumByType,
  sum,
  isStrongPassword,
  isValidYear,
  findObjectById
}

const switchPositions = (object, id1, id2) => {
  // Find the indices of the objects to swap
  const index1 = object.fillBars.findIndex(obj => obj.id === id1);
  const index2 = object.fillBars.findIndex(obj => obj.id === id2);

  if (index1 !== -1 && index2 !== -1) {
    // Create temporary variables to hold the objects
    const tempObject = object.fillBars[index1];

    // Swap the objects at the found indices
    object.fillBars[index1]         = object.fillBars[index2];
    object.fillBars[index2]         = tempObject;
  }

  return object
}

const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
}

const sumByType = (data, type, order) => {

  const total = data.reduce((accumulator, currentObject) => {
    if(currentObject.order == order) return accumulator + parseFloat(currentObject[type]);
    return accumulator
  }, 0); // Initialize accumulator to 0
  
  return total.toFixed(2).replace(/(\.\d*?[1-9])0+$/g, '$1')
  
}

const sum = (data, order) => {

  const total = data.reduce((accumulator, currentObject) => {
    if(currentObject.order == order) return accumulator + 1;
    return accumulator
  }, 0); // Initialize accumulator to 0
  
  return total.toFixed(2).replace(/(\.\d*?[1-9])0+$/g, '$1')
  
}

const isStrongPassword = (password) => {
  // Minimum length requirement
  const minLength = 8;

  // Regular expressions for different criteria
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  // Check if the password meets all criteria
  const isLengthValid = password.length >= minLength;
  const isStrong = hasUppercase && hasLowercase && hasNumber && hasSpecialChar;

  return isLengthValid && isStrong;
}

const isValidYear = (year) => {

  var yearPattern = /^\d{4}$/;

  
  return yearPattern.test(year);
  
}

const findObjectById = (array, id) => {
  return array.find(obj => obj.id === id);
}