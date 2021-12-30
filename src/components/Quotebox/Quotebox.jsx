import React, { useState } from 'react';
import Button from 'components/Button';
import './quotebox.css';
import { motion } from 'framer-motion';


const Quotebox = () => {
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
    const handleGetQuote = () => {
        console.log('get quote');
        fetch('https://quotes15.p.rapidapi.com/quotes/random/', {
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'quotes15.p.rapidapi.com',
                'x-rapidapi-key': '1ab2a061c6msh28bab6680d0f6dbp1df1b9jsndb2f73fb9922'
            },
        }).then(response => {
            return response.json();
        }).then(data => {
            setQuote(data.content);
            setAuthor(data.originator.name);

        }).catch(err => {
            console.log(err);
        });

    }
    return (
        <div className='quote-box'>
            <h3 className='quote-box__header'>Generate Random Quote</h3>
            <motion.div className="quote-box__content">
                {quote ? <p className='quote-box__quote'>{quote}</p> : <p className='quote-box__quote'>Quote will be displayed here</p>}
                {author ? <p className='quote-box__author'>{author}</p> : <p className='quote-box__author'>Author will be displayed here</p>}
            </motion.div>
            <div className="quote-box__footer">
                <Button type="primary" text="Get Quote" onClick={handleGetQuote} />
                <Button type="secondary" text="Tweet Quote" />
            </div>
        </div>
    )
}

export default Quotebox
