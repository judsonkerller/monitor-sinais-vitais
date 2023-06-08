import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";

export async function Cadastrar(email, senha, confirmarSenha) {
  createUserWithEmailAndPassword(auth, email, senha)
    .then((userData) => {
      console.log(userData);
    })
    .catch((error) => {
      console.log("Não registrou " + error);
    });
};