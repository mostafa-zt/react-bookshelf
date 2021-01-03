import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserPosts } from '../../actions';
import { Link } from 'react-router-dom';

class UserBook extends Component {

    componentDidMount() {
        this.props.dispatch(getUserPosts(this.props.auth.id))
    }

    showUserPosts = (userPosts) => {
        return userPosts ?
            userPosts.map(item => {
                const date = new Date(item.createdAt);
                return (
                    <tr key={item._id}>
                        <td className="capitalize">
                            <Link className="link" to={`/user/edit-post/${item._id}`}>
                                {item.name}
                            </Link>
                        </td>
                        <td className="capitalize">{item.author}</td>
                        <td>{date.toLocaleDateString()}</td>
                        <td>{item.pages}</td>
                        <td>{parseFloat(item.price).toFixed(2)}</td>
                        <td>{item.rating}</td>
                    </tr>
                )
            })
            : null

    }

    render() {
        console.log(this.props);
        return (
            <div className="container">

                <h4>Your Reviews</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Author</th>
                            <th width='150px'>Date</th>
                            <th>Pages</th>
                            <th>Price</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.showUserPosts(this.props.user.userPosts)}
                    </tbody>
                </table>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer
    }
}

export default connect(mapStateToProps)(UserBook);