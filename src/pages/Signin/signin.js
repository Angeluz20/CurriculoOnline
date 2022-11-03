import { useState, useContext } from 'react';
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.js';
import { FaRegUser } from 'react-icons/fa'
import { AiOutlineLock, AiOutlineUser, AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
//AiOutlineLock
import '../Signin/styles.css'

import curriculo from './curriculo.svg'
import Loading from '../../Components/loading/loading.js';

export default function Signin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { SignIn, loadingAuth } = useContext(AuthContext)
    const [secureTextEntryIcon, setSecureTextEntryIcon] = useState(false);
    const [isRevealPwd, setIsRevealPwd] = useState(false);
    function handleLogin(e) {
        e.preventDefault();
        if (email !== '' && password !== '') {
            SignIn(email, password)
        } else if (email === '' && password === '') {
            alert('preencha todos os campos')
        } else if (email === '' || password === '') {
            alert('preencha todos os campos')
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

                    </div>

                    <img src={curriculo} alt='animated' className='left-login-image' />
                </div>

                <div className='right-login' >
                    <form className='card-login' onSubmit={handleLogin}>
                        <div className='name-logo'>
                            <div className='name-meu-curriculo'>
                                <h5 id='textMy'>MEU</h5>
                                <h5 id='textCurri'>CURRÍCULO</h5>
                            </div>

                            <h6 id='textOn'>ONLINE</h6>
                        </div>
                        <h1>Login</h1>
                        <div className='text-field'>
                            <label for='usuario'>E-mail</label>
                            <div className='container-input'>
                                <AiOutlineUser color='#25b797' size={20} />
                                <input type='text' name='usuario' placeholder='exemplo@gmail.com'autocomplete="off" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                            </div>

                        </div>

                        <div className='text-field'>
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
                        {loadingAuth ? <Loading /> : <button type='submit' className='btn-login' >Acessar</button>}
                        <div>
                            <Link to="/register" className='btn-register'>Registrar</Link>
                        </div>

                        {/* <button to="/register" className='btn-register'>Registrar</button> */}
                    </form>

                </div>

            </div>

        </body>
    );
}