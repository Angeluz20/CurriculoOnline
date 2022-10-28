import React, { useRef, useState, useContext } from 'react';
import '../templateView1/tempView1.css'
import { AuthContext } from '../../../../contexts/auth';
import { useReactToPrint } from 'react-to-print';
import avatar from '../../../../img/avatar.png'
import { BsTelephone } from 'react-icons/bs'
import { HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi'
import { MdOutlineOtherHouses } from 'react-icons/md'
import { FaUserTie, FaUserGraduate } from 'react-icons/fa'
import { GiStairsGoal } from 'react-icons/gi'
import { IoSchoolSharp } from 'react-icons/io5'

export default function TempleteView1({ nome, contato, endereco, cidade, email, textValue, XP }) {
  const { user, signOut } = useContext(AuthContext);
  const componentRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 320, height: 420 });
  const handlePrint = useReactToPrint({
    // pageStyle:`@media print {
    //   @page {
    //     size: ${dimensions.width}px ${dimensions.height}px;
    //     margin: 0;
    //   }
    // }`,  

    content: () => componentRef.current,
    documentTitle: 'currículo'
  });

  //993547968
  return (
    <div className='template-view-1' onClick={handlePrint} ref={componentRef} >





      <div className='header-template-view-1' >
        <div className='design-temp-view-1'>
          <div >

          </div>
        </div>

        <div className='data-user-header'>
          <div className='nome-temp-view1'>
            <h5>{nome}</h5>
          </div>

          <div className='info-user-temp-view-1'>
            <span><BsTelephone color='#106561' size={10} /> <strong>Celular: </strong>{contato}</span>
            <span><HiOutlineMail color='#106561' size={10} /> <strong>E-mail: </strong>{email}</span>
            <span><MdOutlineOtherHouses color='#106561' size={10} /> <strong>Cidade: </strong> {cidade}</span>
            <span><HiOutlineLocationMarker color='#106561' size={10} /> <strong>Endereço: </strong>{endereco}</span>
          </div>
        </div>
        <div className='photo-template-view-1'>
          <div>
            <img src={user.avatarUrl === null ? avatar
              : user.avatarUrl} style={{ width: 60, height: 60, borderRadius: 20, display: 'flex', }} />
          </div>
        </div>

      </div>
    
      <div className='objective'>
        <div className='label-info'>
          <label><FaUserTie color='#106561' size={15} /> Perfil<span/></label>
         
          
      
        </div>
        <div className='text-objctive'>
              <span>{textValue}</span>
            </div>
      </div>

      <div className='objective'>
        <div className='label-info'>
          <label> <GiStairsGoal color='#106561' size={15} /> Objetivo  <span /></label>

        </div>

        <div className='text-objctive'>
          <span></span>
        </div>
      </div>

      <div className='objective'>
        <div className='label-info'>
          <label> <FaUserGraduate color='#106561' size={15} /> Formação</label>
          <span />
        </div>

        <div className='text-objctive'>
          <span> </span>
        </div>
      </div>

      <div className='objective'>
        <div className='label-info'>
          <label><IoSchoolSharp color='#106561' size={15} /> Cursos profissionalizantes</label>
          <span />
        </div>

        <div className='text-objctive'>
          <span></span>
        </div>
      </div>

      <div className='objective'>
        <div className='label-info'>
          <label>Expreriência Profissional</label>
          <span />
        </div>

        <div>
          {XP}
        </div>
      </div>



    </div>

  );
}