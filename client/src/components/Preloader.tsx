import React from "react";
import Lottie from "lottie-react";
import tractorAnimation from "../assets/Preloader/Tractor.json";

const Preloader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 flex items-center justify-center">
        <Lottie 
          animationData={tractorAnimation}
          loop
          autoplay
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
};

export default Preloader;
