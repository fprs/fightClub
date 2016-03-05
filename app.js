var React = require('react');
var ContentBox = require('./views/index.jsx');

var data = JSON.parse(document.getElementById('initial-data').getAttribute('data-json'));
React.render(<ContentBox data={data} />, document.getElementById('app'));