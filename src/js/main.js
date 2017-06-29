import m from 'mithril';
import t from 'translation';
import 'css/main.css';
import svgIcon from 'img/gear.svg';
import '../index.html';
import 'img/favicon.png';
import '!!file-loader?name=[path][name].[ext]!svgo-loader?{"plugins":[{"removeTitle": true},{"removeXMLNS":true},{"removeDimensions": true}]}!../img/gear.svg';

m.route.prefix('');

m.route(document.body, '/', {
	'/': {
		view: function() {
			return [
				m('h1', t('foo.bar')),
				m.trust(svgIcon)
			];
		}
	}
});
