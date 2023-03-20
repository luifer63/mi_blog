import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

export const Sidebar = () => {

  const [buscar, setBuscar] = useState("")
  const navegar = useNavigate()

  const hacerBusqueda = (e) => {
    e.preventDefault()

    let miBusqueda = e.target.search_field.value
    navegar("/buscar/"+ miBusqueda, {replace: true})

  }

  return (
    <aside className="lateral">
      <div className="search">
        <h3 className="title">Buscador</h3>
        <form onSubmit={hacerBusqueda}>
          <input type="text" name="search_field"/>
          <input type="submit" value="Buscar" />
        </form>
      </div>
      {/* <div className="add">
        <h3 className="title">Añadir Pelicula</h3>
        <form>
          <input type="text" placeholder="Titulo" />
          <textarea placeholder="Descripcion"></textarea>
          <input type="submit" value="Guardar" />
        </form>

      </div> */}
    </aside>
  )
}
