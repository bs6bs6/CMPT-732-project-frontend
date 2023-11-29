import React, {useState } from "react";
import AvatarSelector from './AvatarSelector';
import LanBarChart from "./LanBarChart"

export default function Language() {

    const handleAvatarSelection = (avatar) => {
        console.log("avatar selected: ", avatar);
    };
    
    const handleCompeteClick = () => {
        console.log("compete clicked");
    }

    return (
        <div>
            <AvatarSelector onAvatarSelect={handleAvatarSelection} onCompeteClick={handleCompeteClick}/>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <LanBarChart />
            </div>

        </div>
    )
}