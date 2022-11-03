import React, { useRef, useState, useContext } from 'react';
import '../temp2/temp2.css'
import { AuthContext } from '../../../contexts/auth';
import { useReactToPrint } from 'react-to-print';
import avatar from '../../../img/avatar.png'

import { BsTelephone, BsFillGearFill } from 'react-icons/bs'
import { HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi'
import { MdOutlineOtherHouses } from 'react-icons/md'
import { FaUserTie, FaUserGraduate, FaBirthdayCake } from 'react-icons/fa'
import { GiStairsGoal, GiDoorRingHandle } from 'react-icons/gi'
import { IoSchoolSharp } from 'react-icons/io5'


export default function Templete2({
  nome,
  contato,
  endereco,
  cidade,
  email,
  textValue,
  XP,
  textProfile,
  Formation,
  Cursos,
  nascimento,
  estadoCivil
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
    <div className='template-2' >





      <div className='header-template-2' >
        <div className='design-temp-2'>
          <div >

          </div>
        </div>


        <div className='photo-template-2'>
          <div>
            <img src={user.avatarUrl === null ? avatar
              : user.avatarUrl} style={{ width: 60, height: 60, borderRadius: 60, display: 'flex', }} />

          </div>

        </div>

      </div>
      <div className='data-user-header-2'>
        <div className='nome-temp-2'>
          <h5>{nome}</h5>
        </div>
      </div>
      <div className='informacoes-row'>
        <div className='info-user-temp-2'>
          <div>
            <span><BsTelephone color=' #660f8c' size={9} /> <strong>Celular: </strong>{contato}</span>
            <span><HiOutlineMail color=' #660f8c' size={9} /> <strong>E-mail: </strong>{email}</span>
          </div>
          <div>
            <span><MdOutlineOtherHouses color=' #660f8c' size={9} /> <strong>Cidade: </strong> {cidade}</span>
            <span><HiOutlineLocationMarker color=' #660f8c' size={9} /> <strong>Endereço: </strong>{endereco}</span>
          </div>
          <div> <span><FaBirthdayCake color=' #660f8c' size={9} /> <strong>Nasc. : </strong> {nascimento}</span>
            <span><GiDoorRingHandle color=' #660f8c' size={9} /> <strong>Estado Civil: </strong>{estadoCivil}</span>

          </div>

        </div>

      </div>
      <div className='container-form-temp-2'>
        <div className='container-informacoes-user-2'>

          <div className='label-info-mini-temp-2'>
            <label><FaUserTie color='#ad6fe2d1' size={10} /> Perfil</label>
          </div>
          <div className='text-objctive-temp2'>
            <span>{textProfile}</span>
          </div>
        </div>


        <div className='container-informacoes-user-2'>
          <div className='label-info-mini-temp-2'>
            <label> <GiStairsGoal color='#ad6fe2d1' size={10} /> Objetivo  <span /></label>

          </div>

          <div className='text-objctive-temp2'>
            <span>{textValue}</span>
          </div>
        </div>

        <div className='container-informacoes-user-2'>
          <div className='label-info-mini-temp-2'>
            <label> <FaUserGraduate color='#ad6fe2d1' size={10} /> Formação</label>
            <span />
          </div>

          <div className='text-objctive-temp2'>
            <span>{Formation}</span>
          </div>
        </div>

        <div className='container-informacoes-user-2'>
          <div className='label-info-mini-temp-2'>
            <label><IoSchoolSharp color='#ad6fe2d1' size={10} /> Cursos profissionalizantes</label>
          </div>

          <div className='text-objctive-temp2'>
            <span>{Cursos}</span>
          </div>
        </div>

        <div className='container-informacoes-user-2'>
          <div className='label-info-mini-temp-2'>
            <label><BsFillGearFill color='#ad6fe2d1' size={10} />Expreriência Profissional</label>

          </div>

          <span>
            {XP}
          </span>
        </div>

      </div>

    </div>

  );
}