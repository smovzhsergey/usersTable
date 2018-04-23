// Core
import React, { Component } from 'react';

//instruments
import { array, bool, object, number } from 'prop-types';
import moment from 'moment';
import actions from 'actions';
import Styles from './styles.scss';

//Components
import UserOrders from 'components/UserOrders';


export default class UserList extends Component {

    static propTypes = {
        actions:    object.isRequired,
        isFetching: bool.isRequired,
        isUserData: bool.isRequired,
        popUpTop:   number.isRequired,
        userData:   array.isRequired,
        users:      array.isRequired
    }

    constructor () {
        super();

        this.printUsersList = ::this._printUsersList;
        this.getUserData = ::this._getUserData;
    }

    _getUserData (event) {
        const { actions: { fetchUserData, setPopUpTop } } = this.props;
        const element = event.target
        const top = element.getBoundingClientRect().top + 20 + window.pageYOffset;
        
        fetchUserData(element.id);
        setPopUpTop(top);
    }

    _printUsersList () {
        const { users } = this.props;
        
        return users.map(({ id, name, from, lastMessageTime }, index ) => (
            <tr key = { id }>
                <td>{ index + 1 }</td>
                <td>{ name }</td>
                <td>{ from }</td>
                <td>
                    <span>{ moment(lastMessageTime).format('YYYY-MM-DD') } </span>
                    <span>{ moment(lastMessageTime).format('HH:MM:SS') }</span>
                </td>
                <td><button id = { id } onClick = { this.getUserData } >Замовлення</button></td>
            </tr>
        ));
    }    

    render () {
        const { actions, isUserData, popUpTop, userData } = this.props;
        const printList = this.printUsersList();

        return (
        <section className = { Styles.userList }>
            <UserOrders
                actions = { actions }
                isUserData = { isUserData }
                popUpTop = { popUpTop }
                userData = { userData }                
            />
            <table>
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Ім’я</td>
                        <td>Мессенджер</td>
                        <td>Час останнього повідомлення</td>
                        <td>Додаткова інформація</td>
                    </tr>
                </thead>
                <tbody>                   
                    {printList}
                </tbody>
            </table>
        </section>);
    }
}
