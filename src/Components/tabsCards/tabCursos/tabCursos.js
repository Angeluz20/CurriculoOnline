import React from 'react';
import '../tabCursos/tabCursos.css'
import { BsPlusCircleFill } from 'react-icons/bs'
import { TiDelete } from 'react-icons/ti'

export default function TabCursos({
    index, 
    onChangeCursos, 
    valueName, 
    valueCargaHoraria, 
    valueInstituicao, 
    addCursos, 
    removeCursos
}) {
    
 return (
    <div className='cursos' key={index}>
    <div className='input-cursos'>
        <label>Nome do Curso</label>
        <input
            name='nome'
            label="Nome"
            value={valueName}
            variant="standard"
            placeholder='Nome do curso'
            autocomplete="off"
            onChange={onChangeCursos}
        />
        <label>Instituição</label>
        <input
            name='instituicao'
            label="instituicao"
            value={valueInstituicao}
            placeholder="Instituicao"
            autocomplete="off"
            onChange={onChangeCursos}
        />
        <label>Carga Horária</label>
        <input
            name='cargaHoraria'
            label="cargaHoraria"
            value={valueCargaHoraria}
            placeholder="Carga Horária"
            autocomplete="off"
            onChange={onChangeCursos}
        />

        <div>
            <button style={{ border: 'none', background: 'none' }} onClick={addCursos} > <BsPlusCircleFill color='#87cefa' size={25} /></button>
            <button style={{ border: 'none', background: 'none' }} onClick={removeCursos}><TiDelete color='#FF6B00' size={40} /></button>
        </div>
    </div>
</div>
 );
}