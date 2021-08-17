import React, { useEffect, useState, useMemo } from 'react'
import './App.css'
import Trivia from './components/Trivia';
import useSound from 'use-sound'
import Timer from './components/Timer';
import playsound from './sounds/play.mp3'
const defaultData={
  "results": [
    {
        "category": "General Knowledge",
        "type": "multiple",
        "difficulty": "easy",
        "question": "Which of the following is not the host of a program on NPR?",
        "correct_answer": "Ben Shapiro",
        "incorrect_answers": [
            "Terry Gross",
            "Ira Glass",
            "Peter Sagal"
        ]
    }
]
}
function App() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [theGot, setTheGot] = useState('$ 0');
  const [play, setPlay] = useState(false);
  const [Play] = useSound(playsound); 
 
  const moneyPyramid = useMemo(() =>  [
    {id:1,amount:'$ 100'},
    {id:2,amount:'$ 200'},
    {id:3,amount:'$ 300'},
    {id:4,amount:'$ 500'},
    {id:5,amount:'$ 1000'},
    {id:6,amount:'$ 2000'},
    {id:7,amount:'$ 4000'},
    {id:8,amount:'$ 8000'},
    {id:9,amount:'$ 16000'},
    {id:10,amount:'$ 32000'},
    {id:11,amount:'$ 64000'},
    {id:12,amount:'$ 125000'},
    {id:13,amount:'$ 250000'},
    {id:14,amount:'$ 500000'}, 
    {id:15,amount:'$ 1000000'}
  ].reverse(), []);
  useEffect(() => {
    questionNumber > 1 && (
      setTheGot(moneyPyramid.find((m)=>m.id === questionNumber - 1).amount)
    )
  }, [moneyPyramid,questionNumber])
  const handlePlay = () =>{
    setPlay(true);
    Play();
  }

  return (
    <div className='app'>
      {
        !play?
        <button className='play-btn' onClick={()=>handlePlay()}>Play</button>
        :
      (<div className="main">
        {stop ? <h1 className='gameover-text'>You got {theGot}</h1> 
        :
        (
        <>
        <div className="top">
          <div className="timer"><Timer setStop={setStop} questionNumber={questionNumber}/></div>
        </div>
        <div className="bottom">
          <Trivia 
          setStop={setStop} 
          questionNumber={questionNumber}
          setQuestionNumber={setQuestionNumber}/>
        </div>
        </>
        )}
      </div>)
      }
      <div className="pyramid">
        <ul className="money-list">
          {moneyPyramid.map((data,index)=>{
            return(
          <li className={questionNumber === data.id?'money-list-item active':'money-list-item'} key={index}>
            <span className='money-number'>{data.id}</span>
            <span className='money-amount'>{data.amount}</span>
          </li>
            )
          })}
          
        </ul>
      </div>
    </div>
  )
}

export default App
