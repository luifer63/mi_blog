export const Peticion = async (url, metodo, datosGuardar = "") => {

    let datos = []
    let cargando = true


    let opciones = {
        method: "GET"
    }

    if (metodo == "GET" || metodo == "DELETE") {

        opciones = {
            method: metodo
        }
    }

    if (metodo == "POST" || metodo == "PUT") {
        console.log("las opciones")
        console.log(metodo)
        opciones = {
            method: metodo,
            body: JSON.stringify(datosGuardar),
            headers: {
                "Content-Type": "application/json"
            }
        }
    }


    const peticion = await fetch(url, opciones)  
    console.log(peticion)  
    datos = await peticion.json()
    

    cargando = false


    return {
        datos,
        cargando
    }

}