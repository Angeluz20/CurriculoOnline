import React, { useState, useContext } from 'react';
import '../SignUp/styles.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth';
import { FaRegUser, FaUserEdit } from 'react-icons/fa'
import { AiOutlineLock, AiOutlineMail, AiOutlineUser } from 'react-icons/ai'
import {  AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'

import curriculo from './curriculo.svg'
import Loading from '../../Components/loading/loading';

export default function SignUp() {

    const [secureTextEntryIcon, setSecureTextEntryIcon] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nome, setNome] = useState('');

    const { SignUp, loadingAuth } = useContext(AuthContext);

    function handleSubmit(e) {
        e.preventDefault();
        if (nome !== '' && email !== '' && password !== '') {
            SignUp(email, password, nome)
        }
    }

    return (
        <body>

            <div className='curved'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#2e2e30" fill-opacity="0.9" d="M0,160L40,176C80,192,160,224,240,202.7C320,181,400,107,480,85.3C560,64,640,96,720,117.3C800,139,880,149,960,128C1040,107,1120,53,1200,37.3C1280,21,1360,43,1400,53.3L1440,64L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path></svg>
            </div>
            <div className='main-login'>

                <div className='left-login'>

                    <div className='name-logo2'>
                        <div className='name-meu-curriculo2'>
                            <h5 id='textMy2'>MEU</h5>
                            <h5 id='textCurri2'>CURRÍCULO</h5>
                        </div>

                        <h6 id='textOn2'>ONLINE</h6>

                    </div>
                    <div id="frase-de-efeito">
                        <h5>Rápido, fácil e prático.</h5>
                        {/* <h5>Bem-vindo!<br />Cadastre-se ou faça login.</h5> */}
                    </div>

                    <img src={curriculo} alt='animated' className='left-login-image' />
                </div>

                <div className='right-register'>
                    <form className='card-register' onSubmit={handleSubmit}>
                        <div className='name-logo'>
                            <div className='name-meu-curriculo'>
                                <h5 id='textMy'>MEU</h5>
                                <h5 id='textCurri'>CURRÍCULO</h5>
                            </div>

                            <h6 id='textOn'>ONLINE</h6>
                        </div>
                        <h1>Cadastrar uma conta</h1>

                        <div className='text-field'>
                            <label for='nome'>Nome</label>
                            <div className='container-input'>
                                <AiOutlineUser color='#25b797' size={22} />
                                <input type='text' name='nome' value={nome} placeholder='Nome de usuário' onChange={(e) => setNome(e.target.value)}></input>
                            </div>
                        </div>

                        <div className='text-field'>
                            <label for='usuario'>E-mail</label>
                            <div className='container-input'>
                                <AiOutlineMail color='#25b797' size={20} />
                                <input type='text' name='email' value={email} placeholder='exemplo@gmail.com' onChange={(e) => setEmail(e.target.value)}></input>
                            </div>

                        </div>

                        <div className='text-field' >
                            <label for='senha'>Senha</label>
                            <div className='container-input'>
                            <AiOutlineLock color='#25b797' size={22} />
                                <input type={secureTextEntryIcon ? "text" : "password"}  name='senha' placeholder='*********' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                               
                                <div
                                    onClick={() => setSecureTextEntryIcon(!secureTextEntryIcon)}>
                                    {secureTextEntryIcon== true ? (
                                        <AiOutlineEyeInvisible color='#25b797' size={22} />
                                    ) : (
                                        < AiOutlineEye  color='#25b797' size={22} />
                                    )}
                                </div>

                            </div>

                        </div>
                        {loadingAuth ? <Loading /> : <button className='btn-create' type='submit'>Criar</button>}
                        <div>
                            <Link to="/" className='btn-register'>já tem uma conta? entre.</Link>
                        </div>

                        {/* <button to="/register" className='btn-register'>Registrar</button> */}
                    </form>

                </div>

            </div>

        </body>
    );
}