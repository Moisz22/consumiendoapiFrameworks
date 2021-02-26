let tabla = document.getElementById("tabla")
let busqueda = document.getElementById("boton_busqueda")
let search = document.getElementById("search")
let url = 'http://localhost/apiFrameworks/'
let guardar = document.getElementById("guardaRegistro")
let formularioIngreso = document.getElementById("formulario")
let formularioEditar = document.getElementById("formularioEditar")
let btn_editar = document.getElementById("editarRegistro")

//funcion que muestra la tabla completa
function crear_tabla_completa(json){

    tabla.innerHTML = '<tr><th>ID</th><th>NOMBRE</th><th>LANZAMIENTO</th><th>DESARROLLADOR</th><th>OPCIONES</th></tr>';
        for(i=0; i< json.length ; i++){
            let elemento = document.createElement('tr')
            elemento.innerHTML += '<td>'+ json[i].id + '</td>'
            elemento.innerHTML += '<td>' + json[i].nombre + '</td>'
            elemento.innerHTML += '<td>' + json[i].lanzamiento + '</td>'
            elemento.innerHTML += '<td>' + json[i].desarrollador + '</td>'
            elemento.innerHTML += '<td><button data-bs-toggle="modal" data-bs-target="#modalEditar" onclick="mostrar('+json[i].id+')" class="btn btn-warning modalEditar">Editar</button></td>'
            elemento.innerHTML += '<td><button onclick="eliminar('+json[i].id+')" class="btn btn-danger">Eliminar</button></td>'
            tabla.appendChild(elemento)
        }

}


//comunicacion con la api
fetch(url)
    .then(response => response.json())
    .then(json => {

        crear_tabla_completa(json)
    })
    

//muestra solo los registros consultados por la barra de busqueda
busqueda.addEventListener('click', function(e){

    let search = document.getElementById("search")

    console.log(search.value)

    e.preventDefault()

    if(search.value === null || search.value === ''){

        url = 'http://localhost/apiFrameworks/'
        
    }else{

        url = 'http://localhost/apiFrameworks/?id='+search.value

    }

    fetch(url)
    .then(response => response.json())
    .then(json => {

        if(json.length == undefined && json.id != undefined){

            tabla.innerHTML = '<tr><th>ID</th><th>NOMBRE</th><th>LANZAMIENTO</th><th>DESARROLLADOR</th></tr>';
            let elemento = document.createElement('tr')
            elemento.innerHTML += '<td>'+ json.id + '</td>'
            elemento.innerHTML += '<td>' + json.nombre + '</td>'
            elemento.innerHTML += '<td>' + json.lanzamiento + '</td>'
            elemento.innerHTML += '<td>' + json.desarrollador + '</td>'
            elemento.innerHTML += '<td><button data-bs-toggle="modal" data-bs-target="#modalEditar" onclick="mostrar('+json.id+')" class="btn btn-warning modalEditar">Editar</button></td>'
            elemento.innerHTML += '<td><button onclick="eliminar('+json.id+')" class="btn btn-danger">Eliminar</button></td>'
            tabla.appendChild(elemento)
            url = null

        }else if(json.length != undefined){
            crear_tabla_completa(json)
        }else{

            alert("su registro no se encuentra")

        }

      })
    .catch(err =>{
        alert("su busqueda no es valida")
    })

})


//nuevos registros
formularioIngreso.addEventListener("submit", function(e){

    e.preventDefault();

    let datos = new FormData(formularioIngreso)

    console.log(datos)

    fetch(url, {
        method: 'POST',
        body: datos
    })
    .then(response => response.json())
    .then(json => {
        let elemento = document.createElement('tr')
        elemento.innerHTML += '<td>'+ json.id + '</td>'
        elemento.innerHTML += '<td>' + json.nombre + '</td>'
        elemento.innerHTML += '<td>' + json.lanzamiento + '</td>'
        elemento.innerHTML += '<td>' + json.desarrollador + '</td>'
        elemento.innerHTML += '<td><button data-bs-toggle="modal" data-bs-target="#modalEditar" onclick="mostrar('+json.id+')" class="btn btn-warning modalEditar">Editar</button></td>'
        elemento.innerHTML += '<td><button onclick="eliminar('+json.id+')" class="btn btn-danger">Eliminar</button></td>'
        tabla.appendChild(elemento)
    })

    //limpiar inputs
    document.getElementById("nombre").value = ""
    document.getElementById("lanzamiento").value = ""
    document.getElementById("desarrollador").value = ""

    //cerrar modal
    document.getElementById("cerrar").click()

})

//mostrar los datos en el modal para editarlos
function mostrar(id){

    url = 'http://localhost/apiFrameworks/?id='+id
    fetch(url)
    .then(response => response.json())
    .then(json => {
        document.getElementById("idEditar").value = json.id
        document.getElementById("nombreEditar").value = json.nombre
        document.getElementById("lanzamientoEditar").value = json.lanzamiento
        document.getElementById("desarrolladorEditar").value = json.desarrollador
    })

}

//edicion

formularioEditar.addEventListener('submit', function(e){

    e.preventDefault()
    let data_edicion = new FormData(formularioEditar)

    fetch(url, {
        method: 'POST',
        body: data_edicion
    })
    .then(response => response.json())
    .then(json =>{
        window.location = ""
    })

    //limpiar inputs
    document.getElementById("nombre").value = ""
    document.getElementById("lanzamiento").value = ""
    document.getElementById("desarrollador").value = ""

    //cerrar modal
    document.getElementById("cerrarEditar").click()


})



function eliminar(id){

    let datos_eliminar = new FormData()
    datos_eliminar.append('id', id)
    datos_eliminar.append('METHOD', 'DELETE')

    fetch('http://localhost/apiFrameworks/', {

        method: 'POST',
        body: datos_eliminar
    })
    .then(response => response.json())
    .then(json =>{
        window.location = ""
    })

}

