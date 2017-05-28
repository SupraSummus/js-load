load('./processing.js').then(function (processing) {
    return function (n) {
        return 'kboom! ' + processing(n);
    };
})
