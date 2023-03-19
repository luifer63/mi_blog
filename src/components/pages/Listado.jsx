import React from 'react'

export const Listado = ({articulos, setArticulos}) => {
  return (
    articulos.map(articulo => {
        return (
          <article key={articulo._id} className="articulo-item" >
            <div className='mascara'>

              <img src='https://i.blogs.es/544e7d/650_1000_javascript_logo/1366_2000.webp' />

            </div>
            <div className='datos'>
              <h3 className="title">{articulo.titulo}</h3>
              <p className="description">{articulo.contenido}</p>
              <button className="edit">Editar</button>
              <button className="delete">Borrar</button>
            </div>
          </article>

        )

      }
  )
  )
}
