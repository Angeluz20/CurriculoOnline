import React from 'react';
import { MdAddCircleOutline } from 'react-icons/md'
import { TiDeleteOutline } from 'react-icons/ti'
import '../tabExperiencia/tabXp.css'

export default function TabExperiencia({valueEmpresa, valueCargo,valuePeriodo,onChangeXP, addXP, removeXP}) {
    return (
        <div className='inputs-XP' >

            <input
                name='empresa'
                label="Empresa"
                value={valueEmpresa}
                variant="standard"
                placeholder='Empresa'
                autocomplete="off"
                onChange={onChangeXP}
            />

            <input
                name='cargo'
                label="Cargo"
                value={valueCargo}
                variant="standard"
                placeholder='Cargo'
                autocomplete="off"
                onChange={onChangeXP}
            />

            <input
                name='periodo'
                label="periodo"
                value={valuePeriodo}
                placeholder="Período"
                autocomplete="off"
                onChange={onChangeXP}
            />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <button onClick={addXP} style={{ border: 'none', background: 'none' }}> <MdAddCircleOutline color='green' size={25} /></button>
                <button onClick={removeXP} style={{ border: 'none', background: 'none' }}><TiDeleteOutline color='red' size={25} /></button>
            </div>
        </div>
    );
}