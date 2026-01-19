function generarJuego() {
    const texto = document.getElementById("resumen").value.trim();
    const tipo = document.getElementById("tipoJuego").value;
    const zona = document.getElementById("juego");

    if (!texto) {
        zona.innerHTML = "<p>⚠ Primero tenés que cargar un resumen.</p>";
        return;
    }

    const frases = texto.split(".").filter(t => t.length > 20);

    if (tipo === "quiz") {
        zona.innerHTML = "<h2>Preguntas de opción múltiple</h2>" +
        frases.slice(0,3).map((f,i)=>
        `<p><b>Pregunta ${i+1}:</b> ${f.split(" ").slice(0,8).join(" ")}...</p>`).join("");
    }

    if (tipo === "vf") {
        zona.innerHTML = "<h2>Verdadero o Falso</h2>" +
        frases.slice(0,4).map(f=> 
        `<p>${f} — ¿Es verdadero o falso?</p>`).join("");
    }

    if (tipo === "flash") {
        zona.innerHTML = "<h2>Tarjetas de estudio</h2>" +
        frases.slice(0,5).map((f,i)=> 
        `<div class='card'><b>Tarjeta ${i+1}:</b> ${f}</div>`).join("");
    }

    if (tipo === "memoria") {
        zona.innerHTML = "<h2>Juego de memoria</h2><p>(Versión básica textual)</p>" +
        frases.slice(0,6).map(f=> `<p>🧩 Palabra clave: ${f.split(" ")[0]}</p>`).join("");
    }

    if (tipo === "drag") {
        zona.innerHTML = "<h2>Ordenar conceptos</h2>" +
        frases.slice(0,4).map(f=> 
        `<div draggable='true'>${f.split(" ").slice(0,5).join(" ")}</div>`).join("");
    }
}
