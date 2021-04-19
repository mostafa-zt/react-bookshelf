import { motion } from 'framer-motion'
import React, { Fragment } from 'react'
import Skeleton from 'react-loading-skeleton'

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
    transition:"linear",
    duration: 0.4
    // type:"tween",
    // ease:"anticipate",
    // duration:3
}

const BookDetailsLoader = () => {
    return (
        <motion.div exit="out" animate="in" initial="initial" variants={pageVariants} transition={pageTransition}>
            <div className="page-title-section">
                <div className="container">
                    <h1 className="">
                        &nbsp; &nbsp; &nbsp; &nbsp;
                    </h1>
                </div>
            </div>
            <div className="content-section">
                <div className="container">
                    <div className="shopping-page-wrapper">
                        <div className="shopping-page-left">
                            <Skeleton duration={2} count={1} width={500} height={400} />
                            {/* <div className="shopping-page-image">
                            </div> */}
                        </div>
                        <div className="shipping-page-right">
                            <h2 className="page-product-headin">
                                <Skeleton duration={2} count={1} width={200} height={20} />
                            </h2>
                            <div className="w-richtext">
                                <h2>What’s this book about?</h2>
                                <h3>
                                    <Skeleton duration={2} count={1} width={350} height={20} />
                                </h3>
                                <p>
                                    <Skeleton duration={2} count={1} width={200} height={20} />
                                </p>
                                <p>
                                    <Skeleton duration={2} count={1} width={320} height={20} />
                                </p>
                                <p>
                                    <Skeleton duration={2} count={1} width={300} height={20} />
                                </p>
                                <p>
                                    <Skeleton duration={2} count={1} width={280} height={20} />
                                </p>
                                <p>
                                    <Skeleton duration={2} count={1} width={280} height={20} />
                                </p>
                                <p>
                                    <Skeleton duration={2} count={1} width={280} height={20} />
                                </p>
                                <p>
                                    <Skeleton duration={2} count={1} width={290} height={20} />
                                </p>
                                <p>
                                    <Skeleton duration={2} count={1} width={290} height={20} />
                                </p>
                                <p>
                                    <Skeleton duration={2} count={1} width={290} height={20} />
                                </p>
                                <p>
                                    <Skeleton duration={2} count={1} width={150} height={20} />
                                </p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>
                                    <Skeleton duration={2} count={1} width={90} height={35} style={{ marginRight: '7px' }} />
                                    <Skeleton duration={2} count={1} width={90} height={35} style={{ marginRight: '7px' }} />
                                    <Skeleton duration={2} count={1} width={90} height={35} style={{ marginRight: '7px' }} />
                                    <Skeleton duration={2} count={1} width={90} height={35} style={{ marginRight: '7px' }} />
                                </div>
                                <div className="book-details">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default BookDetailsLoader
