# 🏨 Hotel y Cabañas Brisas de Oro — Landing Page (Next.js)

Migración a **Next.js** de la landing page oficial de Hotel y Cabañas Brisas de Oro, complejo familiar ubicado en Villa Carlos Paz, Córdoba, Argentina.

Este repositorio es la evolución tecnológica del proyecto original desarrollado en HTML/CSS/JS vanilla → [ver repositorio original](https://github.com/SebaGiordano/brisas-de-oro)

## 🌐 Sitio publicado

**[https://brisas-de-oro-next.vercel.app](https://brisas-de-oro-next.vercel.app)**

## 🚀 Estado del proyecto

Publicado en Vercel e **integrado** con el sistema de gestión interna del complejo (ASP.NET Core MVC + PostgreSQL, publicado en Railway). La consulta de disponibilidad del sitio usa datos reales de las reservas cargadas en el sistema.

## ✨ Funcionalidades

- Diseño responsive 100% idéntico al original — mobile, tablet y desktop
- Sistema de idiomas completo: Español / Inglés / Portugués
- Carruseles de imágenes (hero, galería, familias, alojamientos)
- Formulario de consulta con validación y envío por WhatsApp
- Consulta de disponibilidad en tiempo real conectada al sistema de gestión interna
- Página de resultados de disponibilidad con derivación a WhatsApp por unidad
- Widget de clima en tiempo real (Tomorrow.io API)
- Google Maps embed con ubicación del complejo
- SEO completo: Schema.org, Open Graph, Twitter Card, hreflang
- Botón flotante de WhatsApp con mensajes automáticos por idioma
- Compatible con iOS Safari

## 🛠️ Tecnologías

- Next.js 16 (Pages Router)
- React 19
- JavaScript (ES6+)
- CSS3 (variables CSS, animaciones, flexbox, grid)
- Tomorrow.io API (clima)
- Google Fonts (Cormorant Garamond + Nunito)
- Schema.org / JSON-LD (SEO estructurado)

## 🔗 Integración con el sistema de gestión

La página `/disponibilidad` consulta la API route interna `/api/disponibilidad` (`pages/api/disponibilidad.js`), que actúa como proxy del lado del servidor hacia el endpoint `GET /api/disponibilidad` del backend (URL configurada en la variable de entorno `NEXT_PUBLIC_API_URL`).

El backend calcula la disponibilidad real según las reservas cargadas en el sistema —incluyendo reservas grupales y la relación Apart ↔ Habitaciones— y responde por categoría:

- Habitaciones
- Aparts
- Cabaña chica
- Cabaña mediana
- Cabaña grande

El navegador nunca se comunica directo con el backend: todas las consultas pasan por la API route de Next.js.

## ▶️ Correr localmente

```bash
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000) en el navegador.

Para probar la consulta de disponibilidad en local, el backend del sistema de gestión tiene que estar corriendo en [http://localhost:5272](http://localhost:5272), o bien configurá `NEXT_PUBLIC_API_URL` con la URL del backend que quieras usar.

## 📁 Estructura

```
brisas-de-oro-next/
├── pages/
│   ├── _app.js              ← Importa estilos globales
│   ├── _document.js         ← Head: SEO, fuentes, Schema.org
│   ├── index.js             ← Componente principal (HTML + JS)
│   ├── disponibilidad.js    ← Página de resultados de disponibilidad
│   └── api/
│       └── disponibilidad.js ← API route: proxy hacia el backend
├── styles/
│   └── globals.css     ← Todo el CSS del sitio
├── public/
│   └── fotos/          ← Imágenes del complejo
└── CLAUDE.md                ← Documentación del proyecto
```

## 🔮 Próximos pasos

- Reservas online directas desde el sitio (hoy la reserva se concreta por WhatsApp)

## 👨‍💻 Autor

**Sebastián Giordano**  
Analista de Sistemas en formación  
[GitHub](https://github.com/SebaGiordano)