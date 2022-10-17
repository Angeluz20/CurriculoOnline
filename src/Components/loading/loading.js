import React from 'react';
import Lottie from 'lottie-react'
import load from './laod.json'
import loadondas from './loadondas.json'
import circle from './circle.json'
export default function Loading() {

    return (
               
              <Lottie
                animationData={circle}
                style={{width:100, height:100}}
            />
            
            
    );
}