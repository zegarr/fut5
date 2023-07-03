let jugSel = [];
let jugPreCar = [
    { nombre: "enzo", valor: 10 },
    { nombre: "pedro", valor: 9 },
    { nombre: "adrian", valor: 7 },
    { nombre: "rebasti", valor: 8 },
    { nombre: "nico", valor: 7 },
    { nombre: "ignacio", valor: 8 },
    { nombre: "diegoJp", valor: 7 },
    { nombre: "jp", valor: 7 },
    { nombre: "antony", valor: 5 },
    { nombre: "pelado", valor: 6 },
    { nombre: "eze", valor: 5 },
    { nombre: "felipe", valor: 8 },
    { nombre: "piyu", valor: 5 },
    { nombre: "emiliano", valor: 5 },
    { nombre: "botta", valor: 4 },
    { nombre: "facuBarrios", valor: 4 },
    { nombre: "caracas", valor: 2 },
    { nombre: "guille", valor: 5 },
    { nombre: "tubino", valor: 4 },
    { nombre: "mauri", valor: 5 },
    { nombre: "joaquin", valor: 8 },
    { nombre: "pablo", valor: 7 },
    { nombre: "antonio", valor: 3 },
    { nombre: "fede moreno", valor: 1 }
];

let errores = {
    cantMaxJugadores: "Maximo 10 jugadores",
    cantMaxNombre: "Nombre entre 3 y 15 caracteres",
    cantMaxPuntaje: "Puntaje Entre 1 y 10",
    faltanJugadores: "Deben ser 10 jugadores"
};

const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: 'white',
    customClass: {
        popup: 'colored-toast'
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true
});

$(document).ready(function () {
    mostrarJugadoresPrecargados();
    $("#btnGenerar").on("click", generarEquipos);
    $("#btnAgregarJugador").on("click", nuevoJugador);
    $("input[type='checkbox']").on("click", function () {
        console.log("asd");
        if ($("input[type='checkbox']:checked").length == 10) {
            $("#btnRandom").removeAttr('hidden');
        } else {
            $("#btnRandom").attr('hidden', 'true');
        }
    });
});

function nuevoJugador() {
    let nom = $("#txtNom").val();
    let pun = $("#txtPun").val();
    if ((!isNaN(parseInt(pun)) && (pun >= 1 && pun <= 10))) {
        if ((nom.length >= 3 && nom.length < 15)) {

            if (jugSel.length < 10) {
                jugSel.push({ nombre: nom, valor: parseInt(pun) });
                mostrarJugadoresSeleccionados();
            } else {
                Toast.fire({
                    icon: 'error',
                    title: errores.cantMaxJugadores
                });
            }
        } else {
            Toast.fire({
                icon: 'error',
                title: errores.cantMaxNombre
            });
        }
    } else {
        Toast.fire({
            icon: 'error',
            title: errores.cantMaxPuntaje
        });
    }
    $("#txtNom").val("");
    $("#txtPun").val("");
}

function generarEquipos() {
    if (jugSel.length == 10) {
        var equipo1 = [];
        var equipo2 = [];
        let sel;
        var cantPunt1 = 0;
        var cantPunt2 = 0;
        var primera = true;
        while (primera || Math.abs(cantPunt2 - cantPunt1) > 4) {
            primera = false;
            equipo1 = [];
            equipo2 = [];
            cantPunt1 = 0;
            cantPunt2 = 0;
            sel = jugSel.slice();//clonar para eviar referencias
            for (var i = 0; i < 5; i++) {
                var randomIndex = Math.floor(Math.random() * sel.length);
                equipo1.push({ nombre: sel[randomIndex].nombre, valor: sel[randomIndex].valor });//agrego a equipo1
                cantPunt1 += sel[randomIndex].valor;
                sel.splice(randomIndex, 1);//elimino

                randomIndex = Math.floor(Math.random() * sel.length);
                equipo2.push({ nombre: sel[randomIndex].nombre, valor: sel[randomIndex].valor });//agrego a equipo2
                cantPunt2 += sel[randomIndex].valor;
                sel.splice(randomIndex, 1);//elimino
            }
        }
        let res = equipo1.concat(equipo2);//uno los dos equipos
        //muestro los equipos resultantes y el puntaje total para cada uno
        mostrarJugadoresSeleccionados(res);
    } else {
        Toast.fire({
            icon: 'warning',
            title: errores.faltanJugadores
        });
    }
}

function agregarJugador() {
    if (jugSel.length < 10) {
        let indice = $(this).attr('j');
        jugSel.push(jugPreCar[indice]);
        jugPreCar.splice(indice, 1);
        mostrarJugadoresPrecargados();
        mostrarJugadoresSeleccionados();
    } else {
        Toast.fire({
            icon: 'error',
            title: errores.cantMaxJugadores
        });
    }
}
function eliminarJugador() {
    let indice = $(this).attr('j');
    jugPreCar.push(jugSel[indice]);
    jugSel.splice(indice, 1);
    mostrarJugadoresPrecargados();
    mostrarJugadoresSeleccionados();
    if (jugSel.length === 0) {
        reiniciarTotales();
    }
}

function reiniciarTotales() {
    $("#totalEquipo1").html("0");
    $("#totalEquipo2").html("0");
}

function mostrarJugadoresPrecargados() {
    $("#jugadoresPreCargados").html("");
    jugPreCar.sort((a, b) => {
        return b.valor - a.valor;
    });
    jugPreCar.forEach(function (valor, indice, array) {
        let datosBtn = {
            "indice": indice,
            "claseEvento": "agregarJugador",
            "icono": "fa-plus"
        }
        let html = generarLinea(valor.nombre, valor.valor, datosBtn);
        $("#jugadoresPreCargados").append(html);
    });
    $(".agregarJugador").on("click", agregarJugador);
}

function mostrarJugadoresSeleccionados(equipos = null) {
    let equi = jugSel;
    if (equipos !== null) {
        equi = equipos;
    }
    $("#equipo1").html("");
    $("#equipo2").html("");
    //ordeno jugadores Seleccionados
    //equi.sort((a,b)=>{return b.valor - a.valor;});
    let pos = 0, nroE = 1;
    let total = 0;
    equi.forEach(function (jugador, indice) {
        pos++;
        if (pos == 6) {
            nroE = 2;
            total = 0;
        }
        let datosBtn = {
            "indice": indice,
            "claseEvento": "eliminarJugador",
            "icono": "fa-trash"
        }
        let html = generarLinea(jugador.nombre, jugador.valor, datosBtn);
        $("#equipo" + nroE).append(html);
        total += jugador.valor
        $("#totalEquipo" + nroE).html(total);
    });
    $(".eliminarJugador").on("click", eliminarJugador);
}

function generarLinea(nombre, puntaje, datosBtn) {
    let colores = generarArrayColores("1");
    let coloresBorde = generarArrayColores("0.2");
    let coloresFondo = generarArrayColores("0.3");
    let colorPuntaje = coloresFondo[puntaje - 1];
    let colorPuntajeTexto = darkenRGBA(colores[puntaje - 1], 30);
    let colorPuntajeBorde = coloresBorde[puntaje - 1];
    let ret = '<tr><td><span class="text-sm">' + nombre + '</span></td>';
    ret += '<td class="align-middle text-center"><span class="badge badge-sm text-lg" style="color:' + colorPuntajeTexto + ';border:1px solid ' + colorPuntajeBorde + '; background-color:' + colorPuntaje + ';">' + puntaje + '</span></td>';
    ret += '<td class="text-sm text-end font-weight-semibold text-dark"><button class="btn btn-white btn-icon m-0 px-3 ' + datosBtn.claseEvento + '" j="' + datosBtn.indice + '"><i class="fa ' + datosBtn.icono + '"></i></button></td></tr>';
    return ret;
}

function generarArrayColores(opacidad) {
    return ["rgba(255, 0, 0, " + opacidad + ")", "rgba(255, 51, 0, " + opacidad + ")", "rgba(255, 102, 0, " + opacidad + ")", "rgba(255, 153, 0, " + opacidad + ")", "rgba(255, 204, 0, " + opacidad + ")", "rgba(255, 255, 0, " + opacidad + ")", "rgba(204, 255, 0, " + opacidad + ")", "rgba(153, 255, 0, " + opacidad + ")", "rgba(102, 255, 0, " + opacidad + ")", "rgba(51, 255, 0, " + opacidad + ")"];
}

function darkenRGBA(rgba, percentage) {
    // Extract the RGBA components
    const match = rgba.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
    if (!match) {
        throw new Error('Invalid RGBA code');
    }

    let [, r, g, b, a] = match;

    // Convert the percentage to a decimal value
    const darkness = 1 - percentage / 100;

    // Apply darkness to the RGB components
    r = Math.round(r * darkness);
    g = Math.round(g * darkness);
    b = Math.round(b * darkness);

    // Ensure the RGB values are within the valid range
    r = Math.max(0, Math.min(r, 255));
    g = Math.max(0, Math.min(g, 255));
    b = Math.max(0, Math.min(b, 255));

    // Create the darker RGBA code
    const darkerRGBA = `rgba(${r}, ${g}, ${b}, ${a})`;
    return darkerRGBA;
}
