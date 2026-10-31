/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Idiomas con URL propia: / (español), /en y /pt. Cada versión se renderiza
  // traducida en el servidor para que Google la indexe.
  i18n: {
    locales: ['es', 'en', 'pt'],
    defaultLocale: 'es',
    // Sin redirección automática por idioma del navegador: cada URL muestra siempre su idioma
    localeDetection: false,
  },
};

export default nextConfig;
