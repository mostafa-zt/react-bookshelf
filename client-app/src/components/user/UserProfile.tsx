import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IUserProfile } from '../../app/models/UserProfile';
import * as actions from '../../app/stores/actions/user';
import UserProfileLoader from './UserProfileLoader';

interface IProps {
    user: IUserProfile,
    onLoadUserProfile: () => void,
    unMountLoadUserProfile: () => void
}

const UserProfile: React.FC<IProps> = ({ user, onLoadUserProfile, unMountLoadUserProfile }) => {

    useEffect(() => {
        onLoadUserProfile();
        return () => {
            unMountLoadUserProfile();
        }
    }, [])

    if (!user) return (<UserProfileLoader />)

    return (
        <div className="container">
            <div className="box">
                <div className="avatar">
                    <img src="/images/user.png" alt="avatar" />
                </div>
                <div className="userinfo">
                    {user.email}
                </div>
                <div className="userinfo">
                    {user.name}
                </div>
                <div className="userinfo">
                    {user.lastname}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return { user: state.userReducer.user }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onLoadUserProfile: () => dispatch(actions.loadUser()),
        unMountLoadUserProfile: () => dispatch(actions.unMountLoadUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
