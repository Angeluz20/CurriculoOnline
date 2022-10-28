import React, { useState, useEffect, useContext } from 'react';
import '../editCurriculo/styleEdit.css'

import { BiTrash } from 'react-icons/bi'
import { FaRegEdit } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth'
import { HiOutlineDocumentSearch } from 'react-icons/hi'
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import Header from '../../Components/header/header';
import avatar from '../../img/avatar.png'
import Modal from 'react-modal';
import firebase from '../services/firebaseConnection'
import TitlePages from '../../Components/titlePages/titlePages';



const listRef = firebase.firestore().collection('users')//.orderBy('nomeCurri', 'desc')
Modal.setAppElement('#root')


export default function EditCurriculo() {

  const [emptyCurri, setEmptyCurri] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false)
  const [isCollection, setIsCollection] = useState(false)
  const [lastDocs, setLastDoc] = useState('')
  const [showPostModal, setShowPostModal] = useState(false);
  const [details, setDetails] = useState('teste');

  const { user } = useContext(AuthContext)

  useEffect(() => {
    return () => {
      nomesCurriculos();
    }
  }, []);

  async function nomesCurriculos() {

    await listRef
      .doc(user.uid).collection('curriculosName').orderBy('created', 'asc').limit(4)
      .get()
      .then((snapshot) => {
        updateState(snapshot)
      })
      .catch((err) => {
        console.log('deu errado', err)
        setLoadingMore(false)
      })
    setLoading(false)
  }

  async function updateState(snapshot) {
    const colecaoCurri = snapshot.size === 0;
    if (!colecaoCurri) {
      let lista = [];
      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          nome: doc.data().nome,
          cidade: doc.data().cidade,
          contato: doc.data().contato,
          endereco: doc.data().endereco,
          estadoCivil: doc.data().estadoCivil,
          genero: doc.data().genero,
          nasc: doc.data().nasc,
          nomeCurri: doc.data().nomeCurri,
          docId: doc.data().docId,
          created: doc.data().created,
          createdFormat: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
          inputField: doc.data().inputField
        })
      }, [])
      const arc = snapshot.docs[snapshot.docs.lenght - 1]
      setEmptyCurri(emptyCurri => [...emptyCurri, ...lista])
      setLastDoc(arc)
    } else {
      setIsCollection(true)
    }
    setLoadingMore(false)
  }

  // function togglePostModal(item) {
  //   //console.log(item)
  //   setShowPostModal(!showPostModal) //true
  //   setDetails(item);
  //   console.log(details)
  // }
  async function removeCurri(id) {
    await listRef
      .doc(user.uid).collection('curriculosName').doc(id)
      .delete()
      .then(() => {
        toast.success('Currículo excluido com sucesso!')
      })
      .catch((err) => {
        toast.error('Ops, algo deu errado', err)
      })
  }
  function abreModal(item) {
    //console.log(item)
    setShowPostModal(true) //true
    setDetails(item);
    console.log(details)
  }
  function fechaModal() {
    setShowPostModal(false)
  }
  return (
    <div>
      <Header />
      {/* <TitlePages title={'Currículos'}/> */}
      <div className='main-edit'>
        {emptyCurri.length === 0 ? (<section className='container-edit-main'>

          <label id="title-edit">Meus currículos <hr /></label>
          <div className='card-curriculo-empty'>

            <span style={{ color: '#fff' }}>
              Nenhum currículo salvo
            </span>

          </div>
        </section>) : (
        
        <section className='container-edit-main'>

          <label id="title-edit">Meus currículos <hr /></label>
         
         
            <div className='container-edit' >
           {emptyCurri.map((item, index) => {
              return (
             
                <div className='div-card' key={index}>
                     <div className='testeCard'>
                  <div className='container-foto-card'>

                    <img src={user.avatarUrl === null ? avatar
                      : user.avatarUrl} className='foto-curri' />

                  </div>

                  <label className='label-name-curri-info'>
                    <strong>Nome:</strong>
                    <span>
                      {item.nome}
                    </span>
                    <strong>Informações do currículo:</strong>
                    <span>
                      <label>Arquivo:</label> {item.nomeCurri}
                      <label>Data:</label> {item.createdFormat}
                    </span>
                  </label>
                  <div className='container-btns'>
                    <Link id='link-style-btns' onClick={() => abreModal(item)}>
                      <HiOutlineDocumentSearch color='#fff' size={25} />
                    </Link>

                    <Link id='link-style-btns' to={`/home/${item.id}`}>
                      <FaRegEdit color='#fff' size={25} />
                    </Link>

                    <Link id='link-style-btns' onClick={() => removeCurri(item.id)}>
                      <BiTrash color='#fff' size={25} />
                    </Link>
                  </div>
                  
                </div>
                </div>

              )
            })}
           </div>
          {/* 
          {emptyCurri.map((item, index) => {
            return (
              <div className='card-curriculo-save' key={index}>

                <span>
                  <div>
                    <button id='link-style' onClick={() => abreModal(item)} style={{ background: '#82ffa1' }}>
                      <ImFileText2 color='#000' size={25} />
                    </button>
                    <label className='label-name-curri'><strong>Nome:</strong> {item.nome}</label>
                  </div>

                </span>
                <span>
                  <Link to={`/home/${item.id}`} id='link-style'>
                    <ImPencil color='#EEAD2D' size={25} />
                  </Link>

                  <Link id='link-style' onClick={() => removeCurri(item.id)}>
                    <BiTrash color='#D75413' size={25} />
                  </Link>

                </span>
              </div>

            )
          })} */}
        

       
        
    
        </section>)}


      </div>
      <Modal
        isOpen={showPostModal}
        //onRequestClose={fechaModal}
        className='style-modal'
        overlayClassName={'overlay-modal'}
      >
        <h1>Suas Informações</h1>
        <hr></hr>
        <p><strong>Nome:</strong> {details.nome}</p>
        <p><strong>Cidade:</strong> {details.cidade}</p>
        <p><strong>Celular:</strong> {details.contato}</p>
        <p><strong>Estado Civil:</strong> {details.estadoCivil}</p>
        <p><strong>Sexo:</strong> {details.genero}</p>
        <p><strong>nome do Curriculo:</strong> {details.nomeCurri}</p>
       
      
        <button onClick={fechaModal}>voltar</button>

      </Modal>
      {/* <footer>
        <hr></hr>
          <h1>testete</h1>
      </footer> */}

    </div>
  );
}