import { useEffect, useState } from "react"


const QuizCard = ({ cards ,setCards, end,SetEnd,setTime,setStartTimer}) => {

    const [i, Seti] = useState(0);
    const [correct, SetCorrect] = useState(0);
    

    useEffect(() => {

    }, [i])


    const handleHome = () => {
        document.getElementById('myform').reset();
        Seti(0);
        SetEnd(false);
        setCards([]);
        setTime({ms:0,s:0,m:0});
        SetCorrect(0);
    }


    const handleClick = (e) => {


        if (e.target.getAttribute("value") === cards[i].answer) {
            document.body.style.backgroundColor = "#90ec7c";
            SetCorrect(correct => correct + 1);
        }
        else {
            document.body.style.backgroundColor = "#c21e56";
        }

        let time = setTimeout(() => {
            if (i === cards.length - 1) {
                SetEnd(true)
                setStartTimer(false)
            }
            else {
                Seti(i => i + 1);
            }
            document.body.style.backgroundColor = "#69747c";
            clearInterval(time);
        }, 700)

    }

    return (
        <div className="quiz-card">
            {end ?
                <div className="over">
                    <h1>Quiz is Over</h1>
                    <h2>Result: {(correct*100)/cards.length}%</h2>
                    <h2>You Solved {correct} Out Of {cards.length} Questions!</h2>
                    <button type="button" className="btn btn-lg home" onClick={handleHome}>Home</button>
                </div>
                :
                <>
                    {cards.length === 0 ?
                        
                        <h1 className="start">Choose the options and start the quiz</h1>
                        :
                        <>
                            <center><h4 className="question"> Q.{i + 1}) {cards[i].question}</h4></center>
                            <div className="card-options">
                                {cards[i].options.map((option) => {
                                    return <div className="card-option" key={option} onClick={handleClick} value={option}>{option}</div>
                                })}
                            </div>
                        </>
                    }
                </>
            }

        </div>
    );
}

export default QuizCard;