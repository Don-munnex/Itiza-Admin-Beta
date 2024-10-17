import React from "react";
import BkDog from "/src/Images/BkDog.png";
import dogpaw from "/src/Images/dogpaw.png";
import {CustomWalletMultiButton} from "./connection"



const PinkDiv: React.FC = () => {
    return (
        <div className="bg-pink-400 align-center">
            <div className=" flex flex-row justify-center h-20 w-full mt-5">
                <img src={BkDog} alt="dog" className="w-[100px] h-30 " />
                <p style={{fontSize: "40px", fontStyle: "oblique", fontWeight: "bolder", fontFamily: "cursive"}} className="text-black italic text-bold mt-5">BUDDY</p>
                <img src={dogpaw} alt="paw" style={{height: "80px", width: "80px"}} className="ml-5 mt-3"/>
            </div>
            <div>
                <nav className="flex flex-row justify-center h-22 w-full">
                    
                    <div className="item-center justify-between space-x-6 p-10">

                        <CustomWalletMultiButton />
                        <a href='' className="text-black hover:text-white font-bold">Home</a>
                        <a href="" className="text-black hover:text-white font-bold">About</a>
                        <a href='' className="text-black hover:text-white font-bold">Services</a>
                        <a href="" className="text-black hover:text-white font-bold">Contact</a>
                    </div>

                </nav>

            </div>
        
        
        </div>
            
    );
};
export default PinkDiv;