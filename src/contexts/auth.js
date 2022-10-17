import { createContext, useState, useEffect } from 'react';
import firebase from '../pages/services/firebaseConnection';

import {toast} from 'react-toastify'
export const AuthContext = createContext({});

function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        function loadStotage() {
            const storageUser = localStorage.getItem('SistemaUser');

            if (storageUser) {
                setUser(JSON.parse(storageUser));
                setLoading(false)
            }
            setLoading(false)
        }
        loadStotage()
    }, [])
    //login do user
    async function SignIn(email, password) {
        setLoadingAuth(true);
       
        await firebase.auth().signInWithEmailAndPassword(email, password)
            
        .then(async (value) => {
                let uid = value.user.uid;

                const profile =  await firebase.firestore().collection('users')
                .doc(uid).get();
                
                let data = {
                    uid: uid,
                    nome: profile.data().nome,
                    avatarUrl: profile.data().avatarUrl,
                    email: value.user.email
                };
                setUser(data);
                storageUser(data);
                setLoadingAuth(false)
                toast.success('Bem-vindo de volta, ' + data.nome)
            })
            .catch((error) => {
                console.log(error);
                setLoadingAuth(false);
                toast.error('Ops, algo deu errado!')
            })
    }

    async function SignUp(email, password, nome) {
        setLoadingAuth(true);
        //cadastrar usuer
        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid = value.user.uid; //pegando o uid do user
                //criando user no banco firestore
                await firebase.firestore().collection('users')
                    .doc(uid).set({
                        nome: nome,
                        avatarUrl: null,
                    })
                    .then(() => {
                        let data = {
                            uid: uid,
                            nome: nome,
                            email: value.user.email,
                            avatarUrl: null

                        }
                        setUser(data);
                        storageUser(data);
                        setLoadingAuth(false)
                        toast.success('Bem-vindo a plataforma!')
                    })
            })
            .catch((error) => {
                console.log(error);
                setLoadingAuth(false);
                toast.error('Ops, algo deu errado!')
            })
    }

    function storageUser(data) {
        localStorage.setItem('SistemaUser', JSON.stringify(data))
    }

    //sair
    async function signOut() {
        await firebase.auth().signOut()
        localStorage.removeItem('SistemaUser');
        setUser(null);
    }
    return (                                   //está convertendo objeto para booleano
        <AuthContext.Provider value={{ signed: !!user, user, loading, SignUp, signOut, SignIn, loadingAuth, setUser, storageUser}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;