import { useEffect, useRef, useState } from 'react';
import './App.css';


function App() {
  
  const [time,setTime] = useState(0);
  const [running,setRunning] = useState(false);
  let interval = useRef();

  useEffect(() => {

    if(running){
      interval.current = setInterval(() => {
        setTime(prevTime => prevTime + 10)
      },10);
    }else if(!running){
      clearInterval(interval.current);
    }

    return () => {
      clearInterval(interval.current);
    }

  },[running]);
  
  const handleReset = () => {
    setRunning(false);
    clearInterval(interval);
    setTime(0);
  }

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center py-8'>
    <h1 className='text-2xl font-semibold pb-2 '>01-Stopwatch</h1>
    <div className='flex space-x-1 font-semibold py-4'>
      <span>{('0' + Math.floor((time / 60000) % 60)).slice(-2)} :</span>
      <span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)} :</span>
      <span>{('0' + Math.floor((time / 10) % 100)).slice(-2)}</span>
    </div>
     
    <div className='w-1/5 flex flex-row justify-between'>
      {
        running 
        ?   <button className='border rounded-lg  py-2 px-10 ' 
              onClick={() => setRunning(false)}>
              Stop
            </button>
        :   <button className='border rounded-lg  py-2 px-10 '
              onClick={() => setRunning(true)}>
              Start
              </button>
      }
      <button className='border rounded-lg  py-2 px-10 '
        onClick={() => handleReset()}>
        Reset
      </button>
    </div>
    </div>
  );
}

export default App;
