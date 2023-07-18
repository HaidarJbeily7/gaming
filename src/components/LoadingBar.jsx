// components/LoadingBar.js

import React from 'react';

const LoadingBar = ({ title, progress, color }) => {
  return (
    <div className='flex flex-row-reverse justify-between w-full gap-4'>
      <div className='w-[10%]' >{title}</div>
      <div className='relative h-5 w-full border bg-white border-white rounded-full overflow-hidden'>
        <div style={{ width: `${progress}%`, backgroundColor: color }} className='h-full absolute right-0' />
      </div>
      <div className='ml-2'>{`${progress}%`}</div>
    </div>
  );
};

export default LoadingBar;
