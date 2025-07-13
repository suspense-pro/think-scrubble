/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';

const ReadingProgressBar: React.FC = () => {
    const [width, setWidth] = useState(0);

    // This effect runs only on the client-side where 'window' is available
    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setWidth(progress);
        };

        window.addEventListener('scroll', handleScroll);
        
        // Cleanup function to remove the event listener
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return <div className="reading-progress-bar" style={{ width: `${width}%` }}></div>;
};

export default ReadingProgressBar;