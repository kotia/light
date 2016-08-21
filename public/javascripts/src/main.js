require.config({
    baseUrl: '/light/javascripts/out/',
    paths: {
        "underscore": "../libs/underscore",
        "react": "../libs/react-with-addons",
        "react-dom": "../libs/react-dom",
        "page": "../libs/page"
    },
    shim: {
        'underscore': {
            'exports': '_'
        },
        'react': {
            'exports': 'React'
        }
    }
});




require([
    "page",
    "index",
    "beeper"
], function (page, index, beeper) {

    page('/light', function() {
        index.start();
    });
    page('/light/show', function() {
        beeper.start();
    });
    page();

});
