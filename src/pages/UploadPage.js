import React from 'react';

function UploadPage() {
  return (
    <div className="font-white flex h-full w-full flex-row px-5  xl:pr-20">
      <div className="item flex w-1/2 flex-col justify-center">
        <h1 className="pt-4 text-3xl font-extrabold text-gray-300">Upload</h1>
      </div>
      <div className="item flex w-1/2 flex-col  justify-center">
        <h1 className="pt-4 text-3xl font-extrabold text-gray-300">
          Remote upload
        </h1>
        <form className="mt-5 flex w-full flex-row text-xl">
          <input
            className="h-14 w-3/4 rounded border-2 border-slate-500 bg-transparent px-2  text-slate-300 outline-none focus:ring focus:ring-purple-600"
            placeholder="Paste file url here..."
            type="text"
          />
          <input
            type="submit"
            className="mx-3  h-14 rounded bg-purple-600 px-6 text-slate-300 ring-purple-500 hover:bg-purple-800 focus:ring"
            value="upload"
          />
        </form>
      </div>
    </div>
  );
}

export default UploadPage;
