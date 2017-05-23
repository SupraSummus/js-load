But why?
--------

I needed dynamic JS loader for my experiments with IPFS web apps. I
couldn't find anything simple and small enough so I write one myself.

This loader allows to do all the JS bundling on the client side. Maybe
it's bad for network efficiency but I don't care. I write small things.

Idea
----

Loader operates on promises. It defines just one function `load(path)`.
When you call it with a path to be loaded it returns a promise of loaded
and `eval`ed file content.

The only requirement for source files is that each file should `eval()`
to a promise.

You can use `load(path)` function inside files being loaded. That's
beauty!

Example
-------

You got four files in your app: a magic settings module, some
processing stuff, more advanced processing stuff, and logic that binds
everything together.

Settings are just a single number (file `settings.js`):

    Promise.resolve(42);

Processing is a function that squares the number (file `processing.js`):

    Promise.resolve(function (n) {return n*n;});

Some advanced processing that uses regular processing (file
`advanced_processing.js`):

    load('./processing.js').then(function (processing) {
        return function (n) {
            return 'kboom! ' + processing(n);
        };
    });

And the glue (file `main.js`):

    Promise.all([
        load('./settings.js'),
        load('./advanced_processing.js'),
    ]).then(function ([settings, advancedProcessing]) {
        console.log(advancedProcessing(settings));
    });


Then in `index.html`:

    <script src="load.js"></script>
    <script>load('main.js');</script>

IPFS context
------------

Library seems to me very useful in webapps hosted on IPFS.

IPFS hashes of library and example setup are in
`published_version.json`. I don't guarantee that they are pinned on
continously available node.
