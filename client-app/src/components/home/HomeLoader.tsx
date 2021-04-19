import { motion } from 'framer-motion'
import React, { Fragment } from 'react'
import Skeleton from 'react-loading-skeleton'

const HomeLoader = () => {
    return (

        <Fragment>
            <div className="hero-section">
                <div className="container">
                    <div className="hero-wrapper">
                        <div className="hero-button-wrapper">
                            <div className="btn light outline w-button">
                                Explore All Books
                            </div>
                        </div>
                    </div>
                    <div className="book-texture"></div>
                </div>
            </div>
            <div className="products-section">
                <div className="container">
                    <div className="shop-top-wrapper">
                        <div className="support-top-left">
                            <h2 className="support-top-heading">New Books</h2>
                        </div>
                        <div className="support-top-right"></div>
                    </div>
                    <div className="products-list-wrapper w-dyn-list">
                        <div role="list" className="products-list w-dyn-items">
                            <div role="listitem" className="w-dyn-item">
                                <div className="shop-item-wrapper">
                                    <div className='bookitem shop-item-link-wrapper w-inline-block'>
                                        <div>
                                            <Skeleton duration={2} count={1} width={400} height={500} style={{ marginBottom: 10, display: 'block' }} />
                                            <div className="pill-2 badge primary sale w-condition-invisible">
                                                New
                                            </div>
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
                            <div role="listitem" className="w-dyn-item">
                                <div className="shop-item-wrapper">
                                    <div className='bookitem shop-item-link-wrapper w-inline-block'>
                                        <div>
                                            <Skeleton duration={2} count={1} width={400} height={500} style={{ marginBottom: 10, display: 'block' }} />
                                            <div className="pill-2 badge primary sale w-condition-invisible">
                                                New
                                            </div>
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
                            <div role="listitem" className="w-dyn-item">
                                <div className="shop-item-wrapper">
                                    <div className='bookitem shop-item-link-wrapper w-inline-block'>
                                        <div>
                                            <Skeleton duration={2} count={1} width={400} height={500} style={{ marginBottom: 10, display: 'block' }} />
                                            <div className="pill-2 badge primary sale w-condition-invisible">
                                                New
                                            </div>
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
                    <div className="shop-more">
                        <div className="btn dark w-button">View All Books</div>
                    </div>
                </div>
            </div>
            <div className="safe-section">
                <div className="container">
                    <div className="safe-wrapper">
                        <h2 className="safe-heading">
                            Read Book, Whatever you are interested.
                            </h2>
                        <p className="safe-paragraph">
                            Discover Your Community
                            Explore the diverse range of voices and perspectives
                            from your community and across the country.
                            </p>
                    </div>
                </div>
                <div className="book-texture"></div>
            </div>
            <div className="shop-local-section">
                <div className="container shop-local-container">
                    <div className="shop-local-wrapper">
                        <div className="shop-local-left"></div>
                        <div className="shop-local-right">
                            <div className="shop-local-content-wrapper">
                                <h2 className="shop-local-heading">Read Book, Whatever you are interested.</h2>
                                <p>
                                    Discover Your Community
                                    Explore the diverse range of voices and perspectives
                                    from your community and across the country.
                                    </p>
                                <p>-------</p>
                                <div><strong>Bookshelf</strong></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment >

    )
}

export default HomeLoader
