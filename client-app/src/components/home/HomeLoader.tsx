import React from 'react'
import Skeleton from 'react-loading-skeleton'

const HomeLoader = () => {
    return (
        <div className="container">
            <div className='box_placeholder' >
                <div className="book_header">
                    <Skeleton count={1} width={400} style={{  margin: 10 }} />
                </div>
                <div className="book_info">
                    <div className="">
                        <Skeleton count={5} height={20} width={70} style={{  margin: 10 }} />
                    </div>
                </div>
            </div>
            <div className='box_placeholder' >
                <div className="book_header">
                    <Skeleton count={1} width={400} style={{  margin: 10 }} />
                </div>
                <div className="book_info">
                    <div className="">
                        <Skeleton count={5} height={20} width={70} style={{  margin: 10 }} />
                    </div>
                </div>
            </div>
            <div className='box_placeholder' >
                <div className="book_header">
                    <Skeleton count={1} width={400} style={{  margin: 10 }} />
                </div>
                <div className="book_info">
                    <div className="">
                        <Skeleton count={5} height={20} width={70} style={{  margin: 10 }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeLoader
