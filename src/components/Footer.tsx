/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

const Footer: React.FC = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            console.log(`Subscribed with email: ${email}`);
        }
    };

    return (
        <footer className="app-footer">
            <div className="container">
                <div className="newsletter-form">
                    <h3>Join Our Newsletter</h3>
                    <p>Get the latest articles and insights delivered straight to your inbox.</p>
                    {subscribed ? (
                        <p>Thank you for subscribing!</p>
                    ) : (
                        <form onSubmit={handleSubmit} className="newsletter-input">
                            <input
                                type="email"
                                placeholder="your.email@example.com"
                                value={email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                required
                                aria-label="Email for newsletter"
                            />
                            <button type="submit" className="btn btn-primary">Subscribe</button>
                        </form>
                    )}
                </div>
            </div>
        </footer>
    );
};

export default Footer;