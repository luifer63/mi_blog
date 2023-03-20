import React, { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import { Global } from '../../helpers/Global'
import { Peticion } from '../../helpers/Peticion'
import { useForm } from '../../hooks/useForm'

export const Editar = () => {

  const { formulario, enviado, cambiado } = useForm({})
  const [resultado, setResultado] = useState("no_subido")
  const [articulo, setArticulo] = useState({})
  const params = useParams()

  useEffect(() => {
    conseguirArticulo()
  }, [])

  const conseguirArticulo = async () => {

    const url = Global.url + "articulo/" + params.id
    let { datos} = await Peticion(url, "GET")

    if (datos.status === "success") {
      setArticulo(datos.articulo)
    }

   
  }

  const editarArticulo = async (e) => {
    e.preventDefault()
    // recoger datos formulario
    let nuevoArticulo = formulario

    // Guardar articulo backend

    try {
      const { datos } = await Peticion(Global.url + "articulo/" + params.id, "PUT", nuevoArticulo)
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
      <h1>Editar Artículo</h1>
      <p>Formulario para editar: {articulo.titulo}</p>
      {console.log(resultado)}

      <strong>{resultado == 'guardado' ? "Artículo guardado con éxito !!" : ""}</strong>
      <strong>{resultado == 'error' ? "Los datos proporcionados son incorrectos !!" : ""}</strong>
      {/* //montar formulario */}
      <form className='formulario' onSubmit={editarArticulo}>

        <div className='form-group'>
          <label htmlFor='titulo'>Título</label>
          <input type="text" name='titulo' onChange={cambiado} defaultValue={articulo.titulo} />
        </div>
        <div className='form-group'>
          <label htmlFor='contenido'>Contenido</label>
          <textarea type="text" name='contenido' onChange={cambiado} defaultValue={articulo.contenido}/>
        </div>
        <div className='form-group'>
          <label htmlFor='file0'>Imagen</label>
          <div className='mascara'>

                {articulo.imagen == "default.png" && <img src='https://i.blogs.es/544e7d/650_1000_javascript_logo/1366_2000.webp' />}
                {articulo.imagen != "default.png" && <img src={Global.url + "imagen/" + articulo.imagen} />}

              </div>
          <input type="file" name='file0' id="file" />
        </div>

        <input type="submit" value="Guardar" className='btn btn-success' />

      </form>
    </div>
  )
}
