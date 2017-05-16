/**
 * This script stores loading function under `window.load`.
 *
 * window.load(path, success, fail)
 *
 * @param {string} path - address of script to be loaded
 * @param {function} success - callback to be called when loading is
 *   successfull. It takes single argument - value evaluated from loaded
 *   file.
 * @param {function} fail - fail callback
 */

(function () {
	'use strict';

	var load = function (path, success, fail) {

		if (success === undefined) {
			success = function () {};
		}

		if (fail === undefined) {
			fail = console.error;
		}

		var xmlhttp = new XMLHttpRequest();

		xmlhttp.onreadystatechange = function () {
			if (xmlhttp.readyState == XMLHttpRequest.DONE) {
				if (xmlhttp.status == 200) {
					var val;
					try {
						val = eval(xmlhttp.responseText);
					} catch (err) {
						fail(err);
					}
					success(val);
				} else {
					fail('couldn\'t download');
				}
			}
		};

		xmlhttp.open('GET', path, true);
		xmlhttp.send();

	};

	window.load = load;

})();
