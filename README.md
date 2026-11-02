# 🏨 Hotel y Cabañas Brisas de Oro — Sitio web público (Next.js)

Sitio web oficial de **Hotel y Cabañas Brisas de Oro**, complejo familiar en Villa Carlos Paz, Córdoba, Argentina, y de la **Casa con Pileta en Icho Cruz**.

Forma parte del proyecto final de **Práctica Profesionalizante II — Analista de Sistemas**, junto con el sistema de gestión interno → [brisas-backend-railway](https://github.com/SebaGiordano/brisas-backend-railway).

Este repositorio es la evolución del sitio original desarrollado en HTML/CSS/JS vanilla → [ver repositorio original](https://github.com/SebaGiordano/brisas-de-oro)

## 🌐 Sitio publicado

**[https://brisas-de-oro-next.vercel.app](https://brisas-de-oro-next.vercel.app)**

## 🚀 Estado del proyecto

Publicado en **Vercel** e **integrado** con el sistema de gestión interno del complejo (ASP.NET Core MVC + PostgreSQL, publicado en Railway). La consulta de disponibilidad usa datos reales de las reservas cargadas en el sistema.

El sitio **no permite reservar automáticamente**, por decisión de diseño: muestra la disponibilidad real y deriva cada consulta por WhatsApp al administrador, porque en el hotel ninguna reserva se confirma sin el pago de una seña y la decisión final es del administrador.

## ✨ Funcionalidades

- Secciones con URL propia: inicio, nosotros, alojamientos, servicios, opiniones, ubicación, clima e información importante
- Tres idiomas con URL propia: español (`/`), inglés (`/en`) y portugués (`/pt`), renderizados en el servidor para que los indexen los buscadores
- Consulta de disponibilidad en tiempo real conectada al sistema de gestión interno
- Oferta de unidades según la cantidad de personas y **sugerencia de combinaciones** de unidades para grupos grandes
- Derivación a WhatsApp con mensajes armados automáticamente (fechas, huéspedes y unidad) en cada idioma
- Bloque de la **Casa con Pileta en Icho Cruz**, con su ubicación y enlace a Google Maps
- Carruseles de imágenes (portada, galería, familias, alojamientos)
- Formulario de consulta con validación y envío por WhatsApp
- Widget de clima en tiempo real (Tomorrow.io)
- Google Maps con la ubicación del complejo
- SEO: Schema.org (JSON-LD), Open Graph, Twitter Card, hreflang, `sitemap.xml` y `robots.txt`
- Diseño responsive (mobile, tablet y desktop), compatible con iOS Safari
- Botón flotante de WhatsApp

## 🛠️ Tecnologías

- Next.js 16 (Pages Router)
- React 19
- JavaScript (ES6+)
- CSS3 (variables CSS, animaciones, flexbox, grid)
- Internacionalización de Next.js (`es`, `en`, `pt`)
- Tomorrow.io API (clima)
- Google Fonts (Cormorant Garamond + Nunito)
- Schema.org / JSON-LD (SEO estructurado)
- Vercel (publicación automática en cada push)

## 🔗 Integración con el sistema de gestión

```
Navegador del cliente
   │  /api/disponibilidad (mismo sitio)
   ▼
API route de Next.js en Vercel (proxy)
   │  GET /api/disponibilidad
   ▼
Sistema de gestión interno — ASP.NET Core en Railway → PostgreSQL
```

La página `/disponibilidad` consulta la API route interna `/api/disponibilidad` (`pages/api/disponibilidad.js`), que actúa como **proxy del lado del servidor** hacia el endpoint `GET /api/disponibilidad` del backend. La URL del backend se configura en la variable de entorno `NEXT_PUBLIC_API_URL`.

El backend calcula la disponibilidad real según las reservas cargadas —incluyendo reservas grupales y la relación Apart ↔ Habitaciones— y responde por categoría:

- Habitaciones
- Aparts
- Cabaña chica
- Cabaña mediana
- Cabaña grande
- Casa (Icho Cruz)

Para cada categoría informa si está disponible, cuántas unidades hay libres y si se ofrece para esa cantidad de personas. Además devuelve la capacidad de cada unidad libre, que el sitio usa para calcular combinaciones para grupos. La respuesta no incluye datos de huéspedes ni de pagos.

El navegador nunca se comunica directamente con el backend: todas las consultas pasan por la API route de Next.js. Del mismo modo, `/api/clima` consulta Tomorrow.io desde el servidor, para que la clave de la API no llegue al navegador.

## ⚙️ Variables de entorno

| Variable | Uso |
|---|---|
| `NEXT_PUBLIC_API_URL` | URL del sistema de gestión (por defecto `http://localhost:5272`) |
| `TOMORROW_API_KEY` | Clave de Tomorrow.io para el widget de clima |

## ▶️ Correr localmente

```bash
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000) en el navegador.

Para probar la consulta de disponibilidad en local, el sistema de gestión tiene que estar corriendo en [http://localhost:5272](http://localhost:5272), o bien configurá `NEXT_PUBLIC_API_URL` con la URL del backend que quieras usar.

## 📁 Estructura

```
brisas-de-oro-next/
├── components/
│   └── Sitio.js              ← Componente principal del sitio (todas las secciones)
├── lib/
│   ├── i18n.js               ← Textos en español, inglés y portugués
│   ├── idioma.js             ← Utilidades de idioma
│   ├── paginas.js            ← Rutas, títulos y descripciones de cada sección
│   └── seo.js                ← Datos de SEO y Schema.org
├── pages/
│   ├── _app.js               ← Importa estilos globales
│   ├── _document.js          ← Head: fuentes y metadatos base
│   ├── index.js              ← Inicio
│   ├── nosotros.js, servicios.js, opiniones.js, ubicacion.js, clima.js, info-importante.js
│   ├── alojamientos/index.js ← Alojamientos
│   ├── disponibilidad.js     ← Resultados de disponibilidad y combinaciones para grupos
│   └── api/
│       ├── disponibilidad.js ← Proxy hacia el sistema de gestión
│       └── clima.js          ← Proxy hacia Tomorrow.io
├── styles/
│   └── globals.css           ← Todo el CSS del sitio
├── public/
│   ├── fotos/                ← Imágenes del complejo y de la Casa
│   ├── sitemap.xml
│   └── robots.txt
└── next.config.mjs           ← Configuración de idiomas
```

## 🔮 Próximos pasos

- Pasar a un plan pago de Vercel si el uso comercial del sitio crece
- Dominio propio para el sitio

## 👨‍💻 Autor

**Sebastián Giordano**  
Analista de Sistemas en formación  
[GitHub](https://github.com/SebaGiordano)

Proyecto final de Práctica Profesionalizante II, en equipo con Rocío Bazán y Renzo Bazán.
