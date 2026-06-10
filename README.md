# 🏨 Hotel y Cabañas Brisas de Oro — Landing Page (Next.js)

Migración a **Next.js** de la landing page oficial de Hotel y Cabañas Brisas de Oro, complejo familiar ubicado en Villa Carlos Paz, Córdoba, Argentina.

Este repositorio es la evolución tecnológica del proyecto original desarrollado en HTML/CSS/JS vanilla → [ver repositorio original](https://github.com/SebaGiordano/brisas-de-oro)

## 🌐 Sitio publicado

**[https://brisas-de-oro-next.vercel.app](https://brisas-de-oro-next.vercel.app)**

## 🚀 Estado del proyecto

Publicado en Vercel. En desarrollo activo con integración al backend ASP.NET Core + SQL Server planificada como Etapa 2.

## ✨ Funcionalidades

- Diseño responsive 100% idéntico al original — mobile, tablet y desktop
- Sistema de idiomas completo: Español / Inglés / Portugués
- Carruseles de imágenes (hero, galería, familias, alojamientos)
- Formulario de consulta con validación y envío por WhatsApp
- Widget de clima en tiempo real (Tomorrow.io API)
- Google Maps embed con ubicación del complejo
- SEO completo: Schema.org, Open Graph, Twitter Card, hreflang
- Botón flotante de WhatsApp con mensajes automáticos por idioma
- Compatible con iOS Safari

## 🛠️ Tecnologías

- Next.js 15 (Pages Router)
- JavaScript (ES6+)
- CSS3 (variables CSS, animaciones, flexbox, grid)
- Tomorrow.io API (clima)
- Google Fonts (Cormorant Garamond + Nunito)
- Schema.org / JSON-LD (SEO estructurado)

## ▶️ Correr localmente

```bash
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000) en el navegador.

## 📁 Estructura
brisas-de-oro-next/
├── pages/
│   ├── _app.js         ← Importa estilos globales
│   ├── _document.js    ← Head: SEO, fuentes, Schema.org
│   └── index.js        ← Componente principal (HTML + JS)
├── styles/
│   └── globals.css     ← Todo el CSS del sitio
├── public/
│   └── fotos/          ← Imágenes del complejo
└── CLAUDE.md           ← Documentación del proyecto

## 🔮 Próximos pasos

- Deploy a servidor con HTTPS (clima y Maps requieren HTTPS)
- Integración con backend ASP.NET Core + SQL Server
- Sistema de reservas online con disponibilidad en tiempo real
- Panel de administración para el propietario

## 👨‍💻 Autor

**Sebastián Giordano**  
Analista de Sistemas en formación  
[GitHub](https://github.com/SebaGiordano)