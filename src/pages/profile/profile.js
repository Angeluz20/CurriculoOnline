import React, { useContext, useState } from 'react';
import Header from '../../Components/header/header';
import '../profile/styles.css'
import avatar from '../../img/avatar.png'
import { FiUpload } from 'react-icons/fi'
import { AuthContext } from '../../contexts/auth';
import firebase from '../../pages/services/firebaseConnection';

export default function Profile() {

  const { user, setUser, storageUser } = useContext(AuthContext);
  const [nome, setNome] = useState(user && user.nome);
  const [email, setEmail] = useState(user && user.email);
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  const [imgAvatar, setImgAvatar] = useState(null);

  //(e) significa que está recebendo um evento
  function handleFile(e) {
    //console.log((e.target.files[0]))
    const image = e.target.files[0];
    if(image.type === 'image/jpeg' || image.type === 'image/png'){
      setImgAvatar(image)
      setAvatarUrl(URL.createObjectURL(e.target.files[0]))
    }else{
        alert('Envie uma imagem do tipo PNG ou JPEG');
        setImgAvatar(null);
        return null;
    }

  }
  async function handleUpload() {
    const currentUid = user.uid;
    const uploadoTask = await firebase.storage()
    .ref(`images/${currentUid}/${imgAvatar.name}`)
    .put(imgAvatar)
    .then( async () => {
      alert('Foto Enviada com sucesso')

              await firebase.storage().ref(`images/${currentUid}`)
          .child(imgAvatar.name).getDownloadURL()
          .then(async (url) => {
            let urlFoto = url;

            await firebase.firestore().collection('users')
              .doc(user.uid)
              .update({
                avatarUrl: urlFoto,
                nome: nome
              })
              .then(() => {
                let data ={
                  ...user,
                  avatarUrl: urlFoto,
                  nome: nome
                }
                setUser(data)
                storageUser(data)
              })
          })
    })
    .catch((error) =>{
      alert(error)
      console.log(error)
    })
   
  }


  async function HandleSave(e) {
    e.preventDefault();//não deixa a página atualizar
    if (imgAvatar === null && nome !== '') {
      await firebase.firestore().collection('users')
        .doc(user.uid)
        .update({
          nome: nome
        })
        .then(() => {
          let data = {
            ...user,
            nome: nome
          }
          setUser(data)
          storageUser(data)
        })
    } else if (nome !== '' && imgAvatar !== null) {
      handleUpload()
    }

  }

  return (
    <div >
      <Header />
      <div className='container-main-profile'>
        <div className='container-profile'>
          <form className='form-avatar' onSubmit={HandleSave}>
            <label className='label-avatar'>
              <span>
                <FiUpload color='#fff' size={45} />

              </span>
            
              {avatarUrl === null ? <img src={avatar} width='250' height='250' alt='foto padrao' />
                : <img src={avatarUrl} alt='foto perfil' id='photo-profile' />}
             <input type='file' accept="image/*" onChange={handleFile} id='input-photo'/>
            </label>

          </form >
          <form className='form-avatar' onSubmit={HandleSave}>
            <div className='info-user' >
              <label className='label'>Nome</label>
              <input type='text' value={nome} onChange={(e) => setNome(e.target.value)} className='input' />
              <label className='label'>E-mail</label>
              <input type='text' value={email} disabled className='input' />
              <button type='submit' className='btn-save'>Salvar</button>
            </div>
          </form>

        </div>
          
      </div>
       {/* <div className='line-profile'></div> */}
    </div>

  );
}