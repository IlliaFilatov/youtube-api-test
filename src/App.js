import React from 'react';
import './App.scss';
import Auth from './components/auth';
import { useSelector } from 'react-redux';
import VideoList from './components/videoList';


function App() {
  
  return (
    <div className="App">
      <Auth />
      <VideoList />
    </div>
  );
}

export default App;
