var React = require('react');
var DOM = React.DOM;
var body = DOM.body;
var div = DOM.div;
var script = DOM.script;

var browserify = require('browserify');

var express = require('express');
var app = express();

app.set('port', (process.argv[2] || 8088));
app.set('view engine', 'jsx');
app.set('views', __dirname + '/views');
app.engine('jsx', require('express-react-views').createEngine());

require('node-jsx').install();
var ContentBox = require('./views/index.jsx');

var data = [{
    id: 0,
    firstName: 'Java',
    lastName: 'Language',
    description: '',
    avatar: 'http://img2.wikia.nocookie.net/__cb3/java/pl/images/5/50/Wiki-background',
    exp: 20,
    wins: 0,
    losses: 0,
    draws: 0,
}, {
    id: 1,
    firstName: 'Ruby',
    lastName: 'Language',
    description: '',
    avatar: 'http://engineering.yp.com/img/ruby-logo.png',
    exp: 15,
    wins: 0,
    losses: 0,
    draws: 0,
}, {
    id: 2,
    firstName: 'Python',
    lastName: 'Language',
    description: '',
    avatar: 'http://i.stack.imgur.com/jBli3.png',
    exp: 17,
    wins: 0,
    losses: 0,
    draws: 0,
}];

app.use('/bundle.js', function(req, res) {
    res.setHeader('content-type', 'application/javascript');
    browserify('./app.js')
        .transform('reactify')
        .bundle()
        .pipe(res);
});

app.use('/', function(req, res) {
    var initialData = JSON.stringify(data);
    var markup = React.renderToString(React.createElement(ContentBox, {
        data: data
    }));

    res.setHeader('Content-Type', 'text/html');

    var html = React.renderToStaticMarkup(body(null,
        div({
            id: 'app',
            dangerouslySetInnerHTML: {
                __html: markup
            }
        }),
        script({
            id: 'initial-data',
            type: 'text/plain',
            'data-json': initialData
        }),
        script({
            src: '/bundle.js'
        })
    ));

    res.end(html);
});

app.listen(app.get('port'), function() {});