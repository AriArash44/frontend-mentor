"use client";

export default function Error({ error, reset }) {
    const handleReset = () => {
        reset();
        window.location.reload();
    };
    return (
      <div>
        <h1>Something went wrong!</h1>
        <p className="mt-5 text-grey-500">the occured error is: {error.message}</p>
        <button className="bg-orange-500 w-full hover:bg-white hover:text-grey-950 
        rounded-lg mt-3 py-1 cursor-pointer" onClick={handleReset} type="reset">Try again</button>
      </div>
    );
}