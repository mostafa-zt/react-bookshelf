import React from 'react'
import Skeleton from 'react-loading-skeleton'

const BookDetailsLoader = () => {
    return (
        <div className="container">
            <div className="box_placeholder">
                <Skeleton duration={2} count={1} width={300} height={40} style={{  marginBottom: 10,display: 'block' }} />
                <Skeleton count={1} width={250} style={{ marginTop: 5 ,display:'block' }} />
                <Skeleton count={1} width={300} style={{ marginTop: 5 ,display:'block' }} />
                <Skeleton count={2} width={140} height={80} style={{ marginTop: 10 ,marginRight:10 }} />
                <Skeleton count={1} width={600} height={320} style={{ marginTop: 10 ,marginRight:10 ,display:'block' }} />
                <Skeleton count={2} width={140} height={140} style={{ marginTop: 10 ,marginRight:10 , }} />
            </div>
        </div>
    )
}

export default BookDetailsLoader
