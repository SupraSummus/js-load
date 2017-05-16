/**
 * Loads many scripts simultaneously.
 *
 * @param {array of strings} paths - list of paths to be loaded
 * @param {function} cb - callback that is called when loading of all
 *   paths is done. Each loaded value is passed in separate parameter.
 */

(function (paths, cb) {
	'use strict';

	var loaded = new Array(paths.length);
	var loadedCount = 0;
	paths.forEach(function (path, i) {
		load(path, function (result) {
			loaded[i] = result;
			loadedCount ++;
			if (loadedCount == paths.length) {
				cb.apply(null, loaded);
			}
		});
	});
});
