import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setUserId } from '../redux/result_reducer'
import io from "socket.io-client";
import '../styles/Main.css'

const socket = io.connect(`${process.env.REACT_APP_SERVER_HOSTNAME}`);

export default function Main() {

  const inputRef = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  function addParticipants() {
    socket.emit('addClient', inputRef.current?.value);
    if(inputRef.current?.value) {
      dispatch(setUserId(inputRef.current?.value))
    }
  }

  useEffect(() => {
      socket.on('startQuiz', function() {
        navigate("/quiz")
      });
    }, [socket])

  return (
    <div className='container'>
      <h1 className='title add-border text-light'>Quiz Application</h1>
      <ol>
        <li>You will be asked 5 questions one after another.</li>
        <li>10 points is awarded for the correct answer.</li>
        <li>Each question has three options. You can choose only one options.</li>
        <li>Every question has a timer set for 5 seconds. After which your attempt is autosubmitted</li>
        <li>The result will be declared at the end of the quiz.</li>
      </ol>
      <form id="form">
        <input ref={inputRef} className="userid" type="text" placeholder='Username*' />
      </form>
      <div className='start'>
        <Link className='btn' to={"wait"} onClick={addParticipants} >Start Quiz</Link>
      </div>
    </div>
  )
}
