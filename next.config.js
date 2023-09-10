/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true
    },

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "brozetka.itstep.click",

                pathname: "/images/**"
            }
        ]
    }
}

module.exports = nextConfig
