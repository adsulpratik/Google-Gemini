import { useState } from 'react'
import './App.css'
import { URL } from './component/constant'

function App() {
  const [userInput, setUserInput] = useState("")
  const [result, setResult] = useState("")
  const [allquesans, setAllquesans] = useState([])

  let payload = {
    contents: [
      {
        parts: [
          {
            text: userInput
          }
        ]
      }
    ]
  }

  async function handlData() {
    let res = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    res = await res.json();
    let answerText = res.candidates[0].content.parts[0].text;
    answerText = answerText.replace(/\*(.*?)\*/g, '$1');

    setResult(answerText);
    setAllquesans([...allquesans, { question: userInput, answer: answerText }]);
    setUserInput("")
  }

  return (
    <div className='flex h-screen'>


      <div className="main w-[100%]  pl-13  bg-zinc-800 flex flex-col justify-center items-baseline h-full overflow-hidden">
        <h1 className='text-white text-3xl font-semibold my-6 mx-auto'>
          Hello User, Ask me Anything
        </h1>

        <div className='flex-1 overflow-y-auto px-10 py-4 w-full'>
          {allquesans.map((qa, index) => (
            <div key={index} className='mb-6'>
              <div className="question text-white text-xl font-semibold bg-blue-600 w-fit py-2 px-4 rounded-2xl mb-2">
                {qa.question}
              </div>
              <pre className="answer whitespace-pre-wrap text-white bg-gray-700 p-4 rounded-xl w-[95%]">
                {qa.answer}
              </pre>
            </div>
          ))}
        </div>

        <div className='w-[97%] rounded-xl px-10  py-4 bg-zinc-700'>
          <div className='flex items-center gap-4'>
            <input
              type="text"
              value={userInput}
              placeholder='Ask me Anything'
              onChange={(e) => setUserInput(e.target.value)}
              className='flex-1 text-white bg-transparent border-b-2 border-white px-3 py-2 outline-none placeholder-gray-300'
            />
            <button
              onClick={handlData}
              className='bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium cursor-pointer'
            > 
              Ask
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
