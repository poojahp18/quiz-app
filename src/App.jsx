import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Trivia from "./components/Trivia";
import Timer from "./components/Timer";
import User from "./components/User";

function App() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [timeOut, setTimeOut] = useState(false);
  const [earned, setEarned] = useState(0);
  const [username, setUsername] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const data = [
    {
      id: 1,
      question: "Rolex is a company that specializes in what type of product?",
      answers: [
        {
          text: "Phone",
          correct: false,
        },
        {
          text: "Watches",
          correct: true,
        },
        {
          text: "Food",
          correct: false,
        },
        {
          text: "Cosmetic",
          correct: false,
        },
      ],
    },
    {
      id: 2,
      question: "When did the website `Facebook` launch?",
      answers: [
        {
          text: "2004",
          correct: true,
        },
        {
          text: "2005",
          correct: false,
        },
        {
          text: "2006",
          correct: false,
        },
        {
          text: "2007",
          correct: false,
        },
      ],
    },
    {
      id: 3,
      question: "Who played the character of harry potter in movie?",
      answers: [
        {
          text: "Johnny Deep",
          correct: false,
        },
        {
          text: "Leonardo Di Caprio",
          correct: false,
        },
        {
          text: "Denzel Washington",
          correct: false,
        },
        {
          text: "Daniel Red Cliff",
          correct: true,
        },
      ],
    },
  ];

  const moneyList = useMemo(
    () =>
      [
        { id: 1, amount: 100 },
        { id: 2, amount: 200 },
        { id: 3, amount: 300 },
        { id: 4, amount: 400 },
        { id: 5, amount: 500 },
        { id: 6, amount: 600 },
        { id: 7, amount: 700 },
        { id: 8, amount: 800 },
        { id: 9, amount: 900 },
        { id: 10, amount: 1000 },
      ].reverse(),
    []
  );

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(
        moneyList.find((elem) => elem.id === questionNumber - 1).amount
      );
  }, [moneyList, questionNumber]);

  return (
    <div className="App">
      {username ? (
        <>
          <div className="main">
            {timeOut ? (
              <h1 className="endText">You earned: $ {earned}</h1>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer
                      questionNumber={questionNumber}
                      setTimeOut={setTimeOut}
                      selectedAnswer={selectedAnswer}
                    />
                  </div>
                </div>
                <div className="bottom">
                  <Trivia
                    data={data}
                    setTimeOut={setTimeOut}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                    selectedAnswer={selectedAnswer}
                    setSelectedAnswer={setSelectedAnswer}
                  />
                </div>
              </>
            )}
          </div>
          <div className="pyramid">
            <ul className="moneyList">
              {moneyList.map((elem) => (
                <li
                  className={
                    questionNumber === elem.id
                      ? "moneyListItem active"
                      : "moneyListItem"
                  }
                  key={elem.id}
                >
                  <span className="moneyListItemNumber">{elem.id}</span>
                  <span className="moneyListItemAmount">$ {elem.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <User setUsername={setUsername} />
      )}
    </div>
  );
}

export default App;
