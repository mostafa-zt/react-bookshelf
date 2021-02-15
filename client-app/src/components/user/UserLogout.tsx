import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import * as actions from '../../app/stores/actions/user';

interface IProps extends RouteComponentProps<IMatchParams> {
    onLogout: () => void
}
interface IMatchParams { }

const UserLogout: React.FC<IProps> = ({ onLogout, history }) => {

    useEffect(() => {
        setTimeout(() => {
            onLogout();
            history.push('/login')
        }, 2000);
    }, [onLogout])

    return (
        <div className="container">
            <div className="box logout">
                Sorry to see you go :(
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(null, mapDispatchToProps)(UserLogout)
