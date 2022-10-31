import React from 'react';
import '../tab1/tabCadr1.css'
export default function Tab1({
    genreOnchange,
    maritalStatus, 
    maritalStatusOnChange,
    city, 
    cityOnChange, 
    name, 
    nameOnChange, 
    address, 
    addressOnChange, 
    phone, 
    phoneOnChange,
    email, 
    emailOnChange,
    birth,
    BirthOnChange,
    checkedlgb,
    checkedFeminino,
    checkedMasculino
}) {
    return (

        <div className='container-tab-1'>

            <div className='container-tab-grid-1'>

                <labe id='labelStyle'>Nome Completo</labe>
                <input className='inputName' value={name} onChange={nameOnChange}></input>

                <labe id='labelStyle'>Endereço</labe>
                <input className='inputName' placeholder='Rua Raio de Luz - N 333 -  Centro' value={address} onChange={addressOnChange}></input>

                <labe id='labelStyle'>Telefone</labe>
                <input className='inputName' type='tel' required="required" maxlength="15" placeholder="(00) 0 0000-0000" value={phone} onChange={phoneOnChange}></input>

                <labe id='labelStyle'>E-mail</labe>
                <input className='inputName' type='email' required="required" placeholder="email@email.com" value={email} onChange={emailOnChange}></input>
                <div className='container-city-nasc'>
                    <div>
                        <labe id='labelStyle'>Cidade</labe>
                        <input className='inputName' placeholder='Manaus-AM' value={city} onChange={cityOnChange}></input>
                    </div>

                    <div>
                        <labe id='labelStyle'>Data de Nasc.</labe>
                        <input className='inputName' type='date' value={birth} onChange={BirthOnChange}></input>
                    </div>

                </div>


            </div>
            <select className='select-marital-status' value={maritalStatus} onChange={maritalStatusOnChange}>

                <option value='Solteiro(a)'>
                    Solteiro(a)
                </option>
                <option value='Casado(a)'>
                    Casado(a)
                </option>
                <option value='Viúvo(a)'>
                    Viúvo(a)
                </option>
                <option value='Divorciado(a)'>
                    Divorciado(a)
                </option>

            </select>

            <div>
            <label style={{color:'#25b797', marginTop:10}}>Gênero:</label>

                <input
                    type='radio'
                    name='radio'
                    value='Masculino'
                    onChange={genreOnchange}
                    checked={checkedMasculino}
                />
                <span>Masculino</span>
                <input
                    type='radio'
                    name='radio'
                    value='Feminino'
                    onChange={genreOnchange}
                    checked={checkedFeminino}
                />
                <span>Feminino</span>
                <input
                    type='radio'
                    name='radio'
                    value='LGBTQIA+'
                    onChange={genreOnchange}
                    checked={checkedlgb}
                />
                <span>LGBTQIA+</span>

            </div>

        </div>

    );
}