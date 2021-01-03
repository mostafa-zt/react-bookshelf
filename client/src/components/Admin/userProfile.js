import React from 'react'

const userProfile = (props) => {
    return (
        <div className="container">
            <div className="box">
                <div className="avatar">
                    <img src="/images/user.png" alt="avatar" />
                </div>
                <div className="userinfo">
                    {props.auth.name}
                </div>
                <div className="userinfo">
                    {props.auth.lastname}
                </div>
                <div className="userinfo">
                    {props.auth.email}
                </div>
            </div>
        </div>
    )
}

export default userProfile;