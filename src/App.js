import { useEffect, useRef, useState } from 'react';
import './App.css';


function App() {
  
  const [time,setTime] = useState(0);
  const [running,setRunning] = useState(false);
  let interval = useRef();

  useEffect(() => {

    if(running){
      interval.current = setInterval(() => {
        setTime(prevTime => prevTime + 1)
      },1);
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
    <h1 className='text-3xl font-semibold pb-2 '>01-Stopwatch</h1>
    <div className='flex space-x-1 font-semibold py-4'>
      <span className='text-base'>{('0' + Math.floor((time / 60000) % 60)).slice(-2)} :</span>
      <span className='text-base'>{('0' + Math.floor((time / 1000) % 60)).slice(-2)} :</span>
      <span className='text-base'>{('00' + Math.floor((time) % 1000)).slice(-3)}</span>
    </div>
     
    <div className='w-1/5 flex flex-row justify-center'>
      {
        running 
        ?   <button className='border rounded-lg text-xl  py-2 px-10 mx-8' 
              onClick={() => setRunning(false)}>
              Stop
            </button>
        :   <button className='border rounded-lg text-xl  py-2 px-10 mx-8 '
              onClick={() => setRunning(true)}>
              Start
              </button>
      }
      <button className='border rounded-lg text-xl  py-2 px-10 mx-8'
        onClick={() => handleReset()}>
        Reset
      </button>
    </div>
    </div>
  );
}

export default App;
