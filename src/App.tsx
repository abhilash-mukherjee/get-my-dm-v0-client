import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import {BASE_URL} from './helper'

function App() {
  const [textState, setTextState] = useState('');
  async function init(){
    const response = await axios.get(`${BASE_URL}/`);
    setTextState(response.data.message);
    
  }
  useEffect(()=>{
    init()
  });
  return(
    <>
      <div>
        <div>{textState}</div>
      </div>
    </>
  )
}

export default App
