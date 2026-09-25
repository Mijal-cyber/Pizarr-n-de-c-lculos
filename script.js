// ========================================
// CONVERSOR DE MONEDAS
// ========================================

// Según el diseño:
// $20.000 = 13 U$S
const PESOS_POR_DOLAR = 20000 / 13;

const nombreInput = document.getElementById("noteName");
const amountInput = document.getElementById("amount");
const result = document.getElementById("result");
const convertBtn = document.getElementById("convertBtn");


// Calcula los dólares automáticamente
function convertirMoneda() {
    const pesos = Number(amountInput.value);

    if (pesos <= 0 || isNaN(pesos)) {
        result.textContent = "0 U$S";
        return 0;
    }

    const dolares = pesos / PESOS_POR_DOLAR;

    result.textContent = `${dolares.toFixed(2)} U$S`;

    return dolares;
}


// Actualizar conversión mientras escribimos
amountInput.addEventListener("input", convertirMoneda);


// ========================================
// NOTITAS
// ========================================

const notesGrid = document.getElementById("notesGrid");

const noteText = document.getElementById("noteText");
const addNoteBtn = document.getElementById("addNoteBtn");

const colores = [
    "note-red",
    "note-purple",
    "note-yellow",
    "note-white"
];


// ----------------------------------------
// GUARDAR NOTAS
// ----------------------------------------

function guardarNotas() {
    const notas = [];

    document.querySelectorAll(".note").forEach(nota => {
        notas.push({
            titulo: nota.querySelector("h2")
                ? nota.querySelector("h2").textContent
                : "",
            texto: nota.querySelector("p, .note-content")
                ? nota.querySelector("p, .note-content").textContent
                : "",
            color: [...nota.classList].find(clase =>
                colores.includes(clase)
            )
        });
    });

    localStorage.setItem("notas", JSON.stringify(notas));
}


// ----------------------------------------
// CREAR UNA NOTA DEL CONVERSOR
// ----------------------------------------

function agregarNotaConversion() {

    const nombre = nombreInput.value.trim();
    const pesos = Number(amountInput.value);

    if (nombre === "") {
        alert("Escribí el nombre de la notita.");
        nombreInput.focus();
        return;
    }

    if (pesos <= 0 || isNaN(pesos)) {
        alert("Ingresá una cantidad válida de pesos.");
        amountInput.focus();
        return;
    }

    const dolares = convertirMoneda();

    crearNota(
        nombre,
        `$${pesos} = ${dolares.toFixed(2)} U$S`
    );

    // Limpiar los campos
    nombreInput.value = "";
    amountInput.value = "";
    result.textContent = "0 U$S";

    guardarNotas();
}


// ----------------------------------------
// CREAR UNA NOTA SIMPLE
// ----------------------------------------

function agregarNotaSimple() {

    const texto = noteText.value.trim();

    if (texto === "") {
        alert("Escribí algo para agregar a la notita.");
        noteText.focus();
        return;
    }

    crearNota("", texto);

    noteText.value = "";

    guardarNotas();
}


// ----------------------------------------
// FUNCIÓN GENERAL PARA CREAR NOTAS
// ----------------------------------------

function crearNota(titulo, texto, color = null) {

    const nota = document.createElement("article");

    nota.classList.add("note");

    // Si no tiene color, elegir uno automáticamente
    if (!color) {
        const cantidad = document.querySelectorAll(".note").length;
        color = colores[cantidad % colores.length];
    }

    nota.classList.add(color);


    // Si tiene título
    if (titulo !== "") {

        const h2 = document.createElement("h2");
        h2.textContent = titulo;

        const p = document.createElement("p");
        p.textContent = texto;

        nota.appendChild(h2);
        nota.appendChild(p);

    } else {

        const contenido = document.createElement("div");

        contenido.classList.add("note-content");
        contenido.textContent = texto;

        nota.appendChild(contenido);
    }


    // Doble clic para eliminar
    nota.addEventListener("dblclick", function() {

        const confirmar = confirm(
            "¿Querés eliminar esta notita?"
        );

        if (confirmar) {
            nota.remove();
            guardarNotas();
        }
    });


    notesGrid.appendChild(nota);
}


// ----------------------------------------
// BOTONES
// ----------------------------------------

convertBtn.addEventListener(
    "click",
    agregarNotaConversion
);

addNoteBtn.addEventListener(
    "click",
    agregarNotaSimple
);


// También se puede agregar una nota
// simple presionando ENTER
noteText.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        agregarNotaSimple();
    }

});


// ========================================
// CARGAR NOTAS AL ABRIR LA PÁGINA
// ========================================

function cargarNotas() {

    const notasGuardadas =
        JSON.parse(localStorage.getItem("notas")) || [];

    notasGuardadas.forEach(nota => {

        crearNota(
            nota.titulo,
            nota.texto,
            nota.color
        );

    });
}


// Iniciar aplicación
cargarNotas();
