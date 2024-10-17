import React from "react";
import puppy from "/src/Images/puppy.jpg";

const PUPPY: React.FC = () => {
    return (
            <div className="h-42 w-full flex justify-center items-center">
                <img src={puppy} alt="puppy" style={{height: "30%", width: "100%"}}/>

            </div>
    );
};
export default PUPPY;

