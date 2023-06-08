import { useEffect, useState } from "react";

export default function Timer({ questionNumber, setTimeOut }) {
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    if (timer === 0) return setTimeOut(true);
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, setTimeOut]);

  useEffect(() => {
    setTimer(10);
  }, [questionNumber]);
  return timer;
}
