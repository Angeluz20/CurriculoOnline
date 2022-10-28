import React, { useContext } from 'react';
import '../header/styles.css'
import { Link } from 'react-router-dom';
import Logo from '../logo/logo';
import avatar from '../../img/avatar.png'

import { AiOutlinePoweroff, AiOutlineHome, AiOutlineInfoCircle } from 'react-icons/ai'
import { ImProfile, ImFileText2, ImExit} from 'react-icons/im'
//
import { AuthContext } from '../../contexts/auth';
//AiOutlinePoweroff ImProfile
export default function Header() {
    const { user, signOut } = useContext(AuthContext);
    return (
        <header className='header'>
            <div className='logo'>

                <Logo />
            </div>

            <div className='options-nav'>

                <div className='sidbar-photo'>

                    <Link to="/profile" className='link-style'>
                        <img src={user.avatarUrl === null ? avatar
                            : user.avatarUrl} className='photo-user' />
                        <div id='name'>
                            {user.nome}
                        </div>
                    </Link>

                </div>



                <div className='sidbar-icon'>
                    <Link ><AiOutlineInfoCircle color='#fff' size={22} /></Link>
                </div>

                <div className='sidbar-icon'>
                    <Link to="/home" > <AiOutlineHome color='#fff' size={22} /></Link>
                </div>

                <div className='sidbar-icon'>
                    <Link to="/edit"> <ImFileText2 color='#fff' size={22} /></Link>
                </div>
                {/* <span id='tooltip'>Meus Currículos</span> */}


                <button onClick={() => signOut()} className='btn-exit'>
                    <ImExit color='#fff' size={22} />

                </button>
            </div>

        </header>
    );
}