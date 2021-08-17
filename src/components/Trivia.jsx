import React,{useEffect,useState} from 'react'
import './Trivia.css'
import axios from 'axios'
import useSound from 'use-sound'
import wrong from '../sounds/wrong.mp3'
import correct from '../sounds/correct.mp3'
const defaultData= {
          "category": "General Knowledge",
          "type": "multiple",
          "difficulty": "easy",
          "question": "...",
          "correct_answer": "...",
          "incorrect_answers": [
              "...",
              "...",
              "..."
          ]
      }
  
const Trivia = ({ setStop, questionNumber, setQuestionNumber}) => {
    const [question, setQuestion] = useState(defaultData);
    let [answers,setAnswers] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [className, setClassName] = useState('answer');
    const [Wrong] = useSound(wrong); 
    const [Correct] = useSound(correct); 

    

    const getData = async ()=>{
        try{
          const URL = 'https://opentdb.com/api.php?amount=1&category=9&difficulty=easy&type=multiple';
          const res = await axios.get(URL);
          let dataTotal = res.data;
          setQuestion(dataTotal.results[0]);
        }catch(e){
          console.log(e)
        }
        }
     useEffect(()=>{ 
       getData();   
    },[])

    

    useEffect(()=>{
        let array = question.incorrect_answers;
        array.splice(Math.floor(Math.random()*4),0,question.correct_answer);  
        setAnswers(array);
    },[question])
    const delay = (duration,callback)=>{
        setTimeout(()=>{
           callback();
        },duration)
    }
    const handleClick = (answer)=>{
        setSelectedQuestion(answer);
        setClassName('answer active');
        delay(500,() => setClassName(answer === question.correct_answer?'answer correct':'answer wrong'));
        delay(2000,()=>{
            if(answer === question.correct_answer){
                Correct();
                delay(1000,()=>{
                  setQuestionNumber(questionNumber + 1)
                  setSelectedQuestion(null)
                  getData(); 
                })  
            }else{
                Wrong();
                delay(1000,()=>{
                 setStop(true);
                 getData();  
                  })
            }
        })
    }

    return (
        <div className='trivia'>
            <div className="question">{question.question}</div>
            <div className="answers">
                {answers.map((answer,index)=>{
                    return(
                   <div className={selectedQuestion === answer? className : 'answer' } key={index} onClick={()=>handleClick(answer)}>{answer}</div> 
                    )
                })}
            </div>
        </div>
    )
}
export default Trivia;