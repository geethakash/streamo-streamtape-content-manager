import logo from './logo.svg';
import './App.css';
import SideBar from './components/SideBar';
import { Routes, Route, HashRouter as Router } from 'react-router-dom';
import VideoListPage from './pages/VideoListPage';
import UserProfile from './pages/UserProfile';
import { useState } from 'react';
import { ArrowRight2, Moon, Sun1 } from 'iconsax-react';
import UnderDev from './pages/UnderDev';

function App() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  return (
    <div className={darkMode ? 'dark' : ''}>
      <Router>
        <SideBar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute right-0 m-3 p-1 border-2 rounded-lg shadow-md hover:shadow-xl hover:text-purple-500 hover:border-purple-500 text-gray-700 border-gray-600 focus:animate-vote"
        >
          {darkMode ? <Moon /> : <Sun1 />}
        </button>

        <div
          className={`w-100 h-screen bg-slate-200 dark:bg-[#0f172a] overflow-auto  ${
            isSideBarOpen ? 'pl-14' : ''
          }`}
        >
          <Routes>
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/" element={<VideoListPage />} />
            <Route path="/folder/:id" element={<VideoListPage />} />
            <Route path="/starred" element={<UnderDev />} />
            <Route path="/upload" element={<UnderDev />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
