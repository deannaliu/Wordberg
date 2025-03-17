import React, { useState } from 'react';

const NameInput = ({ defaultName, onSubmit, onGenerateNew }) => {
  const [name, setName] = useState(defaultName);

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded"
        placeholder="Enter your name"
      />
      <div className="flex gap-2">
        <button
          onClick={() => setName(onGenerateNew())}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          Generate Random Name
        </button>
        <button
          onClick={() => onSubmit(name)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default NameInput;