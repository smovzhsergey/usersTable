// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//instruments
import { array, bool, object, number } from 'prop-types';
import actions from 'actions';
import { userQuantity } from 'instruments/api';


//Components
import UserList from 'components/UserList';
import Spinner from 'components/Spinner';

class UserWall extends Component {
    
    static propTypes = {
        actions:    object.isRequired,
        isFetching: bool.isRequired,
        isUserData: bool.isRequired,
        meta:       object.isRequired,
        popUpTop:   number.isRequired,
        userData:   array.isRequired,
        users:      array.isRequired
    }

    constructor () {
        super();

        this.addUsersInView = ::this._addUsersInView;
        this.root = document.getElementById('root');
    }
    

    componentDidMount () {
        this.props.actions.fetchUsers();
        document.addEventListener('scroll', this.addUsersInView);
    }

    _addUsersInView () {

        const { actions : { fetchUsers }, isFetching, meta: { offset, totalCount } } = this.props;
        const height = this.root.clientHeight;
        const scroll = window.pageYOffset;
        const browserHeight = window.innerHeight * 2;
        const difference = height - browserHeight;

        if (scroll > difference && !isFetching && (totalCount - offset) > userQuantity) {
            fetchUsers();
        }
    }

    render(){

        const { isFetching, users } = this.props;

        return isFetching && !users.length ?
            <Spinner /> :
            <UserList {...this.props} />;
        
    }
}

const mapStateToProps = ({ fetch }) => ({
    isFetching: fetch.get('isFetching'),
    isUserData: fetch.get('isUserData'),
    meta:       fetch.get('meta').toJS(),
    popUpTop:   fetch.get('popUpTop'),
    users:      fetch.get('users').toJS(),
    userData:   fetch.get('userData').toJS()
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ ...actions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserWall);

