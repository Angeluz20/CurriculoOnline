import React, { useContext, useState, useEffect, useRef, createRef } from 'react';
import '../home/styles.css'


import { AuthContext } from '../../contexts/auth'
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';
import { IconButton, TextField, Button, makeStyles, Box } from '@material-ui/core';
import { MdAddCircleOutline } from 'react-icons/md'
import { BsPlusCircleFill } from 'react-icons/bs'
import { TiDelete } from 'react-icons/ti'
import { AiOutlineShareAlt, AiOutlinePrinter, AiOutlineClose } from 'react-icons/ai'

import { FaAddressBook } from 'react-icons/fa'
import Carousel from 'nuka-carousel/lib/carousel';
import firebase from '../services/firebaseConnection';
import Header from '../../Components/header/header';
import TabsCards from '../../Components/tabsCards/tabCards';
import Templete1 from '../../Components/templates/temp1/temp1';
import Templete2 from '../../Components/templates/temp2/temp2';
import TempleteView2 from '../../Components/templates/temp2/templeteView2/tempalateView2';
import TempleteView1 from '../../Components/templates/temp1/templateView1/tempView1';
import TitlePages from '../../Components/titlePages/titlePages';
import Modal from 'react-modal';
import Tab1 from '../../Components/tabsCards/tab1/tabCard1';
import TabExperiencia from '../../Components/tabsCards/tabExperiencia/tabXp';
import TabProfile from '../../Components/tabsCards/tabProfile/tabProfile';
import TabObjective from '../../Components/tabsCards/tabObjective/tabObjective';
import TabFormation from '../../Components/tabsCards/tabFormation/tabFormation';
import TabCursos from '../../Components/tabsCards/tabCursos/tabCursos';
import Manual from '../../img/manual.svg'
import passo1 from '../../img/passo1.jpg'
import passo2 from '../../img/passo2.jpg'
import passo3 from '../../img/passo3.jpg'
import passo4 from '../../img/passo4.jpg'
const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            background: 'white',

        },
        "& .MuiFormLabel-root": {
            color: 'grey'
        },

    },

    floatingLabelFocusStyle: {
        color: "red"
    }
}))




Modal.setAppElement('#root')



export default function Home() {
    const classes = useStyles();
    const { id } = useParams();
    const history = useHistory();
    const [nome, setNome] = useState('Nome');
    const [contato, setContato] = useState('');
    const [nasc, setNasc] = useState('');
    const [endereco, setEndereco] = useState('');
    const [estadoCivil, setEstadoCivil] = useState('');
    const [genero, setGenero] = useState('Masculino');
    const [cidade, setCidade] = useState('');
    const [nomeCurri, setNomeCurri] = useState('');
    const [textObective, setTextObjective] = useState('');
    const [listNameCurri, setListNameCurri] = useState([]);
    const [selectedNameCurri, setSelectedNameCurri] = useState(0);
    const [loadNameCurri, setLoadNameCurri] = useState(true);
    const [idDocCustomer, setIdDocCustumer] = useState(false);
    const [visibleModal, setVisibleModal] = useState(false);
    const [visibleModalTemp2, setVisibleModalTemp2] = useState(false);
    const [visibleModalGuide, setVisibleModalGuide] = useState(false);
    const [valorInput, setValorInput] = useState([]);
    const [textProfile, setTextProfile] = useState('');
    const [valorInputFormation, setValorInputFormation] = useState([]);
    const [email, setEmail] = useState('');
    const [inputField, setInputField] = useState([{
        empresa: '', cargo: '', periodo: ''
    },]);
    const [inputFormation, setInputFormation] = useState([{
        nome: '', instituicao: ''
    },]);
    const [inputCursos, setInputCursos] = useState([{
        nome: '', instituicao: '', cargaHoraria: ''
    },]);




    const { user } = useContext(AuthContext);


    useEffect(() => {


        async function loadNameCurri() {
            await firebase.firestore().collection('users')
                .doc(user.uid).collection('registerNameCurriculo')
                .get()
                .then((snapshot) => {
                    let lista = [];
                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            nomeCurri: doc.data().nomeCurri
                        })
                    })
                    if (lista.length === 0) {
                        console.log('Nenhum nome cadastrado')
                        setListNameCurri([{ id: '1', nomeCurri: ' ' }]);
                        setLoadNameCurri(false);
                        return;
                    }
                    setListNameCurri(lista);
                    setLoadNameCurri(false)
                    if (id) {
                        loadId(lista)
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setListNameCurri([{ id: '1', nomeCurri: '' }]);
                    setLoadNameCurri(false);
                    toast.error('deu algum erro');
                })
        }
        loadNameCurri()

    }, [])

    async function loadId(lista) {
        await firebase.firestore().collection('users').doc(user.uid).collection('curriculosName').doc(id)
            .get()
            .then((snapshot) => {
                setNome(snapshot.data().nome)
                setNasc(snapshot.data().nasc)
                setCidade(snapshot.data().cidade)
                setEndereco(snapshot.data().endereco)
                setEstadoCivil(snapshot.data().estadoCivil)
                setGenero(snapshot.data().genero)
                setContato(snapshot.data().contato)
                setSelectedNameCurri(snapshot.data().selectedNameCurri)
                setTextObjective(snapshot.data().textObective)
                setTextProfile(snapshot.data().textProfile)
                setInputField(snapshot.data().inputField)
                setInputFormation(snapshot.data().inputFormation)
                setInputCursos(snapshot.data().inputCursos)
                setEmail(snapshot.data().email)
                let index = lista.findIndex(item => item.id === snapshot.data().docId)
                setSelectedNameCurri(index)
                setIdDocCustumer(true)
                console.log(nome)
            })
            .catch((err) => {
                console.log('erro no id passado: ', err)
                setIdDocCustumer(false)
            })
    }
    async function handleSave(e) {
        e.preventDefault();

        if (idDocCustomer) {
            await firebase.firestore().collection('users').doc(user.uid).collection('curriculosName').doc(id)
                .update({
                    user: user.uid,
                    nome: nome,
                    endereco: endereco,
                    contato: contato,
                    nasc: nasc,
                    estadoCivil: estadoCivil,
                    genero: genero,
                    cidade: cidade,
                    textObective: textObective,
                    inputField: inputField,
                    email: email,
                    inputFormation: inputFormation,
                    textProfile: textProfile,
                    inputCursos: inputCursos
                })
                .then(() => {
                    toast.success('Informações atualizadas com sucesso!')
                    history.push('/edit')
                })
                .catch((err) => {
                    toast.error('algo deu errado', err)
                    console.log('algo deu errado', err)
                })
            return;
        }
        if (nome !== "" && contato !== "" && endereco !== "" && nasc !== "") {

            await firebase.firestore().collection('users')
                .doc(user.uid).collection('curriculosName')
                //'.add' gera meu ID aleatorio

                .add({
                    user: user.uid,
                    created: new Date(),
                    docId: listNameCurri[selectedNameCurri].id,
                    nome: nome,
                    endereco: endereco,
                    contato: contato,
                    nasc: nasc,
                    estadoCivil: estadoCivil,
                    genero: genero,
                    cidade: cidade,
                    nomeCurri: listNameCurri[selectedNameCurri].nomeCurri,
                    textObective: textObective,
                    urlImgPhoto: null,
                    inputField: inputField,
                    email: email,
                    inputFormation: inputFormation,
                    textProfile: textProfile,
                    inputCursos: inputCursos
                })
                .then(() => {
                    // setNome('');
                    // setContato('');
                    // setNasc('');
                    // setEndereco('');
                    // setEstadoCivil('');
                    // setGenero('');
                    // setCidade('');
                    // setNomeCurri('');
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
    async function handleRegisterCurri(e) {
        e.preventDefault();
        if (nomeCurri !== '') {
            await firebase.firestore().collection('users')
                .doc(user.uid).collection('registerNameCurriculo')
                .add({
                    user: user.uid,
                    nomeCurri: nomeCurri
                })
                .then(() => {
                    toast.info('Cadastrado com Sucesso!')
                })
                .catch((error) => {
                    console.log(error)
                    toast.error('Erro ao cadastar')
                })
        } else {
            toast.error('É obrigatório cadastrar um nome ao seu currículo')
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
    function nomeSelecionado(e) {
        console.log('index do nome: ', e.target.value)
        console.log('nome selecionado', listNameCurri[e.target.value])
        setSelectedNameCurri(e.target.value)
    }
    function opModal() {
        setVisibleModal(true)
    }
    function closeModal() {
        setVisibleModal(false)
    }
    function openModalTemplate2() {
        setVisibleModalTemp2(true)
    }
    function closeModalTemplate2() {
        setVisibleModalTemp2(false)
    }
    function opModalGuide() {
        setVisibleModalGuide(true)
    }
    function closeModalGuide() {
        setVisibleModalGuide(false)
    }
    async function updateImg(e) {
        e.preventDefault();
        const file = e.target[0]?.files[0];

    }
    function cleanInpus() {

        setNome('');
        setContato('');
        setNasc('');
        setEndereco('');
        setEstadoCivil('');
        setGenero('');
        setCidade('');
        setNomeCurri('');
        setEmail();
    }
    function handleChangeInput(index, e) {
        e.preventDefault();
        const values = [...inputField];
        values[index][e.target.name] = e.target.value;
        setInputField(values)
        console.log(index, e.target.name)
    }
    function salvarXP(e) {
        e.preventDefault();
        console.log('inputs ', inputField)
        setValorInput(inputField)
    }
    function addXP(e) {
        e.preventDefault();
        setInputField([...inputField, { empresa: '', cargo: '', periodo: '' }])
    }
    function removeXP(index) {

        const values = [...inputField];
        values.splice(index, 1);
        setInputField(values)
    }
    function handleChangeFormation(index, e) {
        e.preventDefault();
        const values = [...inputFormation];
        values[index][e.target.name] = e.target.value;
        setInputFormation(values)
        console.log(index, e.target.name)
    }
    function addFormation(e) {
        e.preventDefault();
        setInputFormation([...inputFormation, { nome: '', instituicao: '' }])
    }
    function saveFormation(e) {
        e.preventDefault();
        console.log('inputs ', inputFormation)
        setValorInputFormation(inputFormation)
    }
    function removeFormation(index) {

        const values = [...inputFormation];
        values.splice(index, 1);
        setInputFormation(values)
    }
    function handleChangeCursos(index, e) {
        e.preventDefault();
        const values = [...inputCursos];
        values[index][e.target.name] = e.target.value;
        setInputCursos(values)
        console.log(index, e.target.name)
    }
    function addCursos(e) {
        e.preventDefault();
        setInputCursos([...inputCursos, { nome: '', instituicao: '', cargaHoraria: '' }])
    }

    function removeCursos(index) {

        const values = [...inputCursos];
        values.splice(index, 1);
        setInputCursos(values)
    }
    return (
        <div className='container-principal'>


            <div className='container-principal'>
                <Header />
                <div className='row-items'>


                    <div className='form-align'>

                        <div className='container-register-name-curri'>

                            <div>
                                <div className='box-form-guia'>

                                    <h5>  <span className='box-animate-guia'></span>
                                        Guia
                                        <span className='box-animate-guia'></span>

                                    </h5>
                                </div>
                                <div className='guia' >

                                    <div className='btn-guide'> <img src={Manual} onClick={opModalGuide} alt='animated' className='manual' /></div>
                                    <label>Clique aqui  pra conhecer a plataforma</label>
                                    <Modal
                                        className='style-modal-guide'
                                        isOpen={visibleModalGuide}
                                        overlayClassName='modal-guide-overlay'
                                    >
                                        <div className='container-carousel-guide'>
                                            <Carousel
                                                slidesToShow={1}
                                                style={{ position: 'relative', }}
                                                cellAlign="center"
                                                defaultControlsConfig={{

                                                    nextButtonText: '>',
                                                    prevButtonText: '<',
                                                    prevButtonStyle: {
                                                        background: '#d27af5',
                                                        borderRadius: 20,
                                                        color: '#fff',
                                                        cursor: 'pointer',
                                                        height: 250
                                                    },

                                                    nextButtonStyle: {
                                                        background: '#d27af5',
                                                        borderRadius: 20,
                                                        color: '#fff',
                                                        cursor: 'pointer',
                                                        height: 250
                                                    },
                                                    pagingDotsStyle: {

                                                        margin: 5,
                                                        fill: '#fff',
                                                        position: 'static',

                                                    }
                                                }}

                                            >
                                                <div><img src={passo1} style={{ width: 410, height: 374, marginLeft: 20 }} /></div>
                                                <div><img src={passo2} style={{ width: 410, height: 374, marginLeft: 20 }} /></div>
                                                <div><img src={passo3} style={{ width: 410, height: 374, marginLeft: 20 }} /></div>
                                                <div><img src={passo4} style={{ width: 410, height: 374, marginLeft: 20 }} /></div>
                                            </Carousel>
                                        </div>

                                        <button onClick={closeModalGuide} className='btn-close-modal-guide'> <TiDelete color='#fff' size={35} /></button>
                                    </Modal>
                                </div>

                                <form onSubmit={handleRegisterCurri} >
                                    <div className='box-form-register-curriculo'>

                                        <h5>  <span className='box-line-regiser-curriculo'></span>
                                            Cadastrar nome do currículo
                                            <span className='box-line-regiser-curriculo'></span>

                                        </h5>
                                    </div>

                                    <div className='form-register-name-curriculo'>
                                        <div className='view-input-nameCurri-register'>
                                            <input typr='text' value={nomeCurri} onChange={(e) => setNomeCurri(e.target.value)} className='name-curri' placeholder='Dê um nome ao seu currículo'></input>
                                            <button type='submit' className='btn-register-name-curri'>Cadastrar</button>
                                        </div>

                                        <div className='select-name'>
                                            <label>Currículos cadastrados</label>
                                            <select className='select-name-register' value={selectedNameCurri} onChange={nomeSelecionado}>
                                                {listNameCurri.map((item, index) => {
                                                    return (
                                                        <option key={item.id} value={index}>
                                                            {item.nomeCurri}
                                                        </option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>



                        <form onSubmit={handleSave} autocomplete="off">
                            <div className='box-form'>
                                <h5>
                                    <span className='box-line-form'></span>
                                    Formulário
                                    <span className='box-line-form'></span>
                                </h5>

                            </div>
                            <section className='form'>
                                <TabsCards
                                    cabecalho={
                                        <>
                                            <Tab1
                                                name={nome}
                                                nameOnChange={(e) => setNome(e.target.value)}

                                                city={cidade}
                                                cityOnChange={(e) => setCidade(e.target.value)}

                                                address={endereco}
                                                addressOnChange={(e) => setEndereco(e.target.value)}

                                                phone={contato}
                                                phoneOnChange={(e) => setContato(e.target.value)}

                                                birth={nasc}
                                                BirthOnChange={(e) => setNasc(e.target.value)}

                                                maritalStatus={estadoCivil}
                                                maritalStatusOnChange={estCivil}

                                                genreOnchange={generoUser}

                                                email={email}
                                                emailOnChange={(e) => setEmail(e.target.value)}
                                                checkedFeminino={genero === 'Feminino'}
                                                checkedMasculino={genero === 'Masculino'}
                                                checkedlgb={genero === 'LGBTQIA+'}
                                            />
                                        </>

                                    }
                                    Profile={
                                        <>
                                            <TabProfile
                                                textProfileValue={textProfile}
                                                onChangeProfile={(e) => setTextProfile(e.target.value)}
                                            />
                                        </>

                                    }
                                    objective={
                                        <>
                                            <TabObjective
                                                textObectiveValue={textObective}
                                                onChangeObjective={(e) => setTextObjective(e.target.value)}
                                            />
                                        </>

                                    }

                                    xp={
                                        <div className='main-XP'>

                                            {inputField.map((inputField, index) => {
                                                return (
                                                    <div key={index} className='container-XP'>
                                                        <TabExperiencia
                                                            valueEmpresa={inputField.empresa}
                                                            valueCargo={inputField.cargo}
                                                            valuePeriodo={inputField.periodo}
                                                            addXP={addXP}
                                                            removeXP={removeXP}
                                                            onChangeXP={(e) => handleChangeInput(index, e)}
                                                        />
                                                    </div>
                                                )
                                            })}

                                            <div>

                                            </div>
                                        </div>
                                    }
                                    formation={
                                        <div style={{ display: 'flex', alingItems: 'center', justifyContent: 'center', marginLeft: 10 }}>
                                            <div className='container-formation'>
                                                <label>Formação</label>
                                                {inputFormation.map((item, index) => {
                                                    return (
                                                        <TabFormation
                                                            index={index}
                                                            valueName={item.nome}
                                                            valueInstituicao={item.instituicao}
                                                            onChangeFormation={(e) => handleChangeFormation(index, e)}
                                                            addFormation={addFormation}
                                                            removeFormation={removeFormation}
                                                        />

                                                    )
                                                })}

                                            </div>
                                        </div>
                                    }
                                    cursos={
                                        <div style={{ display: 'flex', alingItems: 'center', justifyContent: 'center', marginLeft: 10 }}>
                                            <div className='container-cursos'>
                                                <label>Cursos</label>
                                                {inputCursos.map((item, index) => {
                                                    return (
                                                        <TabCursos
                                                            index={index}
                                                            valueName={item.nome}
                                                            valueInstituicao={item.instituicao}
                                                            valueCargaHoraria={item.cargaHoraria}
                                                            onChangeCursos={(e) => handleChangeCursos(index, e)}
                                                            addCursos={addCursos}
                                                            removeCursos={removeCursos}
                                                        />


                                                    )
                                                })}

                                            </div>
                                        </div>
                                    }
                                />

                            </section>
                            <div className='container-btn-form'>
                                <button className='btn-save-form' type="submit">Salvar</button>
                                <button className='btn-clean-form' onClick={cleanInpus}>Limpar</button>
                            </div>
                            <div className='line-style'>
                            </div>
                        </form>

                        <div className='container-carousel-teste'>
                            <div className='box-templates'>
                                <h5>
                                    <span className='box-line-templates'></span>
                                    Templates
                                    <span className='box-line-templates'></span>
                                </h5>
                            </div>
                            <Carousel slidesToShow={1}
                                style={{ position: 'relative', }}
                                cellAlign="center"
                                defaultControlsConfig={{

                                    nextButtonText: '.',
                                    prevButtonText: '.',
                                    prevButtonStyle: {
                                        background: '#fff',

                                        borderRadius: 20,
                                        opacity: 0.1,
                                        color: '#fff',
                                        cursor: 'pointer',
                                        height: 250
                                    },

                                    nextButtonStyle: {
                                        background: '#fff',
                                        borderRadius: 20,
                                        opacity: 0.1,
                                        color: '#fff',
                                        cursor: 'pointer',
                                        height: 250
                                    },
                                    pagingDotsStyle: {

                                        margin: 5,
                                        fill: '#fff',
                                        position: 'static',
                                        marginBottom: 120
                                    }
                                }}>

                                <div>
                                    <Templete1
                                        nome={nome}
                                        contato={contato}
                                        endereco={endereco}
                                        cidade={cidade}
                                        textProfile={textProfile}
                                        textValue={textObective}
                                        email={email}
                                        Cursos={
                                            <div style={{ display: 'flex', flexDirection: 'row', width: 100, height: '40px' }}>

                                                {inputCursos.map((item, index) => {
                                                    return (
                                                        <div key={index} className='row-cursos'>
                                                            <div>
                                                                <span><strong>Curso: </strong> {item.nome}</span>
                                                                <span><strong>Instituição: </strong> {item.instituicao}</span>
                                                                <span><strong>Carga horária: </strong> {item.cargaHoraria}</span>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        }
                                        Formation={
                                            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '50px' }}>

                                                {inputFormation.map((item, index) => {
                                                    return (
                                                        <div key={index} className='row-formation'>
                                                            <div>
                                                                <span><strong>Curso: </strong> {item.nome}</span>
                                                                <span><strong>Instituição: </strong> {item.instituicao}</span>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        }
                                        XP={

                                            <div style={{ display: 'flex', flexDirection: 'row', }}>

                                                {inputField.map((item, index) => {
                                                    return (
                                                        <div key={index} className='row-xp'>
                                                            <div>
                                                                <span><strong>Empresa: </strong> {item.empresa}</span>
                                                                <span><strong>Cargo: </strong> {item.cargo}</span>
                                                                <span><strong>Período: </strong> {item.periodo}</span>
                                                            </div>

                                                        </div>
                                                    )
                                                })}
                                            </div>

                                        }
                                    />

                                    <Modal
                                        isOpen={visibleModal}
                                        //onRequestClose={fechaModal}
                                        className='style-modal-temps'
                                        overlayClassName={'overlay-modal-temps'}
                                    >
                                        <div className='container-temp1-view'>


                                            <TempleteView1
                                                nome={nome}
                                                contato={contato}
                                                endereco={endereco}
                                                cidade={cidade}
                                                textProfile={textProfile}
                                                textObjective={textObective}
                                                email={email}
                                                Cursos={
                                                    <div style={{ display: 'flex', flexDirection: 'row', width: 150, height: '40px' }}>

                                                        {inputCursos.map((item, index) => {
                                                            return (
                                                                <div key={index} className='row-cursos-view'>
                                                                    <div>
                                                                        <span><strong>Curso: </strong> {item.nome}</span>
                                                                        <span><strong>Instituição: </strong> {item.instituicao}</span>
                                                                        <span><strong>Carga horária: </strong> {item.cargaHoraria}</span>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                }
                                                Formation={
                                                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '50px' }}>

                                                        {inputFormation.map((item, index) => {
                                                            return (
                                                                <div key={index} className='row-formation-view'>
                                                                    <div>
                                                                        <span><strong>Curso: </strong> {item.nome}</span>
                                                                        <span><strong>Instituição: </strong> {item.instituicao}</span>

                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                }

                                                XP={
                                                    <div style={{ display: 'flex', flexDirection: 'row', }}>
                                                        {inputField.map((item, index) => {
                                                            return (
                                                                <div key={index} className='row-xp-temp1'>
                                                                    <div>
                                                                        <span><strong>Empresa: </strong> {item.empresa}</span>
                                                                        <span><strong>Cargo: </strong> {item.cargo}</span>
                                                                        <span><strong>Período: </strong> {item.periodo}</span>
                                                                    </div>

                                                                </div>
                                                            )
                                                        })}
                                                    </div>

                                                }


                                            />

                                            <div className='container-btn-modal'>
                                                <button className='btn-close-modal' onClick={closeModal}>
                                                    <AiOutlineClose color='#fff' size={25} />
                                                </button>
                                                <button className='styles-btn-options-modal'>
                                                    <AiOutlineShareAlt color='#fff' size={25} />
                                                </button>
                                                <button className='styles-btn-options-modal'>
                                                    <AiOutlinePrinter color='#fff' size={25} />
                                                </button>
                                            </div>

                                        </div>



                                    </Modal>
                                    <button className='btn-view-temp1' onClick={opModal}>Visualizar modelo</button>
                                </div>
                                <div>
                                    <Templete2
                                        nome={nome}
                                        contato={contato}
                                        endereco={endereco}
                                        cidade={cidade}
                                        textProfile={textProfile}
                                        textValue={textObective}
                                        email={email}
                                        estadoCivil={estadoCivil}
                                        nascimento={nasc}
                                        Cursos={
                                            <div style={{ display: 'flex', flexDirection: 'row', width: 100, height: '40px' }}>

                                                {inputCursos.map((item, index) => {
                                                    return (
                                                        <div key={index} className='row-cursos'>
                                                            <div>
                                                                <span><strong>Curso: </strong> {item.nome}</span>
                                                                <span><strong>Instituição: </strong> {item.instituicao}</span>
                                                                <span><strong>Carga horária: </strong> {item.cargaHoraria}</span>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        }
                                        Formation={
                                            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '50px' }}>

                                                {inputFormation.map((item, index) => {
                                                    return (
                                                        <div key={index} className='row-formation'>
                                                            <div>
                                                                <span><strong>Curso: </strong> {item.nome}</span>
                                                                <span><strong>Instituição: </strong> {item.instituicao}</span>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        }
                                        XP={

                                            <div style={{ display: 'flex', flexDirection: 'row', }}>

                                                {inputField.map((item, index) => {
                                                    return (
                                                        <div key={index} className='row-xp'>
                                                            <div>
                                                                <span><strong>Empresa: </strong> {item.empresa}</span>
                                                                <span><strong>Cargo: </strong> {item.cargo}</span>
                                                                <span><strong>Período: </strong> {item.periodo}</span>
                                                            </div>

                                                        </div>
                                                    )
                                                })}
                                            </div>

                                        }
                                    />
                                    <Modal
                                        isOpen={visibleModalTemp2}
                                        //onRequestClose={fechaModal}
                                        className='style-modal-temps'
                                        overlayClassName={'overlay-modal-temps'}
                                    >
                                        <div className='container-temp1-view'>


                                            <TempleteView2
                                                nome={nome}
                                                contato={contato}
                                                endereco={endereco}
                                                cidade={cidade}
                                                textProfile={textProfile}
                                                textValue={textObective}
                                                email={email}
                                                estadoCivil={estadoCivil}
                                                nascimento={nasc}
                                                Cursos={
                                                    <div style={{ display: 'flex', flexDirection: 'row', width: 100, height: '40px' }}>

                                                        {inputCursos.map((item, index) => {
                                                            return (
                                                                <div key={index} className='row-cursos-view-2'>
                                                                    <div>
                                                                        <span><strong>Curso: </strong> {item.nome}</span>
                                                                        <span><strong>Instituição: </strong> {item.instituicao}</span>
                                                                        <span><strong>Carga horária: </strong> {item.cargaHoraria}</span>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                }
                                                Formation={
                                                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '50px' }}>

                                                        {inputFormation.map((item, index) => {
                                                            return (
                                                                <div key={index} className='row-formation-view-2'>
                                                                    <div>
                                                                        <span><strong>Curso: </strong> {item.nome}</span>
                                                                        <span><strong>Instituição: </strong> {item.instituicao}</span>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                }
                                                XP={

                                                    <div style={{ display: 'flex', flexDirection: 'row', }}>

                                                        {inputField.map((item, index) => {
                                                            return (
                                                                <div key={index} className='row-xp-view-2'>
                                                                    <div>
                                                                        <span><strong>Empresa: </strong> {item.empresa}</span>
                                                                        <span><strong>Cargo: </strong> {item.cargo}</span>
                                                                        <span><strong>Período: </strong> {item.periodo}</span>
                                                                    </div>

                                                                </div>
                                                            )
                                                        })}
                                                    </div>

                                                }


                                            />

                                            <div className='container-btn-modal'>
                                                <button className='btn-close-modal' onClick={closeModalTemplate2}>
                                                    <AiOutlineClose color='#fff' size={25} />
                                                </button>
                                                <button className='styles-btn-options-modal'>
                                                    <AiOutlineShareAlt color='#fff' size={25} />
                                                </button>
                                                <button className='styles-btn-options-modal'>
                                                    <AiOutlinePrinter color='#fff' size={25} />
                                                </button>
                                            </div>

                                        </div>



                                    </Modal>
                                    <button className='btn-view-temp1' onClick={openModalTemplate2}>Visualizar modelo</button>
                                </div>



                            </Carousel>

                        </div>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        </div>
    );
}