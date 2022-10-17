import React, { useContext, useState, useEffect } from 'react';
import '../home/styles.css'
import Select from 'react-select'
import TabsCards from '../../Components/tabsCards/tabCards';
import { AuthContext } from '../../contexts/auth'
import firebase from '../services/firebaseConnection';
import Header from '../../Components/header/header';
import { toast } from 'react-toastify';
import Carousel from 'nuka-carousel/lib/carousel';
import { Ratio } from 'react-bootstrap';

export default function Home() {
    const [nome, setNome] = useState('');
    const [contato, setContato] = useState('');
    const [nasc, setNasc] = useState('');
    const [endereco, setEndereco] = useState('');
    const [estadoCivil, setEstadoCivil] = useState('');
    const [genero, setGenero] = useState('');
    const [cidade, setCidade] = useState('');

    const { user } = useContext(AuthContext)
    // const options = [
    //     { value: 'solteiro', label: 'Solteiro(a)' },
    //     { value: 'casado', label: 'Casado(a)' },
    //     { value: 'divorciado', label: 'divorciada(a)' }
    // ]

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
    async function handleSave(e) {
        e.preventDefault();
        if (nome !== "" && contato !== "" && endereco !== "" && nasc !== "") {
            await firebase.firestore().collection('curriculos')
                //'.add' gera meu ID aleatorio
                .add({
                    created: new Date(),
                    nome: nome,
                    endereco: endereco,
                    contato: contato,
                    nasc: nasc,
                    estadoCivil: estadoCivil,
                    genero: genero,
                    cidade, cidade
                })
                .then(() => {
                    setNome('');
                    setContato('');
                    setNasc('');
                    setEndereco('');
                    setEstadoCivil('');
                    setGenero('');
                    setCidade('');
                    toast.info("Curriculo finalizado!");
                })
                .catch((error) => {
                    console.log(error);
                    toast.error('Erro ao salvar o currículo');
                })
        } else {
            toast.error('Preencha todos os campos')
        }
    }
    //seleciona o estado civil
    function estCivil(e) {
        e.preventDefault()
        setEstadoCivil(e.target.value)
        console.log(e.target.value)
    }
    //seleciona o genero
    function generoUser(e) {
        e.preventDefault()
        setGenero(e.target.value)
        console.log(e.target.value)
    }

    return (
        <div className='container-principal'>
            <Header />
            <div className='row-items'>


                <div className='form-align'>
                    <form className='container-form' onSubmit={handleSave}>

                        <section className='form' >
                            <TabsCards
                                cabecalho={
                                    <div className='container-tab-1'>

                                        <div className='container-tab-grid-1'>

                                            <labe id='labelStyle'>Nome Completo</labe>
                                            <input className='inputName' value={nome} onChange={(e) => setNome(e.target.value)}></input>

                                            <labe id='labelStyle'>Endereço</labe>
                                            <input className='inputName' value={endereco} onChange={(e) => setEndereco(e.target.value)}></input>

                                            <labe id='labelStyle'>Telefone</labe>
                                            <input className='inputName' type='tel' required="required" maxlength="15"  placeholder="(00) 0 0000-0000" value={contato} onChange={(e) => setContato(e.target.value)}></input>

                                            <div className='container-city-nasc'>
                                                <div>
                                                    <labe id='labelStyle'>Cidade</labe>
                                                    <input className='inputName' value={cidade} onChange={(e) => setCidade(e.target.value)}></input>
                                                </div>

                                                <div>
                                                    <labe id='labelStyle'>Data de Nasc.</labe>
                                                    <input className='inputName' type='date' value={nasc} onChange={(e) => setNasc(e.target.value)}></input>
                                                </div>

                                            </div>


                                        </div>
                                        <select value={estadoCivil} onChange={estCivil}>

                                            <option value='solteiro'>
                                                Solteiro(a)
                                            </option>
                                            <option value='casado'>
                                                Casado(a)
                                            </option>
                                            <option value='viuvo'>
                                                Viúvo(a)
                                            </option>
                                            <option value='divorciado'>
                                                Divorciado(a)
                                            </option>

                                        </select>

                                        <label>Gênero</label>
                                        <div>
                                            <input
                                                type='radio'
                                                name='radio'
                                                value='Masculino'
                                                onChange={generoUser}
                                            />
                                            <span>Masculino</span>
                                            <input
                                                type='radio'
                                                name='radio'
                                                value='fem'
                                                onChange={generoUser}
                                            />
                                            <span>Feminino</span>
                                            <input
                                                type='radio'
                                                name='radio'
                                                value='lgbt'
                                                onChange={generoUser}
                                            />
                                            <span>LGBTQIA+</span>

                                        </div>
                                        {/* <Select styles={customStyles} options={options} /> */}
                                    </div>
                                }
                                objective={

                                    <div className='objective'>
                                        <label>Objetivo</label>
                                        <textarea className='txtarea' cols="35" rows="8" placeholder='Escreva sobre seus objetivos na carreira e na empresa'></textarea>
                                    </div>
                                }

                            />

                            <button type="submit">Salvar</button>
                        </section>
                        <div className='line'></div>

                    </form>


                </div>
                <div className='container-carousel'>
                    <Carousel className='carousel' slidesToShow={1}

                        cellAlign="center"
                        defaultControlsConfig={{

                            nextButtonText: '>',
                            prevButtonText: '<',
                            pagingDotsStyle: {
                                margin: 5,
                                fill: '#25b797'
                            }
                        }}>

                        <div className='template1'>

                            <div className='design-temp1'>
                            </div>
                            <div>

                            </div>
                            <div className='header-template-1'>


                                <div className='data-user-header'>
                                    <div className='nome-temp1'>
                                        <h5>Nome do usuario</h5>
                                    </div>

                                    <div className='info-user-temp1'>
                                        <span><strong>Celular</strong> (00) 0 0000-0000</span>
                                        <span><strong>Celular</strong> (00) 0 0000-0000</span>
                                        <span><strong>E-mail</strong> user@gmail.com</span>
                                        <span><strong>Cidade</strong> Manaus-Am</span>
                                        <span><strong>Endereço</strong> Travessa Fantasia</span>
                                    </div>
                                </div>
                                <div className='photo-template'></div>

                            </div>
                            <div>

                            </div>

                        </div>
                        <div className='shere'>
                            <h2>2</h2>
                        </div>
                        <div className='shere'>
                            <h2>3</h2>
                        </div>
                        <div className='template1'>
                            <h1>4</h1>
                        </div>
                        <div className='shere'>
                            <h2>5</h2>
                        </div>
                        <div className='shere'>
                            <h2>6</h2>
                        </div>
                    </Carousel>
                </div>
                <div>
                    teste
                </div>



            </div>
        </div>);
}