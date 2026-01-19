function limpiarTexto(t) {
  return (t || "")
    .replace(/\s+/g, " ")
    .replace(/[“”]/g, '"')
    .replace(/[’‘]/g, "'")
    .trim();
}

function partirEnOraciones(texto) {
  const limpio = limpiarTexto(texto);
  // separa por punto, salto de línea o punto y coma
  const partes = limpio.split(/[\.\n;]+/).map(s => s.trim()).filter(s => s.length >= 30);
  // si queda poco, también separa por " - " o "→"
  if (partes.length < 4) {
    return limpio.split(/→| - /).map(s => s.trim()).filter(s => s.length >= 30);
  }
  return partes;
}

function generarVFInteractivo(frases) {
  // Armamos 5 preguntas y marcamos aleatoriamente cuál es "verdadero".
  // (No podemos saber la verdad real sin un modelo, pero al menos permite jugar.)
  const preguntas = frases.slice(0, 5).map((f, i) => {
    const esVerdadero = Math.random() < 0.5;
    return { id: i, texto: f, respuesta: esVerdadero ? "V" : "F" };
  });

  let html = `
    <h2>Verdadero o Falso</h2>
    <p style="margin-top:0;color:#444;">Elegí una opción en cada pregunta. Al final te muestra el puntaje.</p>
    <div id="vf-lista"></div>
    <button id="vf-finalizar" style="margin-top:12px;width:100%;padding:12px;border-radius:10px;border:none;background:#4e5af7;color:white;cursor:pointer;">
      Finalizar y ver puntaje
    </button>
    <div id="vf-resultado" style="margin-top:12px;font-weight:bold;"></div>
  `;

  // Render de preguntas con botones
  setTimeout(() => {
    const cont = document.getElementById("vf-lista");
    cont.innerHTML = preguntas.map(p => `
      <div data-id="${p
