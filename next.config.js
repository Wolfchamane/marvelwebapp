module.exports = {
	typescript: {
		ignoreBuildErrors: false,
	},
	images: {
		localPatterns: [
			{
				pathname: '/assets/*',
			},
		],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'dragonball-api.com',
			},
		],
	},
};
