/* ===== SEO: dominio oficial, idiomas y textos por idioma ===== */

export const SITE_URL = 'https://brisas-de-oro-next.vercel.app'

export const LOCALES = ['es', 'en', 'pt']

// '/' para español (idioma por defecto), '/en' y '/pt' para el resto
export const localePath = lang => (lang === 'es' ? '/' : '/' + lang)

export const SEO = {
  es: {
    title: 'Hotel y Cabañas Brisas de Oro | Villa Carlos Paz, Córdoba',
    description: 'Complejo familiar en Villa Carlos Paz, Córdoba. Cabañas y habitaciones de hotel con pileta, desayuno buffet casero y atención personalizada de sus dueños. A pasos del río San Antonio y las Sierras de Córdoba.',
    ogTitle: 'Hotel y Cabañas Brisas de Oro | Villa Carlos Paz',
    ogDescription: 'Complejo familiar atendido por sus dueños. Cabañas y habitaciones con pileta, desayuno buffet casero y ambiente hogareño en las Sierras de Córdoba.',
    twitterDescription: 'Complejo familiar con pileta, desayuno buffet casero y atención personalizada. En las Sierras de Córdoba.',
    ogLocale: 'es_AR',
    keywords: 'hotel Villa Carlos Paz, cabañas Villa Carlos Paz, Brisas de Oro, hotel cabañas Brisas de Oro, complejo familiar Villa Carlos Paz, cabañas con pileta Carlos Paz, alojamiento Villa Carlos Paz, cabañas sierras de Córdoba, hotel familiar Córdoba, cabañas Córdoba Argentina, alquiler cabañas Carlos Paz, hospedaje Villa Carlos Paz, apart hotel Carlos Paz, cabañas con desayuno Carlos Paz, turismo Villa Carlos Paz, vacaciones sierras Córdoba, cabañas río San Antonio, Playas de Oro Carlos Paz, complejo turístico Córdoba, brisas de oro Carlos Paz, cabañas atendidas por sus dueños Villa Carlos Paz, alojamiento familiar con pileta sierras Córdoba, cabañas con asador y pileta Carlos Paz, hotel boutique Villa Carlos Paz, alquiler temporario Villa Carlos Paz, complejo de cabañas y habitaciones Carlos Paz, cabañas para familias sierras de Córdoba, hospedaje con desayuno buffet Carlos Paz, cabañas económicas Villa Carlos Paz, alojamiento cerca del río San Antonio Carlos Paz',
  },
  en: {
    title: 'Brisas de Oro Hotel & Cabins | Villa Carlos Paz, Córdoba, Argentina',
    description: 'Family-run complex in Villa Carlos Paz, Córdoba, Argentina. Cabins and hotel rooms with pool, homemade buffet breakfast and personal attention from the owners. Steps from the San Antonio River and the Córdoba hills.',
    ogTitle: 'Brisas de Oro Hotel & Cabins | Villa Carlos Paz',
    ogDescription: 'Family-run complex looked after by its owners. Cabins and rooms with pool, homemade buffet breakfast and a homely atmosphere in the Córdoba hills.',
    twitterDescription: 'Family-run complex with pool, homemade buffet breakfast and personal attention. In the Córdoba hills.',
    ogLocale: 'en_US',
  },
  pt: {
    title: 'Hotel e Cabanas Brisas de Oro | Villa Carlos Paz, Córdoba, Argentina',
    description: 'Complexo familiar em Villa Carlos Paz, Córdoba, Argentina. Cabanas e quartos de hotel com piscina, café da manhã buffet caseiro e atendimento personalizado dos proprietários. A poucos passos do Rio San Antonio e das serras de Córdoba.',
    ogTitle: 'Hotel e Cabanas Brisas de Oro | Villa Carlos Paz',
    ogDescription: 'Complexo familiar atendido pelos proprietários. Cabanas e quartos com piscina, café da manhã buffet caseiro e clima acolhedor nas serras de Córdoba.',
    twitterDescription: 'Complexo familiar com piscina, café da manhã buffet caseiro e atendimento personalizado. Nas serras de Córdoba.',
    ogLocale: 'pt_BR',
  },
}

export const HOTEL_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': ['Hotel', 'LodgingBusiness'],
  name: 'Hotel y Cabañas Brisas de Oro',
  alternateName: ['Brisas de Oro', 'Complejo Brisas de Oro', 'Brisas de Oro Carlos Paz'],
  description: 'Complejo familiar en Villa Carlos Paz atendido por sus dueños. 8 cabañas y 8 habitaciones disponibles — incluyendo 2 apart hotel. Pileta compartida, desayuno buffet casero, parque, asadores privados y WiFi. A pasos del Río San Antonio y las Sierras de Córdoba.',
  url: SITE_URL + '/',
  telephone: '+54 9 3541 548053',
  email: 'brisasdeoro@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. Ramón J. Cárcano 2590',
    addressLocality: 'Villa Carlos Paz',
    addressRegion: 'Córdoba',
    addressCountry: 'AR',
    postalCode: 'X5152',
  },
  geo: { '@type': 'GeoCoordinates', latitude: -31.4285, longitude: -64.4872 },
  image: [
    'https://img.alqastatic.com/_propiedades_/aw75/o_aw75_Cabana_8YKDOJVE.jpg',
    'https://img.alqastatic.com/_propiedades_/aw75/o_aw75_Cabana_DDWSIFEL.jpg',
  ],
  priceRange: '$$',
  currenciesAccepted: 'ARS',
  paymentAccepted: 'Cash, Credit Card, Bank Transfer',
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Pileta', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Desayuno buffet', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'WiFi gratuito', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Estacionamiento gratuito', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Aire acondicionado', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Mascotas permitidas', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Asador', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Parque', value: true },
  ],
  checkinTime: '13:00',
  checkoutTime: '10:00',
  petsAllowed: 'Restricted to cabins',
  numberOfRooms: 16,
  numberOfRoomsNote: '8 cabañas y 8 habitaciones disponibles para huéspedes, incluyendo 2 apart hotel',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '5.0', reviewCount: '10', bestRating: '5' },
  sameAs: [
    'https://www.welcomeargentina.com/villacarlospaz/cabanas-brisas-de-oro.html',
    'https://www.alquilerargentina.com/alojamientos/aw75-Caba%C3%B1a-Hotel-y-Caba%C3%B1as-Brisas-de-Oro-Villa-Carlos-Paz.html',
    'https://www.tripadvisor.com.ar/Hotel_Review-g312774-d5777680-Reviews-Brisas_de_Oro_Hotel_y_Cabanas-Villa_Carlos_Paz_Province_of_Cordoba_Central_Argentina.html',
  ],
  hasMap: 'https://maps.google.com/?q=Av.+Ramón+J.+Cárcano+2590,+Villa+Carlos+Paz',
  tourBookingPage: 'https://wa.me/543541548053',
}

/* ===== Traducción del markup en el servidor =====
   Replica lo que hace applyTranslations() en el navegador, pero sobre el string HTML,
   para que /en y /pt lleguen ya traducidos (Google no ejecuta esa traducción). */

const escapeText = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const escapeAttr = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;')

function setAttr(tag, name, value) {
  const re = new RegExp('(\\s' + name + '=")[^"]*(")')
  if (re.test(tag)) return tag.replace(re, (_, a, b) => a + escapeAttr(value) + b)
  return tag.replace(/\s*(\/?)>$/, (_, slash) => ' ' + name + '="' + escapeAttr(value) + '"' + (slash ? ' /' : '') + '>')
}

// Devuelve la posición del cierre </name> que corresponde a la etiqueta abierta antes de `from`
function findClose(html, name, from) {
  const re = new RegExp('<(/?)' + name + '\\b[^>]*?(/?)>', 'gi')
  re.lastIndex = from
  let depth = 1, m
  while ((m = re.exec(html))) {
    if (m[1]) { if (--depth === 0) return m.index }
    else if (!m[2]) depth++
  }
  return -1
}

export function translateHtml(html, t, lang) {
  if (!t || lang === 'es') return html

  // Atributos: placeholder, aria-label y abreviatura mobile
  html = html.replace(/<[a-zA-Z][^>]*>/g, tag => {
    let out = tag, m
    if ((m = tag.match(/\sdata-i18n-ph="([^"]+)"/)) && t[m[1]] !== undefined) out = setAttr(out, 'placeholder', t[m[1]])
    if ((m = tag.match(/\sdata-i18n-aria="([^"]+)"/)) && t[m[1]] !== undefined) out = setAttr(out, 'aria-label', t[m[1]])
    if ((m = tag.match(/\sdata-abbr-mobile-i18n="([^"]+)"/)) && t[m[1]] !== undefined) out = setAttr(out, 'data-abbr-mobile', t[m[1]])
    return out
  })

  // Contenido: data-i18n (HTML) y data-i18n-opt (texto)
  const openRe = /<([a-zA-Z][\w-]*)\b[^>]*?\sdata-i18n(-opt)?="([^"]+)"[^>]*>/g
  let result = '', last = 0, m
  while ((m = openRe.exec(html))) {
    const [openTag, name, isOpt, key] = m
    if (t[key] === undefined) continue
    const start = m.index + openTag.length
    const end = findClose(html, name, start)
    if (end < 0) continue
    result += html.slice(last, start) + (isOpt ? escapeText(t[key]) : t[key])
    last = end
    openRe.lastIndex = end
  }
  return result + html.slice(last)
}
