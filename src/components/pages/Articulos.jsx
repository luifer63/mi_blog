import React from 'react'

import { useState, useEffect } from 'react'
import { Peticion } from '../../helpers/Peticion'
import { Global } from '../../helpers/Global'
import { Listado } from './Listado'

export const Articulos = () => {

  const [articulos, setArticulos] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {

    conseguirArticulos()

  }, [])

  const conseguirArticulos = async () => {

    const url = Global.url + "articulos"
    let { datos, cargando } = await Peticion(url, "GET")

    if (datos.status === "success") {
      setArticulos(datos.articulos)
    }

    setCargando(false)
  }

  return (
    <>
      {console.log(articulos.length)}
      {cargando ? "Cargando..." :
        (
          
          articulos.length >= 1 ? 
            <Listado articulos={articulos} setArticulos = {setArticulos}/> 
            : <h1>No hay Artículos</h1>

        )
      }

    </>
  )
}
