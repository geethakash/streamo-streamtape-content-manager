import './App.css';
import 'plyr-react/dist/plyr.css';
import SideBar from './components/SideBar';
import { Routes, Route, HashRouter as Router } from 'react-router-dom';
import VideoListPage from './pages/VideoListPage';
import UserProfile from './pages/UserProfile';
import { useState, useEffect } from 'react';
import { ArrowDown, ArrowRight2, Moon, Sun1 } from 'iconsax-react';
import UnderDev from './pages/UnderDev';
import VideoPlayerPage from './pages/VideoPlayerPage';
import UploadPage from './pages/UploadPage';
import WarningPage from './pages/WarningPage';

let deferredPrompt;

function App() {
  const [installable, setInstallable] = useState(false);

  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI notify the user they can install the PWA
      setInstallable(true);
    });

    window.addEventListener('appinstalled', () => {
      // Log install to analytics
      console.log('INSTALL: Success');
    });
  }, []);

  const handleInstallClick = (e) => {
    // Hide the app provided install promotion
    setInstallable(false);
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
    });
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Router>
        <SideBar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
        <div className="absolute top-0 right-0 m-3 flex gap-x-2">
          <button
            onClick={handleInstallClick}
            className="focus:animate-vote rounded-lg border-2 border-gray-600 p-1 text-gray-700 shadow-md hover:border-purple-500 hover:text-purple-500 hover:shadow-xl"
          >
            <ArrowDown />
          </button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="focus:animate-vote rounded-lg border-2 border-gray-600 p-1 text-gray-700 shadow-md hover:border-purple-500 hover:text-purple-500 hover:shadow-xl"
          >
            {darkMode ? <Moon /> : <Sun1 />}
          </button>
        </div>

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
