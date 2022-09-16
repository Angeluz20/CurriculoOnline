import React, { useContext } from 'react';
import '../home/styles.css'
import Select from 'react-select'
import TabsCards from '../../Components/tabsCards/tabCards';
import { AuthContext } from '../../contexts/auth'

export default function Home() {

    const options = [
        { value: 'solteiro', label: 'Solteiro(a)' },
        { value: 'casado', label: 'Casado(a)' },
        { value: 'divorciado', label: 'divorciada(a)' }
    ]

    const customStyles = {
        option: (provided, state) => ({
            ...provided,

            color: state.isSelected ? ' #484b4e' : 'black',
            backgroundColor: state.isSelected ? '#25b797' : 'white'
        }),
        control: (provided) => ({
            ...provided,
            marginTop: "5%",
        })
    }

    const { signOut } = useContext(AuthContext);
    return (
        <div className='container-principal'>
            <header className='header'>
                <nav>
                    <button onClick={() => signOut()}>
                        sair
                    </button>
                </nav>

            </header>

            <div className='container-form'>
                <section className='form'>
                    <TabsCards
                        cabecalho={
                            <div className='container-tab-1'>
                                <div className='container-tab-grid-1'>
                                    <labe id='labelStyle'>Nome Completo</labe>
                                    <input className='inputName'></input>

                                    <labe id='labelStyle'>Contato</labe>
                                    <input className='inputName'></input>

                                    <labe id='labelStyle'>Data de Nasc.</labe>
                                    <input className='inputName'></input>

                                </div>
                                <Select styles={customStyles} options={options} />
                            </div>
                        }
                    />


                </section>
                <div className='line'></div>

            </div>

        </div>
    );
}