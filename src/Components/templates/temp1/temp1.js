import React, { useRef, useState, useContext } from 'react';
import '../temp1/temp1.css'
import { AuthContext } from '../../../contexts/auth';
import { useReactToPrint } from 'react-to-print';
import avatar from '../../../img/avatar.png'

import { BsTelephone, BsFillGearFill } from 'react-icons/bs'
import { HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi'
import { MdOutlineOtherHouses } from 'react-icons/md'
import { FaUserTie, FaUserGraduate  } from 'react-icons/fa'
import { GiStairsGoal, GiDoorRingHandle } from 'react-icons/gi'
import { IoSchoolSharp } from 'react-icons/io5'

export default function Templete1({ 
  nome, 
  contato, 
  endereco, 
  cidade, 
  email, 
  textValue, 
  XP, 
  textProfile, 
  Formation, 
  Cursos 
}) {
  const { user } = useContext(AuthContext);
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

  return (
    <div className='template-1' >





      <div className='header-template-1' >
        <div className='design-temp-1'>
          <div >

          </div>
        </div>

        <div className='data-user-header'>
          <div className='nome-temp-1'>
            <h5>{nome}</h5>
          </div>

          <div className='info-user-temp-1'>
            <span><BsTelephone color='#106561' size={10} /> <strong>Celular: </strong>{contato}</span>
            <span><HiOutlineMail color='#106561' size={10} /> <strong>E-mail: </strong>{email}</span>
            <span><MdOutlineOtherHouses color='#106561' size={10} /> <strong>Cidade: </strong> {cidade}</span>
            <span><HiOutlineLocationMarker color='#106561' size={10} /> <strong>Endereço: </strong>{endereco}</span>
          </div>
        </div>
        <div className='photo-template-1'>
          <div>
            <img src={user.avatarUrl === null ? avatar
              : user.avatarUrl} style={{ width: 60, height: 60, borderRadius: 20, display: 'flex', }} />
          </div>
        </div>

      </div>
    <div className='container-form-temp-1'>
      <div className='container-informacoes-user-1'>
     
        <div className='label-info-mini-temp'>
          <label><FaUserTie color='#106561' size={10} /> Perfil</label>
        </div>
        <div className='text-objctive-temp1'>
              <span>{textProfile}</span>
            </div>
      </div>


      <div className='container-informacoes-user-1'>
        <div className='label-info-mini-temp'>
          <label> <GiStairsGoal color='#106561' size={10} /> Objetivo  <span /></label>

        </div>

        <div className='text-objctive-temp1'>
          <span>{textValue}</span>
        </div>
      </div>

      <div className='container-informacoes-user-1'>
        <div className='label-info-mini-temp'>
          <label> <FaUserGraduate color='#106561' size={10} /> Formação</label>
          <span />
        </div>

        <div className='text-objctive-temp1'>
         <span>{Formation}</span> 
        </div>
      </div>

      <div className='container-informacoes-user-1'>
        <div className='label-info-mini-temp'>
          <label><IoSchoolSharp color='#106561' size={10} /> Cursos profissionalizantes</label>
        </div>

        <div className='text-objctive-temp1'>
          <span>{Cursos}</span>
        </div>
      </div>

      <div className='container-informacoes-user-1'>
        <div className='label-info-mini-temp'>
          <label>  < BsFillGearFill color='#106561' size={10} /> Expreriência Profissional</label>
        
        </div>

        <span>
          {XP}
        </span>
      </div>

      </div>

    </div>

  );
}