import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState("8");
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  // useRef hook
  const passwdRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&**(){}[]_~";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  // here ref hook used for copying
  const copyToClipboard = useCallback(() => {
    passwdRef.current?.select();

    //below code used to select certain range to copy
    // passwdRef.current?.setSelectionRange(0, 6);

    window.navigator.clipboard.writeText(password);
  }, [password]);

  const generatePassword = () => {
    passwordGenerator();
  };

  // if we remove button to generate paaswd then we have to use below code and comment out above just code
  // useEffect(
  //   () => passwordGenerator(),
  //   [length, numAllowed, charAllowed, passwordGenerator]
  // );

  return (
    <div className="w-full max-w-md mx-auto mt-28 shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-2xl text-center mb-6  my-3">
        Paasword Generator
      </h1>
      <div className="flex shadow  rounded-lg overflow-hidden mb-4 gap-3">
        <input
          className="outline-none  rounded-lg w-full py-1 px-3"
          type="text"
          value={password}
          placeholder="Password"
          readOnly
          ref={passwdRef}
        />
        <button
          className="outline-none rounded-lg bg-orange-600  text-white px-3 py-0.5 shrink-0 hover:scale-105"
          onClick={generatePassword}
        >
          Generate
        </button>
        <button
          className="outline-none rounded-lg bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:scale-105"
          onClick={copyToClipboard}
        >
          Copy
        </button>
      </div>
      <div className="flex text-base gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            className="cursor-pointer"
            type="range"
            value={length}
            min={6}
            max={40}
            onChange={(e) => setLength(e.target.value)}
          />
          <label className=" mr-6">Length:{length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numAllowed}
            onChange={() => {
              setNumAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
