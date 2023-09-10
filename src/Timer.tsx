import { useState, useEffect } from "preact/hooks";

export default function Timer() {
  const [seconds, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState<undefined | number>(undefined);

  useEffect(() => {
    if (intervalId !== null) {
      clearInterval(intervalId); // Clear the previous interval
    }

    const newIntervalId = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    setIntervalId(newIntervalId); // Store the new interval ID
  }, []);

  function resetTime() {
    clearInterval(intervalId); // Clear the current interval
    setTime(0);
    const newIntervalId = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    setIntervalId(newIntervalId); // Store the new interval ID
    console.log(newIntervalId);
  }

  return (
    <>
      <button onClick={resetTime}>Reset Time</button>
      <div>Time: {seconds}</div>
    </>
  );
}
