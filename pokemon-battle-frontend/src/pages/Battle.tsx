import React from "react";

const Battle: React.FC = () => {

    return (
        <div className="min-h-screen flex flex-col justify-center items-center text-white">

      <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-400 
               text-center mb-20 
               drop-shadow-[2px_2px_0_#000] 
               tracking-tight
               md:tracking-wider
               uppercase
              ">
  Pokémon Battle
</h1>

      
      <div className="flex flex-col md:flex-row md:justify-between w-full px-4 md:px-16 text-black">
        <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
                <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes" />
            </figure>
        <div className="card-body">
            <h2 className="card-title">
                Title
        <div className="badge badge-secondary">Type</div>
            </h2>
            <p>description</p>
        <div className="card-actions justify-end">
        <div className="badge badge-outline">Fire</div>
        <div className="badge badge-outline">Water</div>
        </div>
        </div>
        </div>
        <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
                <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes" />
            </figure>
        <div className="card-body">
            <h2 className="card-title">
                Title
        <div className="badge badge-secondary">Type</div>
            </h2>
            <p>description</p>
        <div className="card-actions justify-end">
        <div className="badge badge-outline">Fire</div>
        <div className="badge badge-outline">Water</div>
        </div>
        </div>
        </div>
      </div>
      <div className="mt-10 text-black">
        <button className="
  bg-red-400 
  hover:bg-red-300 
  active:bg-red-500 
  text-black 
  font-bold 
  rounded-full 
  px-6 py-3 
  shadow-lg 
  hover:shadow-xl 
  transition-all 
  duration-200
">
  Fight!
</button>

      </div>
    </div>
  );
};

export default Battle;
