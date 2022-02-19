import logo from './logo.svg';
import './App.css';
import SideBar from './components/SideBar';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import VideoListPage from './pages/VideoListPage';
import UserProfile from './pages/UserProfile';
import { useState } from 'react';
import { ArrowRight2 } from 'iconsax-react';
import UnderDev from './pages/UnderDev';

function App() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  return (
    <div className="">
      <BrowserRouter>
        <SideBar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />

        <div
          className={`w-100 h-screen bg-gray-900 ${
            isSideBarOpen ? 'pl-14' : ''
          }`}
        >
          <Routes>
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/" element={<VideoListPage />} />
            <Route path="/starred" element={<UnderDev />} />
            <Route path="/upload" element={<UnderDev />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
