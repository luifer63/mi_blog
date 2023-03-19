import React, { useState } from 'react'

import { Global } from '../../helpers/Global'
import { Peticion } from '../../helpers/Peticion'
import { useForm } from '../../hooks/useForm'

export const Crear = () => {

  const { formulario, enviado, cambiado } = useForm({})
  const [ resultado, setResultado ] = useState(false)

  const guardarArticulo = async (e) => {
    e.preventDefault()
    // recoger datos formulario
    let nuevoArticulo = formulario

    // Guardar articulo backend

    try {
      const { datos, cargando } = await Peticion(Global.url + "crear", "POST", nuevoArticulo)
      console.log(datos.status)
      if (datos.status === "success") {
        setResultado(true)
      }

    } catch (error) {
        console.log(error)
    }


  }

  return (
    <div className='jumbo'>
      <h1>Crear Artículo</h1>
      <p>Formulario para crear articulo</p>

      <strong>{resultado ? "Artículo guardado con éxito !!" : ""}</strong>
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
