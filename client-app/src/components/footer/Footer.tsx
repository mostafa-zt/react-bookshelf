import React from 'react'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
    return (
        <div className="footer">
            <div className="container">
                <div className="footer-wrapper">
                    <div className="footer-logo-column">
                        <Link to="/" aria-current="page" className="w-inline-block w--current">
                            <img src="./images/bookshelf-icon.png" alt="Bookshelf" />
                            Bookshelf
                        </Link>
                    </div>
                    <div>
                        <a href="https://twitter.com/" target="_blank" className="social-footer-link w-inline-block">
                            <img src="/images/icons8-twitter.svg" alt="Twitter Logo" width="30" />
                        </a>
                        <a
                            href="https://www.facebook.com/" className="social-footer-link w-inline-block">
                            <img src="/images/icons8-facebook.svg" alt="Facebook Logo" width="30" />
                        </a>
                        <a
                            href="https://www.instagram.com/" target="_blank"
                            className="social-footer-link w-inline-block">
                            <img src="/images/icons8-instagram.svg" alt="Instagram Logo" width="30" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
