/* ===== Páginas por tipo de alojamiento (/alojamientos/<slug>) =====
   Los textos salen de las mismas claves de traducción que usan las tarjetas de la portada (lib/i18n.js). */

const fotos = (carpeta, n, ext = 'webp') =>
  [`/fotos/${carpeta}/portada.${ext}`, ...Array.from({ length: n }, (_, i) => `/fotos/${carpeta}/${i + 1}.${ext}`)]

export const ALOJAMIENTOS = [
  {
    slug: 'cabana-chica', nombre: 'aloj.card1.name', alt: 'alt.cchica', wsp: 'cabChica',
    datos: ['aloj.card1.meta1', 'aloj.card1.meta2'],
    features: ['feat.frio', 'feat.cocina', 'feat.asador.priv', 'feat.limp3', 'feat.pet', 'feat.desayuno.opc'],
    fotos: fotos('cabana-chica', 5),
  },
  {
    slug: 'cabana-mediana', nombre: 'aloj.card2.name', alt: 'alt.cmediana', wsp: 'cabMed',
    datos: ['aloj.card2.meta1', 'aloj.card2.meta2'],
    features: ['feat.ac', 'feat.salamandra', 'feat.cocina', 'feat.asador.priv', 'feat.limp3', 'feat.pet', 'feat.desayuno.opc'],
    fotos: fotos('cabana-mediana', 6),
  },
  {
    slug: 'cabana-grande', nombre: 'aloj.card3.name', alt: 'alt.cgrande', wsp: 'cabGrande',
    datos: ['aloj.card3.meta1', 'aloj.card3.meta2'],
    features: ['feat.frio', 'feat.cocina', 'feat.asador.priv', 'feat.limp3', 'feat.pet', 'feat.desayuno.opc'],
    fotos: fotos('cabana-grande', 6),
  },
  {
    slug: 'habitaciones', nombre: 'aloj.card4.name', alt: 'alt.hab', wsp: 'habit',
    datos: ['aloj.card4.meta1', 'aloj.card4.body2'],
    variantes: ['aloj.card4.v1', 'aloj.card4.v2', 'aloj.card4.v3'],
    features: ['feat.ac24', 'feat.heladera', 'feat.asador.comp', 'feat.limp1', 'feat.desayuno.opc'],
    fotos: fotos('habitaciones', 7),
  },
  {
    slug: 'apart-hotel', nombre: 'aloj.card5.name', alt: 'alt.apart', wsp: 'apart',
    datos: ['aloj.card5.meta1', 'aloj.card5.body2'],
    features: ['feat.ac24', 'feat.minicocina', 'feat.heladera', 'feat.asador.comp', 'feat.limp1', 'feat.desayuno.opc'],
    fotos: fotos('apart-hotel', 4),
  },
  {
    slug: 'casa-icho-cruz', nombre: 'aloj.card6.name', alt: 'alt.casa', wsp: 'casa', fueraDelComplejo: true,
    datos: ['aloj.card6.meta1', 'aloj.card6.meta2', 'aloj.card6.ubic'],
    noIncluye: ['aloj.card6.noincluye.a', 'aloj.card6.noincluye.b'],
    features: ['feat.pileta.priv', 'feat.parque.priv', 'feat.asador.priv', 'feat.cocina', 'feat.wifi.tv', 'feat.pet'],
    fotos: fotos('casa', 5),
  },
]

export const getAlojamiento = slug => ALOJAMIENTOS.find(a => a.slug === slug)

// Mismos mensajes que usan los botones "Consultar" de la portada
export const WSP_NUMERO = '543541548053'
export const WSP_MSG = {
  es: {
    cabChica: 'Hola, quiero consultar por la cabaña chica.',
    cabMed: 'Hola, quiero consultar por la cabaña mediana.',
    cabGrande: 'Hola, quiero consultar por la cabaña grande.',
    habit: 'Hola, quiero consultar por una habitación.',
    apart: 'Hola, quiero consultar por el apart hotel.',
    casa: 'Hola, quiero consultar por la Casa con Pileta en Icho Cruz.',
  },
  en: {
    cabChica: 'Hello, I would like to inquire about the small cabin.',
    cabMed: 'Hello, I would like to inquire about the medium cabin.',
    cabGrande: 'Hello, I would like to inquire about the large cabin.',
    habit: 'Hello, I would like to inquire about a hotel room.',
    apart: 'Hello, I would like to inquire about the apart hotel.',
    casa: 'Hello, I would like to inquire about the House with Pool in Icho Cruz.',
  },
  pt: {
    cabChica: 'Olá, gostaria de consultar sobre o chalé pequeno.',
    cabMed: 'Olá, gostaria de consultar sobre o chalé médio.',
    cabGrande: 'Olá, gostaria de consultar sobre o chalé grande.',
    habit: 'Olá, gostaria de consultar sobre um quarto de hotel.',
    apart: 'Olá, gostaria de consultar sobre o apart hotel.',
    casa: 'Olá, gostaria de consultar sobre a Casa com Piscina em Icho Cruz.',
  },
}

// Textos propios de estas páginas
export const UI = {
  es: {
    inicio: 'Inicio', alojamientos: 'Alojamientos', volver: '← Ver todos los alojamientos',
    consultarWsp: 'Consultar por WhatsApp', verDisponibilidad: 'Ver disponibilidad',
    incluye: 'Comodidades', noIncluye: 'No incluye', variantes: 'Opciones', galeria: 'Fotos',
    otros: 'Otros alojamientos', en: 'en', lugar: 'Villa Carlos Paz', lugarCasa: 'Icho Cruz',
    pie: 'Hotel y Cabañas Brisas de Oro · Av. Ramón J. Cárcano 2590 · Villa Carlos Paz, Córdoba',
    nota: 'Sin pagos online · Confirmamos directamente por WhatsApp',
  },
  en: {
    inicio: 'Home', alojamientos: 'Accommodations', volver: '← See all accommodations',
    consultarWsp: 'Inquire on WhatsApp', verDisponibilidad: 'Check availability',
    incluye: 'Amenities', noIncluye: 'Not included', variantes: 'Options', galeria: 'Photos',
    otros: 'Other accommodations', en: 'in', lugar: 'Villa Carlos Paz', lugarCasa: 'Icho Cruz',
    pie: 'Brisas de Oro Hotel & Cabins · Av. Ramón J. Cárcano 2590 · Villa Carlos Paz, Córdoba',
    nota: 'No online payments · Direct confirmation via WhatsApp',
  },
  pt: {
    inicio: 'Início', alojamientos: 'Hospedagem', volver: '← Ver todas as hospedagens',
    consultarWsp: 'Consultar pelo WhatsApp', verDisponibilidad: 'Ver disponibilidade',
    incluye: 'Comodidades', noIncluye: 'Não inclui', variantes: 'Opções', galeria: 'Fotos',
    otros: 'Outras hospedagens', en: 'em', lugar: 'Villa Carlos Paz', lugarCasa: 'Icho Cruz',
    pie: 'Hotel e Cabanas Brisas de Oro · Av. Ramón J. Cárcano 2590 · Villa Carlos Paz, Córdoba',
    nota: 'Sem pagamentos online · Confirmação direta via WhatsApp',
  },
}

// Texto plano a partir de los valores de traducción (pueden traer &nbsp;, <br>, etc.)
export const plano = html =>
  String(html || '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim()
