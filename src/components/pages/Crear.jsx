import React, { useState } from 'react'

import { Global } from '../../helpers/Global'
import { Peticion } from '../../helpers/Peticion'
import { useForm } from '../../hooks/useForm'

export const Crear = () => {

  const { formulario, enviado, cambiado } = useForm({})
  const [resultado, setResultado] = useState("no_subido")

  const guardarArticulo = async (e) => {
    e.preventDefault()
    // recoger datos formulario
    let nuevoArticulo = formulario

    // Guardar articulo backend

    try {
      const { datos, cargando } = await Peticion(Global.url + "crear", "POST", nuevoArticulo)
      const fileInput = document.querySelector("#file")

      if (datos.status === "success") {
        setResultado("guardado")
      } else {
        setResultado("error")
      }

      if (datos.status === "success" &&  fileInput.files[0]) {
        setResultado("guardado")

        //subir imagen
        
        const formData = new FormData()

        formData.append('file0', fileInput.files[0])

        const subida = await Peticion(Global.url + "subir-imagen/" + datos.articulo._id, "POST", formData, true)

        if (subida.datos.status === "success") {
          setResultado("guardado")
        } else {
          setResultado("error")
        }
      }

    } catch (error) {
      setResultado("error")
    }

  }

  return (
    <div className='jumbo'>
      <h1>Crear Artículo</h1>
      <p>Formulario para crear articulo</p>
      {console.log(resultado)}

      <strong>{resultado == 'guardado' ? "Artículo guardado con éxito !!" : ""}</strong>
      <strong>{resultado == 'error' ? "Los datos proporcionados son incorrectos !!" : ""}</strong>
      {/* //montar formulario */}
      <form className='formulario' onSubmit={guardarArticulo}>

        <div className='form-group'>
          <label htmlFor='titulo'>Título</label>
          <input type="text" name='titulo' onChange={cambiado} />
        </div>
        <div className='form-group'>
          <label htmlFor='contenido'>Contenido</label>
          <textarea type="text" name='contenido' onChange={cambiado} />
        </div>
        <div className='form-group'>
          <label htmlFor='file0'>Imagen</label>
          <input type="file" name='file0' id="file" />
        </div>

        <input type="submit" value="Guardar" className='btn btn-success' />

      </form>
    </div>
  )
}
