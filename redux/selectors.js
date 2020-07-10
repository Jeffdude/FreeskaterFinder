export const testListSelector = (state) => state.test_list;

export const navigationSelector = state => { return state.app_state.navigation_state };
export const componentSelector = state => { return state.app_state.component_state };
export const currentUserSelector = state => { return state.app_state.current_user };

export const windowSelector = state => { return state.app_state.window_state };

export const userSelector = state => {return state.user_state}
