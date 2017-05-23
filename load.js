/**
 * This script stores loading function under `window.load`.
 *
 * window.load(path)
 *
 * @param {string} path - address of script to be loaded
 *
 * Returns a promise of loaded thing.
 */

(function () {
	'use strict';

	var load = function (path) {
		return new Promise(function (resolve, reject) {

			var xmlhttp = new XMLHttpRequest();

			xmlhttp.onreadystatechange = function () {
				if (xmlhttp.readyState == XMLHttpRequest.DONE) {
					if (xmlhttp.status == 200) {
						var val;
						try {
							val = eval(xmlhttp.responseText);
						} catch (err) {
							reject(err);
							return;
						}
						val.then(resolve);
					} else {
						reject('couldn\'t download: ' + path);
					}
				}
			};

			xmlhttp.open('GET', path, true);
			xmlhttp.send();

		});
	};

	window.load = load;

})();
