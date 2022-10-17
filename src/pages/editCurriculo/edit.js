import React, { useState } from 'react';
import '../editCurriculo/styleEdit.css'
import Header from '../../Components/header/header';
import { ImFileText2, ImPencil } from 'react-icons/im'
import { BiTrash } from 'react-icons/bi'
import { Link } from 'react-router-dom';

export default function EditCurriculo() {
  const [emptyCurri, setEmptyCurri] = useState([1]);
  return (
    <div>
      <Header />
      <div className='main-edit'>
        {emptyCurri.length === 0 ? (<section className='container-edit'>

          <label id="title-edit">Meus currículos <hr /></label>
          <div className='card-curriculo-empty'>

            <span >
              Nenhum currículo salvo
              {/* <Link > <ImFileText2 color='#fff' size={45} id='link-style'/></Link> */}
            </span>

          </div>
        </section>) : (<section className='container-edit'>

          <label id="title-edit">Meus currículos <hr /></label>

          <div className='card-curriculo-save'>

            <span>
              <Link > <ImFileText2 color='#fff' size={45} id='link-style' /></Link>
            </span>
            <span>
              <Link > <ImPencil color='#fff' size={35} id='link-style' /></Link>

              <Link > <BiTrash color='#fff' size={37} id='link-style' /></Link>
            </span>
          </div>
   
        </section>)}

      </div>
    </div>
  );
}