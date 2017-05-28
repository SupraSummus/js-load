Promise.all([
    load('./settings.js'),
    load('./advanced_processing.js'),
]).then(function ([settings, advancedProcessing]) {
    console.log(advancedProcessing(settings));
})
