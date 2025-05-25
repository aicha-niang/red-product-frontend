/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // ✅ Active l'export statique
  compiler: {
    styledComponents: true, // Active le support de Styled Components
  },
   eslint: {
    ignoreDuringBuilds: true,
  },
};



module.exports = nextConfig;

