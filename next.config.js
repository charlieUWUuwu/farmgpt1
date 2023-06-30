/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        NEXTAUTH_SECRET:"yMIEtJsTGoY7M2Oo0qrrJToAtN3OVmSYfopZOc3tamA=",
      },
    experimental: {
        appDir: true,
    },
}

module.exports = nextConfig
