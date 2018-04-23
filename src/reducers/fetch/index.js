//Core
import { Map, List } from 'immutable';

//Instruments
import types from 'actions/types';

const initialState = Map({
    users:      List(),
    meta:       Map(),
    userData:   List(),
    isFetching: false,
    isUserData: false,
    popUpTop:   0
});

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case types.FETCH_USERS_SUCCESS:
            return state.update('users', (users) => users.push(...payload));

        case types.SET_META_DATA:
            return state.merge(state, {               
                'meta':  Map(payload),
            });

        case types.FETCH_USER_DATA_SUCCESS:
            return state.merge(state, {
                'userData':   List(payload),
                'isUserData': true,  
            }); 

        case types.CLEAR_USER_DATA:
            return state.merge(state, {
                'userData': List(),
                'isUserData': false
            }); 
        
        case types.SET_POP_UP_TOP:
            return state.set('popUpTop', payload);

        case types.START_FETCHING:
            return state.set('isFetching', true);

        case types.STOP_FETCHING:
            return state.set('isFetching', false);
        
        default:
            return state;
    }
};
