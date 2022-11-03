import React from 'react';
import '../tabProfile/tabProfile.css'

export default function TabProfile({textProfileValue, onChangeProfile}) {
    return (

        <div className='profile'>
            <label>Perfil</label>
            <textarea value={textProfileValue} onChange={onChangeProfile}
                className='txtarea'
                cols="35"
                rows="8"
                placeholder='Descreva um sobre você profissionalmente'>
            </textarea>
        </div>

    );
}