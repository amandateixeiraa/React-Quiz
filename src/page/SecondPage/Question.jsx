import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';

function Question() {
    // State variables
    const [currentQuestion, setCurrentQuestion] = useState(''); // Stores the current question
    const [options, setOptions] = useState([]); // Stores the options for the current question
    const [questions, setQuestions] = useState([]); // Stores all fetched questions
    const [displayedQuestions, setDisplayedQuestions] = useState([]); // Keeps track of which questions have been displayed
    const [button, setButton] = useState('Next'); // Stores the text for the button (Next or Submit)
    const [selectRadioBtn, setSelectRadioBtn] = useState(''); // Tracks the selected radio button
    const [countResults, setCountResults] = useState([]); // Stores results of selected answers

    const navigate = useNavigate(); // Initialize navigation

    // Function to fetch questions from a JSON file
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5173/questions.json'); // Fetch questions
            if (!response.ok) {
                throw new Error('Response was not ok'); // Handle fetch errors
            }
            const data = await response.json(); // Parse JSON data
            setQuestions(data.questions); // Update questions state
        } catch (error) {
            console.error('Error fetching data:', error); // Log errors
        }
    };

    // useEffect to fetch questions on component mount
    useEffect(() => {
        fetchData(); 
    }, []); 

    // Function to select a random question
    const randomQuestion = () => {
        if (questions.length === 0) return; // Do nothing if no questions
        if (displayedQuestions.length < questions.length) { // Ensure not all questions are displayed
            let randomIndex;
            // Generate a random index not yet displayed
            do {
                randomIndex = _.random(0, questions.length - 1);
            } while (displayedQuestions.includes(randomIndex));
            
            // Update displayed questions and set the current question
            setDisplayedQuestions(prev => [...prev, randomIndex]);
            const selectedQuestion = questions[randomIndex]; // Get selected question
            setCurrentQuestion(selectedQuestion.question); // Set current question text
            setOptions(selectedQuestion.options); // Set current question options
            setSelectRadioBtn(''); // Reset selected radio button
            // Change button text to 'Submit' if 13 questions are displayed
            if (displayedQuestions.length === 13) {
                setButton('Submit');
            }
        } 
    };

    // useEffect to trigger randomQuestion when questions are fetched
    useEffect(() => {
        if (questions.length > 0) {
            randomQuestion(); 
        }
    }, [questions]);

    // Handle change in selected radio button
    const handleRadioChange = (event) => {
        setSelectRadioBtn(event.target.value); // Update selected radio button value
    };

    // Handle button click
    const handleClick = () => {
        if (button === 'Next') { // If the button is 'Next'
            if (selectRadioBtn) { // Check if a radio button is selected
                randomQuestion(); // Call randomQuestion to display the next question
            }
        } else {
            displayResult(); // Call displayResult if the button is 'Submit'
        }

        // Update results count based on selected answer
        if (selectRadioBtn) {
            const selectedIndex = options.indexOf(selectRadioBtn); // Get index of selected answer
            if (selectedIndex !== -1) {
                setCountResults(prev => [...prev, selectedIndex]); // Update results
            }
        }
    };

    // Function to display results and navigate to results page
    const displayResult = () => {
        const result = countResults.reduce((acc, curr) => {
            acc[curr] = (acc[curr] || 0) + 1; // Count occurrences of each answer
            return acc;
        }, {});

        navigate('/page/ThirdPage/Results', { state: { result } }); // Navigate to results page with data
    };

    // Render component UI
    return (
        <div className='question-wrapper'>
            <form onSubmit={(e) => e.preventDefault()}> {/* Prevent form submission */}
                <fieldset>
                    <div className='question'>
                        <legend>{currentQuestion || 'Loading...'}</legend> {/* Display current question or loading text */}
                    </div> 
                    <div className='quiz-wrapper'>
                        <div className='options-wrapper'>
                            {options.map((option, index) => (
                                <div key={index}>
                                    <label>
                                        <input  
                                            type="radio" 
                                            className='option' 
                                            name="option" 
                                            value={option} 
                                            required 
                                            checked={selectRadioBtn === option}
                                            onChange={handleRadioChange} 
                                        />
                                        {option} {/* Display option text */}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className='NextBtn-wrapper'>
                            <button type='button' className='NextBtn' onClick={handleClick}>{button}</button> {/* Button to navigate */}
                        </div> 
                    </div>
                </fieldset>
            </form>
        </div>
    );
}

export default Question;