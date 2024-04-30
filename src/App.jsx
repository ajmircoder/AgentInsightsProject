import React, { useState } from 'react';
import './index.css'
import Quiz from './Components/Quiz';
export default function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  return (
    <div>
      {quizStarted ? <Quiz /> :
        <div className="center-div">
          <button type="button" onClick={()=> setQuizStarted(true)}  className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2">Are You Ready</button>
        </div>}
    </div>
  )
}
