//Core
import { all } from 'redux-saga/effects';

//Instruments
import users from './users';

export function* saga () {
    yield all([
        users.fetchUsersWatcher(),
        users.fetchUserDataWatcher()
    ]);
}
