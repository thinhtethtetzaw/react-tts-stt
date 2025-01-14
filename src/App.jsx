import React, { useState } from "react";

const App = () => {
  const textToSpeak = "Hello Berry, welcome to the text-to-speech testing!";
  const [speaking, setSpeaking] = useState(false);

  const speak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.voice = window.speechSynthesis.getVoices()
        .find(voice => voice.name === 'Google UK English Female') || null;
      
      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech not supported in this browser.');
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Web Speech API Text-to-Speech Demo</h1>
      <p>Click the button below to hear the text:</p>
      
      <button 
        onClick={speak}
        disabled={speaking}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: speaking ? 'not-allowed' : 'pointer'
        }}
      >
        {speaking ? 'Speaking...' : 'Speak'}
      </button>
      
      <p style={{ marginTop: "20px" }}>
        Text to speak: <strong>{textToSpeak}</strong>
      </p>
    </div>
  );
};

export default App;
