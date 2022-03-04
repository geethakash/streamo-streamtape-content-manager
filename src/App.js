import './App.css';
import 'plyr-react/dist/plyr.css';
import SideBar from './components/SideBar';
import { Routes, Route, HashRouter as Router } from 'react-router-dom';
import VideoListPage from './pages/VideoListPage';
import UserProfile from './pages/UserProfile';
import { useState } from 'react';
import { ArrowRight2, Moon, Sun1 } from 'iconsax-react';
import UnderDev from './pages/UnderDev';
import VideoPlayerPage from './pages/VideoPlayerPage';
import UploadPage from './pages/UploadPage';

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
          className="focus:animate-vote absolute right-0 m-3 rounded-lg border-2 border-gray-600 p-1 text-gray-700 shadow-md hover:border-purple-500 hover:text-purple-500 hover:shadow-xl"
        >
          {darkMode ? <Moon /> : <Sun1 />}
        </button>

        <div
          className={`w-100 h-screen overflow-auto bg-slate-200 dark:bg-[#0f172a]  ${
            isSideBarOpen ? 'pl-14' : ''
          }`}
        >
          <Routes>
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/" element={<VideoListPage />} />
            <Route path="/folder/:id" element={<VideoListPage />} />
            <Route path="/video/:id" element={<VideoPlayerPage />} />
            <Route path="/starred" element={<UnderDev />} />
            <Route path="/upload" element={<UploadPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
