import React, { useState, useEffect, useCallback } from "react";
import Button from "components/Button";
import "./quotebox.css";
import { motion, useAnimation } from "framer-motion";

const Quotebox = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const controls = useAnimation();
  const handleGetQuote = useCallback(() => {
    console.log("get quote");
    fetch("https://quotes15.p.rapidapi.com/quotes/random/", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "quotes15.p.rapidapi.com",
        "x-rapidapi-key": "1ab2a061c6msh28bab6680d0f6dbp1df1b9jsndb2f73fb9922",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        controls.start({
          x: [-300, 0],
          opacity: [0, 1],
          transition: {
            duration: 1,
            ease: "easeInOut",
            staggerChildren: .4,

          },

        });
        setQuote(data.content);
        setAuthor(data.originator.name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [controls]);

  useEffect(() => {
    handleGetQuote();
    console.log("use effect");
  }, [handleGetQuote]);
  return (
    <div className="quote-box">
      <h3 className="quote-box__header">Generate Random Quote</h3>
      <div className="overflow-hidden">
        <div className="quote-box__content">
          {quote ? (
            <motion.p
              animate={controls}
              initial={{ opacity: 0, x: -300 }}
              className="quote-box__quote"
            >
              {quote}
            </motion.p>
          ) : (
            <p
              
              className="quote-box__quote"
            >
              Quote will be displayed here
            </p>
          )}
          {author ? (
            <motion.p animate={controls}
              initial={{ opacity: 0, x: -300 }} className="quote-box__author">{author}</motion.p>
          ) : (
            <p className="quote-box__author">Author will be displayed here</p>
          )}
        </div>
      </div>

      <div className="quote-box__footer">
        <Button type="primary" text="Get Quote" onClick={handleGetQuote} />
        <Button type="secondary" text="Tweet Quote" />
      </div>
    </div>
  );
};

export default Quotebox;
