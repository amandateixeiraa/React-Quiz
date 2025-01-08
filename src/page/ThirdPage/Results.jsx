import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import React from 'react';


function Results(){
    // State variables to hold character name and description text
    const [char, setChar] = useState("");
    const [text, setText] = useState("");
    const location = useLocation(); // Get the current location object
    const result = location.state || {}; // Get results from location state, default to empty object

    // Effect to trigger character determination when results change
    useEffect(() => {
        character(); // Call character function to determine the character based on results
    }, [result]); // Dependency array includes result

    // Function to filter results and find the character with the highest score
    const filterResult = () => {
        let maxKey = null; // To store the key of the character with the highest score
        let value = -Infinity; // Initialize value to negative infinity

        const innerResult = result.result || {}; // Get inner results or default to empty object
        for (let key in innerResult) { // Iterate over the keys in innerResult
            // Update maxKey and value if the current score is higher
            if (innerResult[key] > value) {
                value = innerResult[key]; // Update highest score
                maxKey = key; // Update corresponding character key
            }

          
        }
        return maxKey;// Return the key of the character with the highest score

    };

    // Function to set the character name and description based on the highest score
    const character = () => {
      const num = filterResult(); // Get the key for the character with the highest score
      const number = Number(num); // Convert key to a number
      // Set character name and description based on the highest score
      if (number === 0) {
          setChar("Samantha Jones");
          setText("You’re fierce, unapologetic, and live life on your own terms. You crave excitement and thrive in vibrant social scenes, never shying away from new adventures, especially when it comes to love and passion. You're all about embracing every moment and enjoying the thrill of the chase!");
      } else if (number === 1) {
          setChar("Miranda Hobbes");
          setText("You approach life and relationships with a practical mindset, prioritizing self-care and introspection. You strike a careful balance between your social life and the need for personal space, valuing meaningful connections while being deliberate and thoughtful about commitment. You believe in taking the time to understand what you truly want before diving in.");
      } else if (number === 2) {
          setChar("Carrie Bradshaw");
          setText("You’re a free spirit, blending creativity with a flair for adventure in both your professional and social life. You thrive on spontaneity and the thrill of new experiences, always seeking joy in the unexpected. Whether it’s brainstorming your next big idea or diving into a casual connection, you embrace the excitement of life with open arms, letting your intuition guide you on this whimsical journey. You believe that every day holds the potential for a little magic.");
      } else if (number === 3) {
          setChar("Charlotte York");
          setText("You cherish deep emotional connections and prioritize meaningful relationships in your life. With a traditional view on love and commitment, you believe in the beauty of heartfelt experiences and the importance of genuine connections. You seek to nurture your relationships, finding joy in the little moments that create lasting bonds. For you, love is a beautiful journey, and you approach it with sincerity and hope, always aiming for a happily-ever-after.");
      }
  };
      return (
        <div className="results-wrapper">
          <h1 className="results-heading">Embrace Your Fabulousness: You’re {char}</h1>
          <p>{text}</p>
        </div>
      );
}

export default Results;