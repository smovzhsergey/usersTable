//Core
import { call, put, select } from 'redux-saga/effects';

//Instrument
import { api, request, token, userQuantity } from 'instruments/api';
import actions from 'actions';

export function* fetchUsersWorker () {
    try {
        yield put(actions.startFetching());

        const query = yield select((state) => state.fetch.get('meta').toJS());
        let url;

        if (!query.limit) {
            url = `${api}?limit=${userQuantity}&offset=0`;            
        } else {
            url = `${api}?limit=${userQuantity}&offset=${query.offset + userQuantity}`;
        }

        const responseUsers = yield call(fetch, url, request);

        if (responseUsers.status !== 200) {
            yield put(actions.stopFetching());
            throw new Error('Users were not loaded.');
        }

        const { data, meta } = yield call([responseUsers, responseUsers.json]);

        yield put(actions.fetchUsersSuccess(data)); 

        yield put(actions.setMetaData(meta));

        yield put(actions.stopFetching());               
        
    } catch ({ message }) {
        yield put(actions.fetchUsersFail(message));
    }
}
