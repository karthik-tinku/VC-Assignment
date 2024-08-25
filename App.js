import React, { useState, useEffect } from 'react';
import './App.css';

const initialTranscript = [
  { word: 'Hello', start_time: 0, duration: 500 },
  { word: 'world', start_time: 500, duration: 700 },
  { word: 'This', start_time: 1200, duration: 300 },
  { word: 'is', start_time: 1500, duration: 200 },
  { word: 'a', start_time: 1700, duration: 100 },
  { word: 'test', start_time: 1800, duration: 400 },
  { word: 'transcript', start_time: 2200, duration: 600 },
  { word: 'for', start_time: 2800, duration: 200 },
  { word: 'playback', start_time: 3000, duration: 500 },
  { word: 'and', start_time: 3500, duration: 250 },
  { word: 'editing', start_time: 3750, duration: 800 },
  { word: 'features.', start_time: 4550, duration: 650 },
];

function TranscriptEditor({ initialTranscript }) {
  const [transcript, setTranscript] = useState(initialTranscript);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isPlaying) {
      if (currentIndex < transcript.length) {
        const { start_time, duration } = transcript[currentIndex];
        const timer = setTimeout(() => {
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }, start_time + duration);

        return () => clearTimeout(timer);
      } else {
        setIsPlaying(false);
        setCurrentIndex(0);
      }
    }
  }, [isPlaying, currentIndex, transcript]);

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const handleEdit = (index, newText) => {
    const newTranscript = [...transcript];
    newTranscript[index].word = newText;
    setTranscript(newTranscript);
  };

  return (
    <div className="transcript-editor">
      <button className="play-button" onClick={handlePlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <div className="transcript">
        {transcript.map((item, index) => (
          <span
            key={index}
            className={`transcript-word ${index === currentIndex ? 'highlight' : ''}`}
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleEdit(index, e.target.innerText)}
          >
            {item.word}{' '}
          </span>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <TranscriptEditor initialTranscript={initialTranscript} />
      <br></br>
      <br></br>
      <h1>This is Project done by Karthik Thokala</h1>
    </div>
  );
}

export default App;
