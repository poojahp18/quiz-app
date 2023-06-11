import { useEffect, useState, useRef } from "react";

export default function Timer({ questionNumber, setTimeOut, selectedAnswer }) {
  const [timer, setTimer] = useState(30);
  const interval = useRef(null);

  useEffect(() => {
    if (timer === 0) return setTimeOut(true);
    if (!selectedAnswer) {
      interval.current = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, [timer, setTimeOut, selectedAnswer]);

  useEffect(() => {
    setTimer(30);
  }, [questionNumber]);
  return timer;
}
