//Core
import { call, put, select } from 'redux-saga/effects';

//Instrument
import { api, request, token } from 'instruments/api';
import actions from 'actions';

export function* fetchUserDataWorker ({ payload: id }) {
    try {
        
        yield put(actions.clearUserData());

        const url = `${api}/${id}?include=contactedUsers,orders`;

        const response = yield call(fetch, url, request);

        if (response.status !== 200) {                
            throw new Error('User not found!');
        }

        const { data: { links: { orders: ordersId  } }, included: { orders } } = yield call([response, response.json]);        

        const result = yield orders.map(({ currency, paymentMethod, price, status }, index) => ({
            currency,
            id: ordersId[index].id,
            paymentMethod,
            price,
            status,
        }));

        yield put(actions.fetchUserDataSuccess(result));
                
    } catch ({ message }) {
        yield put(actions.fetchUserDataFail(message));
    }
}
