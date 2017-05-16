But why?
--------

I needed dynamic JS loader for my experiments with IPFS web apps. I
couldn't find anything simple and small enough so I write one myself.

This loader allows to do all the JS bundling on the client side. Maybe
it's bad for network efficiency but I don't care. I write small things.

Example
-------

You got three files in your app: a magic settings module, some
processing stuff, and logic that binds everything together.

Settings are just a single number (file `settings.js`):

    42;

Processing is a function that squares the number (file `processing.js`):

    (function (n) {return n*n;});

And the glue (file `main.js`):

    load('load_many.js', function (loadMany) {
        loadMany(['settings.js', 'processing.js'], function (settings, processing) {
            console.log(processing(settings));
        });
    });

Then in `index.html`:

    <script src="load.js"></script>
    <script>load('main.js');</script>
