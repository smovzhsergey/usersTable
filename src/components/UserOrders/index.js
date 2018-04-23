// Core
import React, { Component } from 'react';

//instruments
import { array, bool, object, number } from 'prop-types';
import moment from 'moment';
import actions from 'actions';
import Styles from './styles.scss'


export default class UserOrders extends Component {

    static propTypes = {
        actions:    object.isRequired,
        isUserData: bool.isRequired,
        popUpTop:   number.isRequired,
        userData:   array.isRequired
    }

    constructor () {
        super();

        this.clearUser = ::this._clearUser;
        this.printUserOrders = ::this._printUserOrders;
    }

    _clearUser () {
        const { actions: { clearUserData } } = this.props;
        
        clearUserData();
    }

    _printUserOrders () {
        const { userData } = this.props;
        
        return !userData.length ?
            (<tr>
                <td colSpan = '5'>Замовлень не має!</td>
            </tr>) :
            (userData.map(({ currency, id, paymentMethod, price, status }) => (
                <tr key = { id }>
                    <td>{ id }</td>
                    <td>{ price }</td>
                    <td>{ currency }</td>
                    <td>{ paymentMethod }</td>
                    <td>{ status }</td>
                </tr>
            )));
    }    

    render () {

        const { isUserData, popUpTop } = this.props;
        const userOrders = this.printUserOrders();

        return isUserData ? 
                     
            (<section className = { Styles.orders } style = {{ top: popUpTop }}  > 
                <span onClick = { this.clearUser }>x</span>
                <table>
                    <thead>
                        <tr>
                            <td>ID замовлення</td>
                            <td>Ціна</td>
                            <td>Валюта</td>
                            <td>Спосіб оплати</td>
                            <td>Статус</td>
                        </tr>
                    </thead>
                    <tbody>                   
                        { userOrders }
                    </tbody>
                </table>
            </section>):
            null;
        
    }
}
