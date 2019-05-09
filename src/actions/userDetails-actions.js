export let ADD_USER_DETAILS = "userDetails:addUserDetails"
export let REMOVE_USER_DETAILS = "userDetails:removeUserDetails"
export let RESET_USER_DETAILS = "userDetails:resetUserDetails"
export let ADDNEWFORM_USER_DETAILS = "userDetails:addNewFormToUserDetails"
export let REMOVEFORM_USER_DETAILS = "userDetails:removeFormFromUserDetails"


export function addUserDetails(userDetails) {
  //alert("Changing userDetails")
 // alert(uid)
  return {
    type : ADD_USER_DETAILS,
    payload: userDetails
  }
}

export function removeUserDetails() {
  return {
    type : REMOVE_USER_DETAILS,
    payload:1
  }
}

export function resetUserDetails() {
  return {
    type : RESET_USER_DETAILS,
    payload:1
  }
}

export function addNewFormToUserDetails(newFormObject) {
  return {
    type : ADDNEWFORM_USER_DETAILS,
    payload:newFormObject
  }
}

export function removeFormFromUserDetails(fId) {
  return {
    type : REMOVEFORM_USER_DETAILS,
    payload:fId
  }
}