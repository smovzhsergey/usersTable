//Core
import { takeEvery } from 'redux-saga/effects';

//Instruments
import types from 'actions/types';
import { fetchUsersWorker } from './workers/fetchUsers';
import { fetchUserDataWorker } from './workers/fetchUserData';


export default Object.freeze({
    * fetchUsersWatcher () {
        yield takeEvery(types.FETCH_USERS, fetchUsersWorker);
    },
    * fetchUserDataWatcher () {
    	yield takeEvery(types.FETCH_USER_DATA, fetchUserDataWorker);
    }   
});
