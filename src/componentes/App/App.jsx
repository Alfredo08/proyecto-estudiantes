import { useEffect, useState } from "react";
import Estudiante from "../Estudiante/Estudiante";
import FormularioEstudiante from "../FormularioEstudiante/FormularioEstudiante";
import axios from 'axios';

const App = () => {

  const [listaEstudiantes, setListaEstudiantes] = useState([]);

  useEffect(() => {
    const cargarListaDeEstudiantes = async() => {
      const URL = 'https://servidor-estudiantes.onrender.com/estudiante';
      const respuesta = await axios(URL);
      setListaEstudiantes(respuesta.data);
    }

    cargarListaDeEstudiantes();
  }, []);
  const actualizarListaEstudiantes = (nuevoEstudiante) => {
    setListaEstudiantes([...listaEstudiantes, nuevoEstudiante]);
  }

  const eliminarEstudianteDeLaLista = (nombre, apellido) => {
    const listaTemporal = [...listaEstudiantes];
    for(let i = 0; i < listaTemporal.length; i ++){
      if(listaTemporal[i].nombre === nombre && listaTemporal[i].apellido === apellido){
        listaTemporal.splice(i, 1);
      }
    }
    setListaEstudiantes(listaTemporal);
  }

  return(
    <>
      <h1> Aplicación de estudiantes </h1>
      <FormularioEstudiante actualizarListaEstudiantes={actualizarListaEstudiantes} />
      <h2> Lista de estudiantes </h2>
      {
        listaEstudiantes.map((estudiante, indice) => {
          return (<Estudiante key={indice}
                              nombre={estudiante.nombre}
                              apellido={estudiante.apellido}
                              edad={estudiante.edad}
                              curso={estudiante.curso}
                              eliminarEstudianteDeLaLista={eliminarEstudianteDeLaLista}/>)
        })
      }
    </>
  );
}

export default App;