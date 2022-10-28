import React from 'react';
import '../../Components/titlePages/titlePage.css'
export default function titlePages({title}) {
    return (
        <div className='title-page'>
            <h1>{title}</h1>
            <hr />
        </div>
    );
}