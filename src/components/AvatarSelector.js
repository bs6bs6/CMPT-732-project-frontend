import React, { useState } from 'react';
import biden from '../assets/svg/joe-biden.svg';
import trump from '../assets/svg/trump.svg';
import Button from '@mui/material/Button';
import Switch, { SwitchProps } from '@mui/material/Switch';

function AvatarSelector({ onAvatarSelect , onCompeteClick, onChecked}) {
    const [selectedAvatar, setSelectedAvatar] = useState('');
    const [isChecked, setChecked] = useState(false);

    const handleChecked = (isChecked) => {
        setChecked(!isChecked);
        onChecked(!isChecked);
    }

    const handleAvatarClick = (avatarType) => {
        setSelectedAvatar(avatarType);
        onAvatarSelect(avatarType); 
    };

    const getAvatarStyle = (avatarType) => ({
        width: 100,
        height: 100,
        borderRadius: '50%',
        cursor: 'pointer',
        border: selectedAvatar === avatarType ? '3px solid #007bff' : 'none',
    });

    return (
        <div style={{
                    position: 'absolute',
                    top: '20%', 
                    left: '50%',
                    transform: 'translate(-50%, -50%)', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    gap: '20px', 
                    zIndex: 1001 
        }}>
            <img 
                src={biden}
                alt="Joe Biden Avatar"
                style={getAvatarStyle('biden')}
                onClick={() => handleAvatarClick('biden')} 
            />
            <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center', // Center items horizontally in the flex container
                        justifyContent: 'center', // Center items vertically in the flex container
            }}>
            <Button variant="contained" onClick = {onCompeteClick} color="primary" style={{ borderRadius: '20px' }} >
             compete
            </Button>
             <Switch checked={isChecked} onChange={()=>handleChecked(isChecked)}>
                check
            </Switch>
            </div>
            <img 
                src={trump}
                alt="Donald Trump Avatar"
                style={getAvatarStyle('trump')}
                onClick={() => handleAvatarClick('trump')} 
            />
        </div>
    );
}

export default AvatarSelector;
