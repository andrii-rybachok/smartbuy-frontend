/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        serverActions:true
    },
    images:{
        remotePatterns:[
            {
                protocol:"http",
                hostname:"127.0.0.1",
                port:"7196",
                pathname:"/images/**"
            }
        ]
    }
}

module.exports = nextConfig
