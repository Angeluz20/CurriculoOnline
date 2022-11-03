import React from 'react';
import '../tabObjective/tabObjective.css'
export default function TabObjective({textObectiveValue, onChangeObjective}) {
    return (
        <div className='objective-tab' >
            <label>Objetivo</label>
            <textarea value={textObectiveValue} onChange={onChangeObjective}
                className='txtarea'
                cols="35"
                rows="8"
                placeholder='Escreva sobre seus objetivos na carreira e na empresa'>
            </textarea>
        </div>

    );
}