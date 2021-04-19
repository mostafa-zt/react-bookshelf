import { motion } from 'framer-motion';
import React, { Fragment } from 'react';
import Skeleton from 'react-loading-skeleton';


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

const UserBookListLoader = () => {

    return (
        <motion.div exit="out" animate="in" initial="initial" variants={pageVariants} transition={pageTransition}>
            <Fragment>
                <div className="page-title-section">
                    <div className="container">
                        <h1 className="">
                            {/* <Skeleton duration={2} count={1} width={150} height={20} /> */}
                        &nbsp; &nbsp; &nbsp; &nbsp;
                    </h1>
                    </div>
                </div>
                <div className="content-section">
                    <div className="container">
                        <div className="shop-page-wrapper">
                            <div className="shop-list">
                                <div className="products-list-wrapper w-dyn-list">
                                    <div role="list" className="products-list w-dyn-items">
                                        <div role="listitem" className="w-dyn-item">
                                            <div className="shop-item-wrapper">
                                                <div className='bookitem shop-item-link-wrapper w-inline-block'>
                                                    <div>
                                                        <Skeleton duration={2} count={1} width={400} height={500} style={{ marginBottom: 10, display: 'block' }} />
                                                        <div className="description" style={{ display: 'flex', flexDirection: 'column', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'center' }}>
                                                            <p>
                                                                <Skeleton duration={2} count={1} width={250} height={20} />
                                                            </p>
                                                            <p>
                                                                <Skeleton duration={2} count={1} width={250} height={20} />
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="shop-details-wrapper">
                                                        <div className="shop-details-left">
                                                            <div className="shop-item-name">
                                                            </div>
                                                            <div className="price-wrapper">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="shop-button-wrapper">
                                                    <div className="btn w-button">Details</div>
                                                </div>
                                            </div>
                                        </div>      <div role="listitem" className="w-dyn-item">
                                            <div className="shop-item-wrapper">
                                                <div className='bookitem shop-item-link-wrapper w-inline-block'>
                                                    <div>
                                                        <Skeleton duration={2} count={1} width={400} height={500} style={{ marginBottom: 10, display: 'block' }} />
                                                        <div className="description" style={{ display: 'flex', flexDirection: 'column', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'center' }}>
                                                            <p>
                                                                <Skeleton duration={2} count={1} width={250} height={20} />
                                                            </p>
                                                            <p>
                                                                <Skeleton duration={2} count={1} width={250} height={20} />
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="shop-details-wrapper">
                                                        <div className="shop-details-left">
                                                            <div className="shop-item-name">
                                                            </div>
                                                            <div className="price-wrapper">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="shop-button-wrapper">
                                                    <div className="btn w-button">Details</div>
                                                </div>
                                            </div>
                                        </div>      <div role="listitem" className="w-dyn-item">
                                            <div className="shop-item-wrapper">
                                                <div className='bookitem shop-item-link-wrapper w-inline-block'>
                                                    <div>
                                                        <Skeleton duration={2} count={1} width={400} height={500} style={{ marginBottom: 10, display: 'block' }} />
                                                        <div className="description" style={{ display: 'flex', flexDirection: 'column', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'center' }}>
                                                            <p>
                                                                <Skeleton duration={2} count={1} width={250} height={20} />
                                                            </p>
                                                            <p>
                                                                <Skeleton duration={2} count={1} width={250} height={20} />
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="shop-details-wrapper">
                                                        <div className="shop-details-left">
                                                            <div className="shop-item-name">
                                                            </div>
                                                            <div className="price-wrapper">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="shop-button-wrapper">
                                                    <div className="btn w-button">Details</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </Fragment>
        </motion.div>

    )
}

export default UserBookListLoader
