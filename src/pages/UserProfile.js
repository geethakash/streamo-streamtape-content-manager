import React from 'react';
import Spinner from '../components/Spinner';

function UserProfile() {
  return (
    <div className="w-full h-full  flex items-center justify-center backdrop-blur">
      <div className="w-20 h-20">
        <Spinner />
      </div>
    </div>
  );
}

export default UserProfile;
