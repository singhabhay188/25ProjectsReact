import { useState } from 'react'
import data from './data.js'

function App() {
  const [selected, setSelected] = useState(null);
  const [multipleSelection, setMultipleSelection] = useState(false);
  const [multipleSelected, setMultipleSelected] = useState([]);

  function handleClick(index) {
    if (multipleSelection) {
      if (multipleSelected.includes(index)) {
        setMultipleSelected(multipleSelected.filter((item) => item != index));
      }
      else setMultipleSelected([...multipleSelected, index]);
    }
    else {
      setSelected(selected === index ? null : index);
    }
  }

  function isOpen(index) {
    return (!multipleSelection && selected === index) || (multipleSelection && multipleSelected.includes(index));
  }

  function handleButtonClick() {
    setMultipleSelection(!multipleSelection);
    setSelected(null);
    setMultipleSelected([]);
  }

  return (
    <div className='p-2 my-16 text-white flex flex-col gap-4 items-center'>
      <h1 className="text-3xl lg:text-6xl font-bold">Accordian</h1>

      <button onClick={handleButtonClick} className='bg-red-500 p-2 rounded-lg'>{multipleSelection ? 'Disable' : 'Enable'} Multiple Selection</button>

      {data.map((item, index) => {
        return (
          <div key={index} className="border-[1px] border-gray-600 w-full">
            <div className="w-full flex items-center justify-between cursor-pointer p-2" onClick={() =>  handleClick(index) }>
              <h5>{item.question}</h5>
              <i className={`ri-arrow-up-s-line ${isOpen(index) ? '' : 'rotate-180'}`}></i>
            </div>
            <div className={`px-2 overflow-hidden transition-all duration-300 ${isOpen(index) ? 'h-max py-2' : 'h-0'}`}>
              <p>{item.answer}</p>
            </div>
          </div>
        );
      })}

    </div>
  )
}

export default App
