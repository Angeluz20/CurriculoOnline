import React from 'react';
import '../tabFormation/tabFormation.css'
import { BsPlusCircleFill } from 'react-icons/bs'
import { TiDelete } from 'react-icons/ti'
export default function TabFormation({index, onChangeFormation,addFormation, removeFormation, valueName, valueInstituicao}) {
    return (
        <div className='formation' key={index}>
            <div className='input-formation'>
                <label>Nome do Curso</label>
                <input
                    name='nome'
                    label="Nome"
                    value={valueName}
                    variant="standard"
                    placeholder='Nome do curso'
                    autocomplete="off"
                    onChange={onChangeFormation}
                />
                <label>Instituição</label>
                <input
                    name='instituicao'
                    label="instituicao"
                    value={valueInstituicao}
                    placeholder="Instituicao"
                    autocomplete="off"
                    onChange={ onChangeFormation}
                />

                <div>
                    <button style={{ border: 'none', background: 'none' }} onClick={addFormation} > <BsPlusCircleFill color='#87cefa' size={25} /></button>
                    <button style={{ border: 'none', background: 'none' }} onClick={removeFormation}><TiDelete color='#FF6B00' size={40} /></button>
                </div>
            </div>
        </div>
    );
}