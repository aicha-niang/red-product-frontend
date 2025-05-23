/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true, // Active le support de Styled Components
  },
   eslint: {
    ignoreDuringBuilds: true,
  },
};



module.exports = nextConfig;

