import React from 'react';
import './button.css';
import { motion } from 'framer-motion';

const Button = ({ type, text, ...otherProps }) => {
    const buttonVariants = {
        tapAnimate: {
            scale: 0.9,
            boxShadow: '0px 0px 0px 0px',
            transition: {
                duration: 0.1,
                ease: "easeInOut"
            }
        }
    }

    return (
        <motion.button
            variants={buttonVariants}
            whileTap="tapAnimate"
            className={`app-btn btn-${type}`}
            {...otherProps}>
            {text}
        </motion.button>
    )
}

export default Button
