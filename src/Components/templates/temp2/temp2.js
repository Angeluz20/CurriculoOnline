import React,{useRef} from 'react';
import '../temp2/temp2.css'

import { useReactToPrint } from 'react-to-print';


export default function Templete2() {

const componentRef = useRef();

const handlePrint = useReactToPrint({     
  content: () => componentRef.current,  
  documentTitle:'currículo'
});

  return (
    <div className='template2' onClick={handlePrint}  ref={componentRef}>

      <div className='design-temp2'  >
      </div>
      <div>

      </div>
      <div className='header-template-2' >

        <div className='data-user-header'>
          <div className='nome-temp2'>
            <h5>Nome do usuario</h5>
          </div>

          <div className='info-user-temp2'>
            <span><strong>Celular</strong> (00) 0 0000-0000</span>
            <span><strong>Celular</strong> (00) 0 0000-0000</span>
            <span><strong>E-mail</strong> user@gmail.com</span>
            <span><strong>Cidade</strong> Manaus-Am</span>
            <span><strong>Endereço</strong> Travessa Fantasia</span>
          </div>
        </div>
        <div className='photo-template'></div>

      </div>
      <div>

      </div>

    </div>
  );
}