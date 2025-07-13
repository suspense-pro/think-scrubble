/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Poll } from '../lib/data'; // Import the Poll type

// Define the type for the component's props
interface InlinePollProps {
    pollData: Poll;
}

const InlinePoll: React.FC<InlinePollProps> = ({ pollData }) => {
    // Type the state hooks
    const [poll, setPoll] = useState<Poll>(pollData);
    const [voted, setVoted] = useState<boolean>(false);
    
    // Calculate total votes based on the current state
    const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);

    const handleVote = (optionId: number) => {
        if (voted) return; // Prevent re-voting

        setPoll(prevPoll => ({
            ...prevPoll,
            options: prevPoll.options.map(opt =>
                opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
            ),
        }));
        setVoted(true);
    };

    return (
        <div className="poll-container">
            <h3 className="poll-question">{poll.question}</h3>
            <div className="poll-options">
                {poll.options.map(option => (
                    <div key={option.id} className="poll-option">
                        {!voted ? (
                            <button onClick={() => handleVote(option.id)}>{option.text}</button>
                        ) : (
                            <div className="poll-result">
                                {/* The total number of votes increases by 1 after voting */}
                                <div 
                                    className="poll-result-bar" 
                                    style={{ width: `${(option.votes / (totalVotes)) * 100}%` }}
                                ></div>
                                <span className="poll-result-text">
                                    <span>{option.text}</span>
                                    <span>{option.votes} votes</span>
                                </span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
             {voted && <p style={{marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem'}}>Total Votes: {totalVotes}</p>}
        </div>
    );
};

export default InlinePoll;