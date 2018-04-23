// Core
import types from './types';

export default Object.freeze({
    fetchUsers: (page) => ({
        type:    types.FETCH_USERS,
        payload: page,
    }),
    fetchUsersSuccess: (users) => ({
        type:    types.FETCH_USERS_SUCCESS,
        payload: users,
    }),
    fetchUsersFail: (message) => ({
        type:    types.FETCH_USERS_FAIL,
        payload: message,
    }),
    fetchUserData: (id) => ({
        type:    types.FETCH_USER_DATA,
        payload: id,
    }),
    fetchUserDataSuccess: (userData) => ({
        type:    types.FETCH_USER_DATA_SUCCESS,
        payload: userData,
    }),
    fetchUserDataFail: (message) => ({
        type:    types.FETCH_USER_DATA_FAIL,
        payload: message,
    }),
    clearUserData: () => ({
        type: types.CLEAR_USER_DATA,
    }),
    startFetching: () => ({
        type: types.START_FETCHING,
    }),
    stopFetching: () => ({
        type: types.STOP_FETCHING,
    }),
    setPopUpTop: (top) => ({
        type:    types.SET_POP_UP_TOP,
        payload: top
    }),
    setMetaData: (meta) => ({
        type:    types.SET_META_DATA,
        payload: meta
    })   
});
