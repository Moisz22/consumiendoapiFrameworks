let tabla = document.getElementById("tabla")
let busqueda = document.getElementById("boton_busqueda")
let search = document.getElementById("search")
let url = 'http://localhost/apiFrameworks/'


busqueda.addEventListener('click', function(e){

    let search = document.getElementById("search")

    console.log(search.value)

    e.preventDefault()

    if(search.value === null || search.value === ''){

        url = 'http://localhost/apiFrameworks/'
        
    }else{

        url = 'http://localhost/apiFrameworks/?id='+search.value

    }

    console.log(url)
    console.log(search.value)

    fetch(url)
    .then(response => response.json())
    .then(json => {

        if(json.length == undefined){

            tabla.innerHTML = '<tr><th>ID</th><th>NOMBRE</th><th>LANZAMIENTO</th><th>DESARROLLADOR</th></tr>';

            let elemento = document.createElement('tr')
            elemento.innerHTML += '<td>'+ json.id + '</td>'
            elemento.innerHTML += '<td>' + json.nombre + '</td>'
            elemento.innerHTML += '<td>' + json.lanzamiento + '</td>'
            elemento.innerHTML += '<td>' + json.desarrollador + '</td>'
            tabla.appendChild(elemento)
            url = null

        }else{

            tabla.innerHTML = '<tr><th>ID</th><th>NOMBRE</th><th>LANZAMIENTO</th><th>DESARROLLADOR</th></tr>';

            for(i=0; i< json.length ; i++){
                let elemento = document.createElement('tr')
                elemento.innerHTML += '<td>'+ json[i].id + '</td>'
                elemento.innerHTML += '<td>' + json[i].nombre + '</td>'
                elemento.innerHTML += '<td>' + json[i].lanzamiento + '</td>'
                elemento.innerHTML += '<td>' + json[i].desarrollador + '</td>'
                tabla.appendChild(elemento)
                url = null
            }

        }

      })

})



      




  
  




