import React, { useEffect, useState, useRef } from 'react'
import '../CSS/quiz.css';
import '../CSS/result.css'
export default function Quiz({ quizStarted, setQuizStarted }) {
    const questions = [
        {
            "id": 1,
            "question": "What is the capital of Atlantis?",
            "options": ["Atlantica", "Poseidonis", "New Atlantis", "Atlantis City"],
            "correct_answer": "Poseidonis"
        },
        {
            "id": 2,
            "question": "Who is the CEO of Acme Corporation?",
            "options": ["John Smith", "Jane Doe", "Michael Johnson", "Emily Davis"],
            "correct_answer": "Jane Doe"
        },
        {
            "id": 3,
            "question": "What year was the Eiffel Tower completed?",
            "options": ["1889", "1901", "1873", "1925"],
            "correct_answer": "1889"
        },
        {
            "id": 4,
            "question": "Which planet is known as the 'Red Planet'?",
            "options": ["Venus", "Mars", "Jupiter", "Neptune"],
            "correct_answer": "Mars"
        },
        {
            "id": 5,
            "question": "Who wrote the play 'Hamlet'?",
            "options": ["William Shakespeare", "Jane Austen", "Charles Dickens", "Leo Tolstoy"],
            "correct_answer": "William Shakespeare"
        },
        {
            "id": 6,
            "question": "What is the chemical symbol for gold?",
            "options": ["Au", "Ag", "Fe", "Cu"],
            "correct_answer": "Au"
        },
        {
            "id": 7,
            "question": "Which country is famous for producing tea?",
            "options": ["China", "Brazil", "India", "Russia"],
            "correct_answer": "India"
        },
        {
            "id": 8,
            "question": "What is the tallest mountain in the world?",
            "options": ["Mount Everest", "K2", "Kangchenjunga", "Makalu"],
            "correct_answer": "Mount Everest"
        },
        {
            "id": 9,
            "question": "Who painted the Mona Lisa?",
            "options": ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Michelangelo"],
            "correct_answer": "Leonardo da Vinci"
        },
        {
            "id": 10,
            "question": "Which is the largest ocean on Earth?",
            "options": ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
            "correct_answer": "Pacific Ocean"
        }
    ]
    const [questionNum, setQuestionNum] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [violationCount, setViolationCount] = useState(0);


    useEffect(() => {
        if (quizStarted) {
            const savedScore = localStorage.getItem('score');
            const qNum = localStorage.getItem('questionNum');
            setQuestionNum(Number(qNum));
            setScore(Number(savedScore));
        }
    }, [])

    const next = () => {
        setQuestionNum(questionNum + 1);
        setIsCorrect(false);
        setUserAnswer('');
    };

    const isRight = () => {
        setIsCorrect(true);
        if (userAnswer == questions[questionNum]["correct_answer"]) setScore(score + 1);
        const temquestionNum = questionNum + 1;

        localStorage.setItem('score', score.toString());
        localStorage.setItem('questionNum', temquestionNum.toString());
    }
    const restart = () => {
        localStorage.setItem('quizStarted', true);
        setQuizStarted(false);
        setQuestionNum(0)
        setScore(0);
        localStorage.setItem('score', 0);
        localStorage.setItem('questionNum', 0);
        setViolationCount(0);
    }

    useEffect(() => {
        if (questionNum > 9) {
            setShowResult(true)
        }
    }, [questionNum]);

    useEffect(() => {
        localStorage.setItem('violationCount', violationCount.toString())
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                setViolationCount(violationCount + 1);
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [violationCount]);

    const [isFullScreen, setIsFullScreen] = useState(false);

    useEffect(() => {
        const handleFullScreenChange = () => {
            setIsFullScreen(document.fullscreenElement !== null);
        };

        document.addEventListener('fullscreenchange', handleFullScreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullScreenChange);
        };
    }, []);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error('Failed to enter full screen mode:', err);
            });
        } else {
            document.exitFullscreen().catch(err => {
                console.error('Failed to exit full screen mode:', err);
            });
        }
    };

    return (
        <div>

            <div className="container md:text-xl">
                <div className=' text-center'>
                    <p>{isFullScreen ? '' : 'Yor are not using full screen'}</p>
                    <button onClick={toggleFullScreen} className=" hover:text-white border border-purple-700
                     hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 
                     font-medium rounded-lg text-md px-5 py-2.5 text-black text-center me-2 mb-2 
                       dark:hover:text-white dark:hover:bg-purple-500">
                        {isFullScreen ? 'Exit Full Screen' : 'Enter Full Screen'}
                    </button>
                </div>
                {showResult ? <div className="container0">
                    <div className="header">Quiz Result</div>
                    <div className="result">{`${score} out of 10`}</div>
                    <div className="message">{`${score > 4 ? "Congratulations! You did a great job!" : "Do your best next time"}`}</div>
                    <button onClick={() => restart()} className="button">Try Again</button>
                </div> :
                    <div>
                        <h1>Quiz Time!</h1>
                        {questions[questionNum] ?
                            <form className="question">
                                <p className='text-xl mb-2'>{questions[questionNum]['question']}</p>
                                <ul className="options">
                                    <li className='bg-[#f9f9f9] rounded-md'>
                                        <label className={`${!isCorrect && userAnswer == questions[questionNum]['options'][0] ? "bg-[#3498db]" : ""}
                            ${isCorrect && userAnswer == questions[questionNum]["correct_answer"] &&
                                                questions[questionNum]["correct_answer"] == questions[questionNum]['options'][0] ? "bg-green-400" :
                                                isCorrect && userAnswer == questions[questionNum]['options'][0] ? 'bg-red-500' :
                                                    isCorrect && questions[questionNum]["correct_answer"] == questions[questionNum]['options'][0] ? "bg-green-400" : ""
                                            }
                            `} htmlFor="option1">1) {questions[questionNum]['options'][0]}
                                            <input checked={userAnswer == questions[questionNum]['options'][0] ? true : false} onChange={() => setUserAnswer(questions[questionNum]['options'][0])}
                                                disabled={isCorrect ? true : false}
                                                type="radio" id="option1" name="question1" />
                                        </label>
                                    </li>
                                    <li className='bg-[#f9f9f9] rounded-md'>
                                        <label htmlFor="option2" className={`${!isCorrect && userAnswer == questions[questionNum]['options'][1] ? "bg-[#3498db]" : ""}
                            ${isCorrect && userAnswer == questions[questionNum]["correct_answer"] &&
                                                questions[questionNum]["correct_answer"] == questions[questionNum]['options'][1] ? "bg-green-400" :
                                                isCorrect && userAnswer == questions[questionNum]['options'][1] ? 'bg-red-500' :
                                                    isCorrect && questions[questionNum]["correct_answer"] == questions[questionNum]['options'][1] ? "bg-green-400" : ""
                                            }
                            `} >2) {questions[questionNum]['options'][1]}
                                            <input checked={userAnswer == questions[questionNum]['options'][1] ? true : false} onChange={() => setUserAnswer(questions[questionNum]['options'][1])}
                                                disabled={isCorrect ? true : false} type="radio" id="option2" name="question1" />
                                        </label>
                                    </li>
                                    <li className='bg-[#f9f9f9] rounded-md'>
                                        <label className={`${!isCorrect && userAnswer == questions[questionNum]['options'][2] ? "bg-[#3498db]" : ""}
                            ${isCorrect && userAnswer == questions[questionNum]["correct_answer"] &&
                                                questions[questionNum]["correct_answer"] == questions[questionNum]['options'][2] ? "bg-green-400" :
                                                isCorrect && userAnswer == questions[questionNum]['options'][2] ? 'bg-red-500' :
                                                    isCorrect && questions[questionNum]["correct_answer"] == questions[questionNum]['options'][2] ? "bg-green-400" : ""
                                            }
                            `} htmlFor="option3">3) {questions[questionNum]['options'][2]}
                                            <input checked={userAnswer == questions[questionNum]['options'][2] ? true : false} onChange={() => setUserAnswer(questions[questionNum]['options'][2])}
                                                disabled={isCorrect ? true : false} type="radio" id="option3" name="question1" />
                                        </label>
                                    </li>
                                    <li className='bg-[#f9f9f9] rounded-md'>
                                        <label className={`${!isCorrect && userAnswer == questions[questionNum]['options'][3] ? "bg-[#3498db]" : ""}
                            ${isCorrect && userAnswer == questions[questionNum]["correct_answer"] &&
                                                questions[questionNum]["correct_answer"] == questions[questionNum]['options'][3] ? "bg-green-400" :
                                                isCorrect && userAnswer == questions[questionNum]['options'][3] ? 'bg-red-500' :
                                                    isCorrect && questions[questionNum]["correct_answer"] == questions[questionNum]['options'][3] ? "bg-green-400" : ""
                                            }
                            `} htmlFor="option4">4) {questions[questionNum]['options'][3]}
                                            <input checked={userAnswer == questions[questionNum]['options'][3] ? true : false} onChange={() => setUserAnswer(questions[questionNum]['options'][3])}
                                                disabled={isCorrect ? true : false} type="radio" id="option4" name="question1" />
                                        </label>
                                    </li>
                                </ul>
                            </form> : ""}
                        {!isCorrect ? <button disabled={userAnswer == "" ? true : false}
                            onClick={() => {
                                isRight();
                            }} className="submit-btn px-4 py-1 ml-auto block">Submit</button> :
                            <button className="text-white bg-red-400 font-medium 
                   block ml-auto rounded-md text-lg px-5 py-[5px] mt-2" onClick={() => next()}>Next</button>}
                        <button onClick={() => { restart() }} type="button" className="text-black bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 
                focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-md text-lg px-4 py-1 text-center me-2 mb-2">Restart</button>
                        {violationCount >= 1 ?
                            <div className=' bg-white px-1 py-[1px]'>
                                <p className=' text-md text-red-700'>Violation Detected {violationCount} Times</p>
                            </div>
                            : ""}
                    </div>
                }

            </div>
        </div>
    )
}
