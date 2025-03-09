import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../Firestore/initializeapp";

const generarCodigoPartida = () => {
  const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let codigo = "";

  while (!/[A-Z]/.test(codigo) || !/[0-9]/.test(codigo)) {
    codigo = Array.from({ length: 6 }, () => caracteres[Math.floor(Math.random() * caracteres.length)]).join("");
  }

  return codigo;
};

export const createAGameFunction = async () => {

  const codigo = generarCodigoPartida();
  const partidaRef = doc(collection(db, "games"), codigo);
  const date = new Date();
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  await setDoc(partidaRef, {
    code: codigo,
    date: formattedDate,
    status: "playing",
    players:[]
  });
  console.log(`Partida creada con código: ${codigo}`);
  return codigo;

};
