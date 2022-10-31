import React from 'react';
import { MdAddCircleOutline } from 'react-icons/md'
import { BsPlusCircleFill } from 'react-icons/bs'
import { TiDelete } from 'react-icons/ti'
//
import '../tabExperiencia/tabXp.css'

export default function TabExperiencia({ valueEmpresa, valueCargo, valuePeriodo, onChangeXP, addXP, removeXP }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', background:'#414145', marginTop:'10px', borderRadius:'10px'}}>

            <div className='inputs-XP' >
                <div>
                    <label>Empresa</label>

                    <input
                        name='empresa'
                        label="Empresa"
                        value={valueEmpresa}
                        variant="standard"
                        placeholder='Empresa'
                        autocomplete="off"
                        onChange={onChangeXP}
                    />
                </div>
                <div>
                <label>Cargo</label>

                    <input
                        name='cargo'
                        label="Cargo"
                        value={valueCargo}
                        variant="standard"
                        placeholder='Cargo'
                        autocomplete="off"
                        onChange={onChangeXP}
                    />
                </div>
                <div>

                <label>Período</label>

                <input
                    name='periodo'
                    label="periodo"
                    value={valuePeriodo}
                    placeholder="Período"
                    autocomplete="off"
                    onChange={onChangeXP}
                />
                 </div>
                <div className='btns-xp'>
                    <button onClick={addXP} style={{ border: 'none', background: 'none' }}> <BsPlusCircleFill color='#87cefa' size={25} /></button>
                    <button onClick={removeXP} style={{ border: 'none', background: 'none' }}><TiDelete color='#FF6B00' size={40} /></button>
                </div>
            </div>
        </div>
    );
}