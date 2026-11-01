/* ===== Idioma elegido por la persona =====
   Cuando alguien elige un idioma con el selector, se guarda en su navegador. Al abrir o volver a cualquier
   página (también con "atrás"), si el idioma guardado es otro, la página se pasa sola a ese idioma.
   Así el idioma no "vuelve al original" en ninguna interacción. Google no guarda nada: ve cada URL en su idioma. */

const CLAVE = 'brisas-idioma'
const IDIOMAS = ['es', 'en', 'pt']

export function guardarIdioma(lang) {
  try { if (IDIOMAS.includes(lang)) window.localStorage.setItem(CLAVE, lang) } catch (e) {}
}

export function idiomaGuardado() {
  try {
    const lang = window.localStorage.getItem(CLAVE)
    return IDIOMAS.includes(lang) ? lang : null
  } catch (e) {
    return null
  }
}
