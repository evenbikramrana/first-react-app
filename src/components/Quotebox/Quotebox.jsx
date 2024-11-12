import React, { useState, useEffect, useCallback } from "react";
import Button from "components/Button";
import "./quotebox.css";
import { motion, useAnimation } from "framer-motion";

const Quotebox = () => {
  const [quote, setQuote] = useState("Fetching quote...");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const controls = useAnimation();

  const handleGetQuote = useCallback(() => {
    setLoading(true);
    fetch("https://quotes15.p.rapidapi.com/quotes/random/", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "quotes15.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setQuote(data.content);
        setAuthor(data.originator.name);
        // Trigger animation only after quote is set
        controls.start({
          x: [-300, 0],
          opacity: [0, 1],
          transition: { duration: 1, ease: "easeInOut" },
        });
      })
      .catch((err) => {
        console.error("Error fetching quote:", err);
        setQuote("Error fetching quote.");
        setAuthor("");
      })
      .finally(() => setLoading(false));
  }, [controls]);

  useEffect(() => {
    handleGetQuote();
  }, [handleGetQuote]);

  const tweetQuote = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote}" - ${author}`)}`;
    window.open(tweetUrl, "_blank");
  };

  return (
    <div className="quote-box">
      <h3 className="quote-box__header">Generate Random Quote</h3>
      <div className="overflow-hidden">
        <div className="quote-box__content">
          <motion.p
            animate={controls}
            initial={{ opacity: 0, x: -300 }}
            className="quote-box__quote"
          >
            {quote}
          </motion.p>
          <motion.p
            animate={controls}
            initial={{ opacity: 0, x: -300 }}
            className="quote-box__author"
          >
            {author || "Author will be displayed here"}
          </motion.p>
        </div>
      </div>
      <div className="quote-box__footer">
        <Button type="primary" text="Get Quote" onClick={handleGetQuote} disabled={loading} />
        <Button type="secondary" text="Tweet Quote" onClick={tweetQuote} />
      </div>
    </div>
  );
};

export default Quotebox;
