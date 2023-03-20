import React from 'react'

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Peticion } from '../../helpers/Peticion'
import { Global } from '../../helpers/Global'
import { Listado } from './Listado'

export const Articulo = () => {

  const [articulo, setArticulo] = useState({})
  const [cargando, setCargando] = useState(true)
  const params = useParams()

  useEffect(() => {
    conseguirArticulo()
  }, [])

  const conseguirArticulo = async () => {

    const url = Global.url + "articulo/" + params.id
    let { datos, cargando } = await Peticion(url, "GET")

    if (datos.status === "success") {
      setArticulo(datos.articulo)
    }

    setCargando(false)
  }

  return (
    <div className='jumbo'>

      {cargando ? "Cargando..." :
        (
          (
            <>
              <div className='mascara'>

                {articulo.imagen == "default.png" && <img src='https://i.blogs.es/544e7d/650_1000_javascript_logo/1366_2000.webp' />}
                {articulo.imagen != "default.png" && <img src={Global.url + "imagen/" + articulo.imagen} />}

              </div>
              <h1>{articulo.titulo}</h1>
              <span>{articulo.fecha}</span>
              <p>{articulo.contenido}</p>
            </>
          )

        )
      }

    </div>
  )
}

