function fetchelEments(tiempoActual) {
    document.getElementById("tablaElementos").innerHTML = ` <tr>
                                                                <th>Avatar</th>
                                                                <th>Nombre</th>
                                                                <th>Apellido</th>
                                                                <th>Correo</th>
                                                            </tr>`
    fetch('https://reqres.in/api/users?delay=3')
        .then(response => response.json())
        .then(json => {
            //console.log(json.data[2]);
            for (let i = 1; i < json.data.length; i++) {
                let row = `<tr>
                                <td><img class="round" src="${json.data[i].avatar}"> </td>
                                <td><span class="firstName">${json.data[i].first_name}</span> </td>
                                <td><span class="lastName">${json.data[i].last_name}</span> </td>
                                <td><p class="email">${json.data[i].email}</p> </td>
                            </tr>`
                //console.log(json.data[i]);

                document.getElementById("tablaElementos").innerHTML += row;

            }
            localStorage.setItem("jsonActual", JSON.stringify(json.data));
            //localStorage.setItem.jsonActual = json.data;
            localStorage.tiempoActual = tiempoActual;

        })
}

function loadLocalStorage(a) {
    let datos = JSON.parse(localStorage.getItem("jsonActual"));
    console.log("Tiempo de vida restante: " + a);
    document.getElementById("tablaElementos").innerHTML = ` <tr>
                                                                <th>Avatar</th>
                                                                <th>Nombre</th>
                                                                <th>Apellido</th>
                                                                <th>Correo</th>
                                                            </tr>`;
    //console.log(datos.length);
    for(let i=1; i<datos.length; i++){
                let row =   `<tr>
                                <td><img class="round" src="${datos[i].avatar}"> </td>
                                <td><span class="firstName">${datos[i].first_name}</span> </td>
                                <td><span class="lastName">${datos[i].last_name}</span> </td>
                                <td><p class="email">${datos[i].email}</p> </td>
                            </tr>`
                //console.log(json.data[i]);
                
                document.getElementById("tablaElementos").innerHTML += row;
                
            }

}

function verificarTiempoVida() {


    let a = localStorage.getItem("tiempoActual");
    console.log(a);
    let b = Date.now();
    a = (Number(a) + (1000 * 60));
    b = Number(b);
    console.log(a - b);
    if (a === null) {
        console.log("Descargando datos");
        fetchelEments(b);
    }
    else if (a - b < 0) {
        console.log("Tiempo de vida exedido");
        fetchelEments(b);
    }
    else {
        loadLocalStorage(a - b);
    }
}

/* return `
.then(json => {
            console.log(json.data);
            const markup = json.data.map(el => {
                return `
            <li class="card-container">
                <div class="image-container">
                  <img class="round" src="${el.avatar}">
        
                </div>
                 <div class="name-container"> 
                     <span class="firstName">${el.first_name}</span>
                     <span class="lastName">${el.last_name}</span>
                    
                 </div> 
                 <p class="email">${el.email}</p>  
                </li>
            `
            });
            console.log(markup);
            document.querySelector('.list-container').innerHTML = markup.join('');

        })
` */