import { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import QuizCard from "./QuizCard";
import axios from "axios";
import Timer from "./Timer";

function App() {

  const [cards, setCards] = useState([]);
  const [cardset, setCardSet] = useState(false);
  const [categories, setCategories] = useState([]);
  const categoryEl = useRef();
  const amountEl = useRef();
  const timeEl = useRef();
  const [end, SetEnd] = useState(false);
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0 });
  const [startTimer, setStartTimer] = useState(false);
  const [timerId, setTimerId] = useState(0);
  let interval;
  

  useEffect(() => {
    axios
      .get('https://opentdb.com/api_category.php')
      .then(res => {
        setCategories(res.data.trivia_categories)
      })
  }, [])

  const decodeString = (str) => {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = str;
    return textArea.value
  }

  const handleSubmit = (e) => {

    e.preventDefault()
    axios
      .get('https://opentdb.com/api.php', {
        params: {
          amount: amountEl.current.value,
          category: categoryEl.current.value
        }
      })
      .then(res => {
        setCards(res.data.results.map((Item, index) => {
          const answer = decodeString(Item.correct_answer);
          const option = [...Item.incorrect_answers.map(a => decodeString(a)), answer];
          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(Item.question),
            answer: answer,
            options: option.sort(() => Math.random() - 0.5)
          }
        }));
        setCardSet(true);
        setStartTimer(true)

      })
  }

  useEffect(() => {
    let intervalId = null;
    let updatedMs = time.ms, updatedS = time.s, updatedM = time.m
    if (startTimer) {
      intervalId = setInterval(() => {        
        if (updatedS == timeEl.current.value) {
          // SetEnd(true);          
          setStartTimer(false)        
          return SetEnd(true)
        }
        if (updatedS === 60) {
          updatedM++;
          updatedS = 0;
        }
        if (updatedMs === 100) {
          updatedS++;
          updatedMs = 0;
        }
        updatedMs++;
        return setTime({ ms: updatedMs, s: updatedS, m: updatedM })
      }, 10);

      setTimerId(intervalId);
    }
    else{
      clearInterval(timerId);
    }
  }, [startTimer])

  
  return (
    <center>
      <Navbar categories={categories} handleSubmit={handleSubmit} categoryEl={categoryEl} amountEl={amountEl} timeEl={timeEl} />
      <div className="timercomp">
      <Timer time={time} /></div>
      <center><QuizCard cards={cards} setCards={setCards} end={end} SetEnd={SetEnd} setTime={setTime} setStartTimer={setStartTimer}/></center>
    </center>
  );
}

export default App; 
