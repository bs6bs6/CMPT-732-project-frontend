import React, { useRef,useEffect, useState } from "react";
import AvatarSelector from './AvatarSelector';

export default function DailyReport() {

    const handleAvatarSelection = (avatar) => {
        console.log("选中的头像是: ", avatar);
        // 这里您可以处理选中头像后的逻辑
    };

    return (
        <div>
            <AvatarSelector onAvatarSelect={handleAvatarSelection}/>
        </div>
    )
}