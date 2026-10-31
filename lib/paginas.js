/* ===== Páginas del sitio: ruta, título y descripción por idioma =====
   La portada usa SEO (lib/seo.js); el resto de las secciones tiene su propia URL. */
import { SITE_URL, SEO } from './seo'

const MARCA = {
  es: 'Hotel y Cabañas Brisas de Oro',
  en: 'Brisas de Oro Hotel & Cabins',
  pt: 'Hotel e Cabanas Brisas de Oro',
}

export const PAGINAS = {
  inicio: { path: '' },
  nosotros: {
    path: 'nosotros',
    nombre: { es: 'Nosotros', en: 'About us', pt: 'Sobre nós' },
    descripcion: {
      es: 'Brisas de Oro es un complejo familiar en Villa Carlos Paz atendido directamente por sus dueños: trato personalizado, desayuno casero y El Algarrobo, un espacio compartido bajo un algarrobo bicentenario.',
      en: 'Brisas de Oro is a family-run resort in Villa Carlos Paz looked after directly by its owners: personal attention, homemade breakfast and El Algarrobo, a shared space under a 200-year-old carob tree.',
      pt: 'O Brisas de Oro é um complexo familiar em Villa Carlos Paz atendido diretamente pelos proprietários: atendimento personalizado, café da manhã caseiro e El Algarrobo, um espaço compartilhado sob uma alfarrobeira bicentenária.',
    },
  },
  alojamientos: {
    path: 'alojamientos',
    nombre: { es: 'Alojamientos', en: 'Accommodations', pt: 'Hospedagem' },
    descripcion: {
      es: 'Cabañas para 3 a 8 personas, habitaciones de hotel, apart hotel y casa con pileta en Icho Cruz. Comodidades, horarios y normas antes de reservar en Brisas de Oro, Villa Carlos Paz.',
      en: 'Cabins for 3 to 8 guests, hotel rooms, apart hotel and a house with pool in Icho Cruz. Amenities, check-in times and rules before booking at Brisas de Oro, Villa Carlos Paz.',
      pt: 'Chalés para 3 a 8 pessoas, quartos de hotel, apart hotel e casa com piscina em Icho Cruz. Comodidades, horários e normas antes de reservar no Brisas de Oro, Villa Carlos Paz.',
    },
  },
  servicios: {
    path: 'servicios',
    nombre: { es: 'Servicios', en: 'Services', pt: 'Serviços' },
    descripcion: {
      es: 'Pileta, desayuno buffet casero, parque, cochera techada, asadores, Wi-Fi, aire acondicionado, juegos para niños y servicio de mucamas en Brisas de Oro, Villa Carlos Paz.',
      en: "Pool, homemade buffet breakfast, gardens, covered parking, BBQ grills, Wi-Fi, air conditioning, kids' games and housekeeping at Brisas de Oro, Villa Carlos Paz.",
      pt: 'Piscina, café da manhã buffet caseiro, parque, garagem coberta, churrasqueiras, Wi-Fi, ar-condicionado, brinquedos para crianças e serviço de camareiras no Brisas de Oro, Villa Carlos Paz.',
    },
  },
  opiniones: {
    path: 'opiniones',
    nombre: { es: 'Opiniones', en: 'Reviews', pt: 'Avaliações' },
    descripcion: {
      es: 'Opiniones de huéspedes que se alojaron en Hotel y Cabañas Brisas de Oro, en Villa Carlos Paz, Córdoba.',
      en: 'Reviews from guests who stayed at Brisas de Oro Hotel & Cabins in Villa Carlos Paz, Córdoba.',
      pt: 'Avaliações de hóspedes que se hospedaram no Hotel e Cabanas Brisas de Oro, em Villa Carlos Paz, Córdoba.',
    },
  },
  ubicacion: {
    path: 'ubicacion',
    nombre: { es: 'Ubicación', en: 'Location', pt: 'Localização' },
    descripcion: {
      es: 'Av. Ramón J. Cárcano 2590, Villa Carlos Paz: a una cuadra del balneario Playas de Oro, junto al río San Antonio y a 2,5 km del centro. Mapa, distancias y clima en tiempo real.',
      en: 'Av. Ramón J. Cárcano 2590, Villa Carlos Paz: one block from Playas de Oro beach, next to the San Antonio River and 2.5 km from downtown. Map, distances and live weather.',
      pt: 'Av. Ramón J. Cárcano 2590, Villa Carlos Paz: a uma quadra do balneário Playas de Oro, ao lado do Rio San Antonio e a 2,5 km do centro. Mapa, distâncias e clima em tempo real.',
    },
  },
}

// '/', '/en', '/nosotros', '/en/nosotros', ...
export const rutaDe = (lang, path) => {
  const pre = lang === 'es' ? '' : '/' + lang
  return path ? pre + '/' + path : (pre || '/')
}

export const urlDe = (lang, path) => SITE_URL + rutaDe(lang, path)

// Textos del <head> de cada página
export function metaPagina(pagina, lang) {
  if (pagina === 'inicio') return SEO[lang]
  const p = PAGINAS[pagina]
  const title = `${p.nombre[lang]} | ${MARCA[lang]} · Villa Carlos Paz`
  return {
    title,
    description: p.descripcion[lang],
    ogTitle: title,
    ogDescription: p.descripcion[lang],
    twitterDescription: p.descripcion[lang],
    ogLocale: SEO[lang].ogLocale,
  }
}

export const INICIO_NOMBRE = { es: 'Inicio', en: 'Home', pt: 'Início' }

export function breadcrumbSchema(pagina, lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: INICIO_NOMBRE[lang], item: urlDe(lang, '') },
      { '@type': 'ListItem', position: 2, name: PAGINAS[pagina].nombre[lang], item: urlDe(lang, PAGINAS[pagina].path) },
    ],
  }
}
