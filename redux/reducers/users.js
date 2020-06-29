import { USER_PRIVACY_STATUS } from "../../constants.js";
import { CREATE_USER } from "../actionTypes.js";
import { createUser } from "../../modules/users.js";

const initialState = {
  byUID: {},
  byLocation: {},
  allUIDs: [],
}

function getNextUID(all_used){
  candidate = Math.floor(Math.random()*90000) + 10000;
  if all_used.includes(candidate) {
    return getNextUID(all_used);
  } else {
    return candidate;
  }
}

export default function(state = initialState, action){
  switch(action.type) {
    case CREATE_USER:
      const { email, password } = action.payload;
      result = createUser(email, password);
      if(result.success){
        { user_location, user_privacy_status } = action.payload; 
        newUID = getNextUID(state.allUIDs);
        return(
          byUID: {
            ...state.byUID,
            newUID: {
              email: email,
              actual_location: user_location,
              privacy_status: user_privacy_status,
            }
          },
          byLocation: {
            ...state.byLocation,
            actual_location: newUID,
          },
          allUIDs: [...state.allUIDs, newUID],
        );
      } else {
        // Failure case
      }
    default:
      return state;
  }
}
