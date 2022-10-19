import React, { useState, useEffect, useContext } from 'react';
import '../editCurriculo/styleEdit.css'
import Header from '../../Components/header/header';
import { ImFileText2, ImPencil } from 'react-icons/im'
import { BiTrash } from 'react-icons/bi'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth'
import Modal from 'react-modal';
import firebase from '../services/firebaseConnection'
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
    async function nomesCurriculos() {

      //await firebase.firestore().collection('teste').orderBy('nomeCurri', 'desc').limit(5)
      await firebase.firestore().collection('users')
        .doc(user.uid).collection('curriculosName').orderBy('nomeCurri', 'desc').limit(5)
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

    nomesCurriculos();
    return () => {

    }
  }, []);


  async function updateState(snapshot) {
    const colecaoCurri = snapshot.size === 0;
    if (!colecaoCurri) {
      let lista = [];
      snapshot.forEach((doc) => {
        lista.push({
          nome: doc.data().nome,
          cidade: doc.data().cidade,
          contato: doc.data().contato,
          endereco: doc.data().endereco,
          estadoCivil: doc.data().estadoCivil,
          genero: doc.data().genero,
          nasc: doc.data().nasc,
          nomeCurri: doc.data().nomeCurri,
          docId: doc.data().docId
        })
      })
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
      <div className='main-edit'>
        {emptyCurri.length === 0 ? (<section className='container-edit'>

          <label id="title-edit">Meus currículos <hr /></label>
          <div className='card-curriculo-empty'>

            <span >
              Nenhum currículo salvo
              {/* <Link > <ImFileText2 color='#fff' size={45} id='link-style'/></Link> */}
            </span>

          </div>
        </section>) : (<section className='container-edit'>

          <label id="title-edit">Meus currículos <hr /></label>

        
          {emptyCurri.map((item, index) => {
            return (
              <div className='card-curriculo-save' key={index}>

                <span>
                  <div>
                     <button id='link-style' onClick={() => abreModal(item)} style={{background:'#82ffa1'}}>
                     <ImFileText2 color='#000' size={25} />                       
                  </button>  
                   <label className='label-name-curri'><strong>Nome:</strong> {item.nome}</label>
                  </div>
                 
                </span>
                <span>
                  <Link to={`/home/${item.nomeCurri}`} id='link-style' style={{background:'#EEAD2D'}}>
                    <ImPencil color='#000' size={25} />
                  </Link>
                  <button id='link-style' style={{background:'#D75413'}}>
                    <BiTrash color='#000' size={25} />
                  </button>
               
                </span>
              </div>

            )
          })}

        </section>)}


      </div>
      <Modal
        isOpen={showPostModal}
        //onRequestClose={fechaModal}
        className='style-modal'
        overlayClassName={'overlay-modal'}
      >
       <p><strong>Nome:</strong> {details.nome}</p> 
       <p><strong>Cidade:</strong> {details.cidade}</p>
       <p><strong>Celular:</strong> {details.contato}</p>
       <p><strong>Estado Civil:</strong> {details.estadoCivil}</p>
       <p><strong>Sexo:</strong> {details.genero}</p>
       <p><strong>nome do Curriculo:</strong> {details.nomeCurri}</p>
       <button onClick={fechaModal}>voltar</button>
        
      </Modal>


    </div>
  );
}