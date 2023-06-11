import { useEffect, useState } from "react";
import "./Trivia.css";
import useSound from "use-sound";
import correct from "../../sounds/correct.mp3";
import wrong from "../../sounds/wrong.mp3";

import play from "../../sounds/play.mp3";

export default function Trivia({
  data,
  setTimeOut,
  questionNumber,
  setQuestionNumber,
  selectedAnswer,
  setSelectedAnswer,
}) {
  const [question, setQuestion] = useState(null);
  const [className, setClassName] = useState("option");

  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);

  useEffect(() => {
    letsPlay();
  }, [letsPlay]);

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (ans) => {
    if (selectedAnswer) return;
    setSelectedAnswer(ans);
    setClassName("option active");

    delay(2000, () => {
      setClassName(ans.correct ? "option correct" : "option wrong");
    });
    delay(3000, () => {
      if (ans.correct) {
        setTimeOut(false);
        correctAnswer();
        delay(2000, () => {
          setQuestionNumber((prev) => prev + 1);
          setSelectedAnswer(null);
        });
      } else {
        wrongAnswer();
        delay(2000, () => {
          setTimeOut(true);
          setSelectedAnswer(null);
        });
      }
    });
  };

  return (
    <div className="trivia">
      <div className="question">{question?.question}</div>
      <div className="options">
        {question?.answers.map((answer) => (
          <div
            className={
              selectedAnswer?.text === answer.text ? className : "option"
            }
            onClick={() => handleClick(answer)}
          >
            {answer.text}
          </div>
        ))}
      </div>
    </div>
  );
}
