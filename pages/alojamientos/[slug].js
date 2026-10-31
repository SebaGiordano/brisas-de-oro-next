import Head from 'next/head'
import Link from 'next/link'
import { SITE_URL, LOCALES, SEO, HOTEL_SCHEMA } from '../../lib/seo'
import { I18N } from '../../lib/i18n'
import { ALOJAMIENTOS, getAlojamiento, WSP_NUMERO, WSP_MSG, UI, plano } from '../../lib/alojamientos'

const pathDe = (lang, slug) => (lang === 'es' ? '' : '/' + lang) + '/alojamientos/' + slug
const inicioDe = lang => (lang === 'es' ? '/' : '/' + lang)
const Html = ({ as: Tag = 'span', html, ...props }) => <Tag {...props} dangerouslySetInnerHTML={{ __html: html }} />

export async function getStaticPaths({ locales }) {
  const paths = []
  for (const locale of locales) for (const a of ALOJAMIENTOS) paths.push({ params: { slug: a.slug }, locale })
  return { paths, fallback: false }
}

export async function getStaticProps({ params, locale }) {
  if (!getAlojamiento(params.slug)) return { notFound: true }
  return { props: { slug: params.slug, lang: LOCALES.includes(locale) ? locale : 'es' } }
}

export default function Alojamiento({ slug, lang }) {
  const a = getAlojamiento(slug)
  const t = I18N[lang]
  const ui = UI[lang]
  const nombre = plano(t[a.nombre])
  const lugar = a.fueraDelComplejo ? ui.lugarCasa : ui.lugar
  // "Casa con Pileta · Icho Cruz" ya nombra el lugar
  const h1 = a.fueraDelComplejo ? nombre : `${nombre} ${ui.en} ${lugar}`
  const datos = a.datos.map(k => plano(t[k]))
  const features = a.features.map(k => plano(t[k]))

  const title = `${h1} | ${SEO[lang].ogTitle.split(' | ')[0]}`
  const description = `${nombre}: ${datos.join(' · ')}. ${features.join(', ')}. ${ui.nota}.`
  const url = SITE_URL + pathDe(lang, slug)
  const wsp = `https://wa.me/${WSP_NUMERO}?text=${encodeURIComponent(WSP_MSG[lang][a.wsp])}`

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: ui.inicio, item: SITE_URL + inicioDe(lang) },
        { '@type': 'ListItem', position: 2, name: ui.alojamientos, item: SITE_URL + (lang === 'es' ? '' : '/' + lang) + '/alojamientos' },
        { '@type': 'ListItem', position: 3, name: nombre, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Accommodation',
      name: nombre,
      description,
      url,
      image: a.fotos.map(f => SITE_URL + f),
      amenityFeature: features.map(f => ({ '@type': 'LocationFeatureSpecification', name: f, value: true })),
      containedInPlace: { '@type': 'LodgingBusiness', name: HOTEL_SCHEMA.name, url: HOTEL_SCHEMA.url },
    },
  ]

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={url} />
        {LOCALES.map(l => <link key={'hreflang-' + l} rel="alternate" hrefLang={l} href={SITE_URL + pathDe(l, slug)} />)}
        <link rel="alternate" hrefLang="x-default" href={SITE_URL + pathDe('es', slug)} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={SITE_URL + a.fotos[0]} />
        <meta property="og:url" content={url} />
        <meta property="og:locale" content={SEO[lang].ogLocale} />
        <meta property="og:site_name" content="Brisas de Oro Hotel y Cabañas" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={SITE_URL + a.fotos[0]} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <header className="ap-header">
        <div className="ap-header-inner">
          <Link href="/" locale={lang} className="ap-logo">
            <img src="/logo.webp" alt="Hotel y Cabañas Brisas de Oro" width="120" height="74" />
          </Link>
          {/* div con role en vez de <nav>: globals.css fija la posición de todo <nav> (menú de la portada) */}
          <div role="navigation" className="ap-langs" aria-label="Idioma">
            {LOCALES.map(l => (
              <Link key={l} href={`/alojamientos/${slug}`} locale={l} className={'ap-lang' + (l === lang ? ' activo' : '')} hrefLang={l}>
                {l.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </header>

      <main className="ap-main sec-crema-a">
        <div className="section-inner">
          <div role="navigation" className="ap-breadcrumb" aria-label="Breadcrumb">
            <Link href="/" locale={lang}>{ui.inicio}</Link>
            <span>›</span>
            <Link href="/alojamientos" locale={lang}>{ui.alojamientos}</Link>
            <span>›</span>
            <span aria-current="page">{nombre}</span>
          </div>

          <div className="ap-top">
            <div className="ap-portada">
              <img src={a.fotos[0]} alt={plano(t[a.alt])} fetchPriority="high" />
            </div>
            <div className="ap-info">
              <p className="section-label">{plano(t['aloj.label'])}</p>
              <h1 className="ap-title">{h1}</h1>
              <ul className="ap-datos">
                {datos.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
              {a.variantes && (
                <>
                  <h2 className="ap-subtitle">{ui.variantes}</h2>
                  <div className="card-features">
                    {a.variantes.map(k => <Html key={k} className="feature-tag" html={t[k]} />)}
                  </div>
                </>
              )}
              <h2 className="ap-subtitle">{ui.incluye}</h2>
              <div className="card-features">
                {a.features.map(k => <Html key={k} className="feature-tag" html={t[k]} />)}
              </div>
              {a.noIncluye && (
                <>
                  <h2 className="ap-subtitle">{ui.noIncluye}</h2>
                  <ul className="ap-datos ap-noincluye">
                    {a.noIncluye.map(k => <li key={k}>{plano(t[k])}</li>)}
                  </ul>
                </>
              )}
              <div className="ap-ctas">
                <a className="ap-btn ap-btn-wsp" href={wsp} target="_blank" rel="noopener noreferrer">{ui.consultarWsp}</a>
                <Link className="ap-btn ap-btn-sec" href="/#inicio" locale={lang}>{ui.verDisponibilidad}</Link>
              </div>
              <p className="ap-nota">{ui.nota}</p>
            </div>
          </div>

          <h2 className="ap-subtitle ap-galeria-titulo">{ui.galeria}</h2>
          <div className="ap-galeria">
            {a.fotos.slice(1).map((f, i) => (
              <img key={f} src={f} alt={`${plano(t[a.alt])} (${i + 2}/${a.fotos.length})`} loading="lazy" decoding="async" />
            ))}
          </div>

          <h2 className="ap-subtitle">{ui.otros}</h2>
          <ul className="ap-otros">
            {ALOJAMIENTOS.filter(o => o.slug !== slug).map(o => (
              <li key={o.slug}>
                <Link href={`/alojamientos/${o.slug}`} locale={lang}>
                  <img src={o.fotos[0]} alt={plano(t[o.alt])} loading="lazy" decoding="async" />
                  <span>{plano(t[o.nombre])}</span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="ap-volver"><Link href="/alojamientos" locale={lang}>{ui.volver}</Link></p>
        </div>
      </main>

      <footer className="ap-footer">
        <p>{ui.pie}</p>
      </footer>
    </>
  )
}
