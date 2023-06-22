import { auth } from '../config/firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export async function Cadastrar(email, senha, confirmarSenha) {
  const auth = getAuth();
  console.log(email);
  createUserWithEmailAndPassword(auth, email, senha)
    .then((userData) => {
      console.log(userData);
    })
    .catch((error) => {
      console.log("Não registrou " + error);
    });
};

export async function LogIn(email, senha) {
  const auth = getAuth();
  await signInWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      console.log(userCredential.user);
    })
    .catch((error) => {
      console.log(error.code, " => ", error.message);
    });
};