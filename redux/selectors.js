export const testListSelector = (state) => state.test_list;

export const navigationStateSelector = state => { return state.app_state.navigation_state };
export const componentStateSelector = state => { return state.app_state.component_state };
export const userStateSelector = state => { return state.app_state.current_user };
