import React, { Component } from 'react'
import { auth } from '../../actions';
import { connect } from 'react-redux';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export default function isAuth(ComposedClass, reload) {
    class AuthenticationCheck extends Component {
        state = {
            loading: true
        }

        componentWillMount() {
            this.props.dispatch(auth());
            this.setState({ loading: false });
        }

        // componentWillReceiveProps(nextProps) {
        //     console.log(nextProps);
        //     this.setState({ loading: false })
        // }

        componentWillReceiveProps(nextProps) {

            console.log('componentWillReceiveProps in AUTH========>');
            console.log(nextProps);
            if (nextProps.auth && !nextProps.auth.isAuth) {
                this.props.history.push('/login/');
                return;
            }
            // } else {
            //     if (reload === false) {
            //         this.props.history.push('/user/');
            //     }
            // }
        }

      
        // static getDerivedStateFromProps(props, state) {
        //     console.log(props);
        //     console.log(state);
        //     return props;
        // }

        render() {
            if (this.state.loading) {
                return (
                    null
                )
            }
            return (<ComposedClass {...this.props} user={this.props.auth} />)
        }
    }


    function mapStateToProps(state) {
        return { ...state.userReducer }
    }



    return connect(mapStateToProps)(AuthenticationCheck);
}