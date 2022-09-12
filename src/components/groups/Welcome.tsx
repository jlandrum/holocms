const Welcome = () => {
  return (
    <div className='flex-grow flex-shrink text-teal-800 dark:text-white bg-white dark:bg-neutral-900 shadow-md flex flex-col justify-center items-center'>
      <div className='flex flex-col items-center p-4 border animate-rainbow rounded-md'>
        <span className='font-bold'>Welcome to HoloCMS</span>
        <span className='text-xs'>The stand-alone CMS editor</span>
      </div>
      <span className="m-4 text-xs">To begin, create a new platform.</span>
    </div>
  )
}

export default Welcome;