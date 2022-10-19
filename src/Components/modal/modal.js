import React from 'react';
import '../modal/stylesModal.css'
import { FiX } from 'react-icons/fi'
export default function Modal({ conteudo, close })  {
    return (
        <div className='modal'>
            <div className='container-modal'>
                <button onClick={close}>
                    <FiX size={23} color='fff' />
                    voltar
                </button>
                <div>
                    <h2>detalhes</h2>
                    <div className='row'>
                        <span>
                            Nome: <p>{conteudo.nome}</p>
                        </span>
                    </div>
                </div>
            </div>

        </div>
    );
}