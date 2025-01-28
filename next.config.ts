const nextConfig = {
	reactStrictMode: true,
	async headers() {
		return [
			{
				// Match all routes
				source: '/:path*',
				headers: [
					{ key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate, proxy-revalidate' },
					{ key: 'Pragma', value: 'no-cache' },
					{ key: 'Expires', value: '0' },
					{ key: 'Access-Control-Allow-Origin', value: '*' }, // Replace '*' with your actual origin in production
					{ key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT,OPTIONS' },
					{ key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
				],
			},
		];
	},
};

export default nextConfig;  
