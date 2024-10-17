import React from "react";
import BkDog from "/src/Images/BkDog.png";
import dogpaw from "/src/Images/dogpaw.png";
import {CustomWalletMultiButton} from "./connection"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import WalletContextProvider from "./connection";
import * as connection from "./connection";



const PinkDiv: React.FC = () => {
    return (
        <div className="bg-pink-400 align-center">
            <div className=" flex flex-row justify-center h-20 w-full mt-5">
                <img src={BkDog} alt="dog" className="w-[100px] h-30" />
                <p style={{fontSize: "40px", fontStyle: "oblique", fontWeight: "bolder", fontFamily: "cursive"}} className="text-black italic text-bold mt-5">BUDDY</p>
                <img src={dogpaw} alt="paw" style={{height: "80px", width: "80px"}} className="ml-5 mt-3"/>
            </div>
            <div>
                <nav className="flex flex-row justify-center h-22 w-full">
                    
                    <div className="item-center grid grid-cols-5 space-x-6 p-10">

                        <button style={{fontSize:"30px"}} className="text-black hover:text-white"> <WalletContextProvider><CustomWalletMultiButton /></WalletContextProvider></button>
                        <a href='' style={{fontSize:"30px"}} className="text-black hover:text-white">About</a>
                        <a href="" style={{fontSize:"30px"}} className="text-black hover:text-white">Services</a>
                        <a href='' style={{fontSize:"30px"}} className="text-black hover:text-white">Contact</a>
                        <a href="" style={{fontSize:"30px"}} className="text-black hover:text-white">Connect</a>
                    </div>

                </nav>

            </div>
        
        
        </div>
            
        
        
        
        

    );
};
export default PinkDiv;