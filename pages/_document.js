import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        {/* ===== SEO común a todas las páginas =====
            Título, descripción, canonical, idiomas (hreflang), Open Graph y Schema.org
            se definen por página e idioma en pages/index.js (lib/seo.js). */}
        <meta name="author" content="Hotel y Cabañas Brisas de Oro" />
        <meta name="geo.region" content="AR-X" />
        <meta name="geo.placename" content="Villa Carlos Paz, Córdoba, Argentina" />
        <meta name="geo.position" content="-31.4285;-64.4872" />
        <meta name="ICBM" content="-31.4285, -64.4872" />
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iNiIgZmlsbD0iIzE3MTUxMiIvPjx0ZXh0IHg9IjE2IiB5PSIyNC41IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iR2VvcmdpYSxzZXJpZiIgZm9udC1zaXplPSIyNiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iI2Q0YWY1YSI+QjwvdGV4dD48L3N2Zz4=" />
        <link rel="shortcut icon" href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iNiIgZmlsbD0iIzIwMUUxQiIvPjx0ZXh0IHg9IjE2IiB5PSIyNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Ikdlb3JnaWEsc2VyaWYiIGZvbnQtc2l6ZT0iMjIiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiNDOEEwMjgiPkI8L3RleHQ+PC9zdmc+" />
        <link rel="apple-touch-icon" href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iNiIgZmlsbD0iIzIwMUUxQiIvPjx0ZXh0IHg9IjE2IiB5PSIyNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Ikdlb3JnaWEsc2VyaWYiIGZvbnQtc2l6ZT0iMjIiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiNDOEEwMjgiPkI8L3RleHQ+PC9zdmc+" />
        <meta name="theme-color" content="#201E1B" />
        <meta name="msapplication-TileColor" content="#201E1B" />
        {/* Verificación de Google Search Console (método "Etiqueta HTML"): configurar
            NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION en Vercel con el código que da Search Console. */}
        {process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && (
          <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION} />
        )}

        {/* ===== GOOGLE FONTS ===== */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Nunito:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
