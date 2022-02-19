import Folder from '../components/Folder';
import React from 'react';
import Spinner from '../components/Spinner';
import Video from '../components/Video';

function VideoListPage() {
  return (
    <div className="text-3xl font-white pl-5">
      <h1 className="text-3xl pt-4 text-gray-300 font-extrabold">Video List</h1>
      <div className="folder-section">
        <div className="folder-title">
          <span className="pl-2 mb-10">Folders</span>
        </div>
        <div className="folder-container">
          <Folder folderName={'Annual Trip'} />
          <Folder folderName={'Memories'} />
          <Folder folderName={'Videos'} />
          <Folder folderName={'Family Trip'} />
          <Folder folderName={'Pets'} />
          <Folder folderName={'Projects'} />
          <Folder />
        </div>
      </div>

      <div className="folder-section">
        <div className="folder-title">
          <span className="pl-2 mb-10">Videos</span>
        </div>
        <div className="folder-container">
          <Video videoTitle={'Annual Trip'} />
          <Video videoTitle={'Memories'} />
          <Video videoTitle={'Videos'} />
          <Video videoTitle={'Family Trip'} />
          <Video videoTitle={'Pets'} />
          <Video videoTitle={'Projects'} />
          <Video />
        </div>
      </div>
    </div>
  );
}

export default VideoListPage;
