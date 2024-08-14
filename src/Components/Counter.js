import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const updateCount = (value) => {
    const newCount = count + value;
    if (newCount >= 0 && newCount <= 150) {
      const updatedHistory = [...history.slice(0, currentIndex + 1), newCount];
      setHistory(updatedHistory);
      setCurrentIndex(updatedHistory.length - 1);
      setCount(newCount);
    }
  };

  const undo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCount(history[currentIndex - 1]);
    }
  };

  const redo = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCount(history[currentIndex + 1]);
    }
  };

  const progressBarStyle = {
    width: `${(count / 150) * 100}%`,
    height: '30px',
    backgroundColor: '#4caf50',
    transition: 'width 0.3s ease',
  };

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={() => updateCount(-1)}>-1</button>
      <button onClick={() => updateCount(1)}>+1</button>
      <div style={{ width: '100%', backgroundColor: '#ddd', margin: '20px 0' }}>
        <div style={progressBarStyle}></div>
      </div>
      <button onClick={undo} disabled={currentIndex === 0}>
        Undo
      </button>
      <button onClick={redo} disabled={currentIndex === history.length - 1}>
        Redo
      </button>
    </div>
  );
};

export default Counter;
