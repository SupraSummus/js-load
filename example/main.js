load('/ipfs/QmeaWRTzVRvJbaZ7eTaCX5vBU2snG1P4yA3CeTYFshHEuD', function (loadMany) {
	loadMany([
		'/ipfs/QmPKKYM7Kbm1iUR7HzshiQpt1c1Q2chXBiGW8HPoRAnWgZ', // settings.js
		'/ipfs/QmeE3kewxdSjjXeVuWdVuyvcyRVoWRzvFJgz2CZScoT9Hd', // processing.js
	], function (settings, processing) {
		console.log(processing(settings));
	});
});
