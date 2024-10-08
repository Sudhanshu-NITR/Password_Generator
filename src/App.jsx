import { useCallback, useEffect, useState, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() =>{
    let pass= "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numAllowed) str+= "0123456789";
    if(charAllowed) str+= "!@#$%^&*/.,;:()[]{}";

    for (let i = 1; i <= length; i++) {
      let charIndex = Math.floor(Math.random()*(str.length) +1);
      pass += str[charIndex];
    }

    setPassword(pass);

  }, [length, numAllowed, charAllowed, setPassword]);

  const copyToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.setSelectionRange(0, 101);
    window.navigator.clipboard.writeText(password);
  },[password])

  useEffect(()=>{
    passwordGenerator();
  }, [length, numAllowed, charAllowed, setPassword]);

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 py-4 bg-gray-700 text-orange-500 text-center'>
        <h1 className='text-2xl text-white text-center mb-4'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text"
           value={password}
           className='outline-none w-full py-1 px-3'
           placeholder='Password'
           readOnly
           ref={passwordRef}
          />
          <button
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          onClick={copyToClipboard}
          >copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
             min={6}
             max={100}
             value={length}
             className='cursor-pointer '
             onChange={(e)=>{
              setLength(e.target.value)
             }}
            />
            <label className='text-sm'>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
              <input 
              type="checkbox" 
              defaultChecked={numAllowed}
              id='numberInput'
              onChange={() =>{
                setNumAllowed((prev)=> !prev)
              }}
              className='outline-none'
              />
              <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
              <input 
              type="checkbox" 
              defaultChecked={charAllowed}
              id='characterInput'
              onChange={() =>{
                setCharAllowed((prev)=> !prev)
              }}
              className='outline-none'
              />
              <label htmlFor="numberInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App