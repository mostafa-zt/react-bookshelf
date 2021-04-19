import { motion } from 'framer-motion';
import React, { Fragment, useEffect } from 'react'
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
        }, 1000);
    }, [onLogout])

    const pageVariants = {
        initial: {
            opacity: 0,
            y: "-100%",
            scale: 0.8
        },
        in: {
            opacity: 1,
            y: 0,
            scale: 1
        },
        out: {
            opacity: 0,
            y: "100%",
            scale: 1.2
        }
    }

    const pageTransition = {
        transition: "linear",
        duration: 0.4
        // type:"tween",
        // ease:"anticipate",
        // duration:3
    }

    return (
        <motion.div exit="out" animate="in" initial="initial" variants={pageVariants} transition={pageTransition}>
            <Fragment>
                <div className="page-title-section">
                    <div className="container">
                        <h1 className="page-title">
                            You are about to Logout!
                      </h1>
                    </div>
                </div>
                <div className="content-section">
                    <div className="container">
                        <div className="shopping-page-wrapper">
                            <div className="box logout">
                                Sorry to see you go :(
                        </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        </motion.div>
    )
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(null, mapDispatchToProps)(UserLogout)
