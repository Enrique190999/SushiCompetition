import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

const generarCodigoPartida = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase(); 
};

const crearPartida = async () => {
  const db = getFirestore();
  const codigo = generarCodigoPartida();
  const partidaRef = doc(collection(db, "partidas"), codigo);

  await setDoc(partidaRef, {
    codigo: codigo,
    fechaCreacion: new Date(),
    estado: "en curso"
  });

  console.log(`Partida creada con código: ${codigo}`);
};
