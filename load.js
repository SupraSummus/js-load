/**
 * This script stores loading function under `window.load`.
 *
 * window.load(path)
 *
 * @param {string} path - address of expression to be loaded.
 *
 * Returns a promise of loaded thing.
 */

'use strict';

(function () {

	var getFile = function (path) {

		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest();

			xhr.onload = function () {
				if (xhr.status >= 200 && xhr.status < 300) {
					resolve({
						content: xhr.responseText,
						name: xhr.responseURL,
					});
				} else {
					reject(new Error('Couldn\'t GET ' + path));
				}
			};

			xhr.onerror = function () {
				reject(new Error('Couldn\'t GET ' + path));
			};

			xhr.open('GET', path);
			xhr.send();
		});
	};

	var evaluate = function (file) {

		// evaluate file content
		try {
			var valPromise = eval(file.content);
		} catch (err) {
			return Promise.reject(err);
		}

		// check result type
		if (!(valPromise instanceof Promise)) {
			return Promise.reject(new TypeError('File ' + file.name + ' evaluated to non-Promise value.'));
		}

		return valPromise;
	};

	var load = function (path) {
		return getFile(path).then(evaluate);
	};

	window.load = load;

})();
