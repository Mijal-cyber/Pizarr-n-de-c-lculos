// ================================
// CONVERSOR DE MONEDAS
// ================================

// Según el ejemplo del sketch:
// $20.000 = 13 U$S
const PESOS_POR_DOLAR = 20000 / 13;

const amountInput = document.getElementById("amount");
const result = document.getElementById("result");
const convertBtn = document.getElementById("convertBtn");

function convertirMoneda() {
    const pesos = Number(amountInput.value);

    if (!Number.isFinite(pesos) || pesos < 0) {
        result.textContent = "Ingresá un valor válido";
        return;
    }

    const dolares = pesos / PESOS_POR_DOLAR;
    result.textContent = `${dolares.toFixed(2)} U$S`;
}

convertBtn.addEventListener("click", convertirMoneda);
amountInput.addEventListener("input", convertirMoneda);


// ================================
// NOTITAS
// ================================

const noteText = document.getElementById("noteText");
const addNoteBtn = document.getElementById("addNoteBtn");
const notesGrid = document.getElementById("notesGrid");

// Colores que siguen el estilo del sketch.
const noteColors = ["note-red", "note-purple", "note-yellow", "note-white"];

function agregarNota() {
    const texto = noteText.value.trim();

    if (texto === "") {
        return;
    }

    const nuevaNota = document.createElement("article");
    nuevaNota.classList.add("note");

    // Elegimos un color según la cantidad de notas creadas.
    const notasActuales = notesGrid.querySelectorAll(".note").length;
    nuevaNota.classList.add(noteColors[notasActuales % noteColors.length]);

    const contenido = document.createElement("div");
    contenido.classList.add("note-content");
    contenido.textContent = texto;

    nuevaNota.appendChild(contenido);
    notesGrid.appendChild(nuevaNota);

    noteText.value = "";
    noteText.focus();
}

addNoteBtn.addEventListener("click", agregarNota);

noteText.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        agregarNota();
    }
});
