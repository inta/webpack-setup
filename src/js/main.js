import m from 'mithril';
import t from './translation.js';
import '../css/main.css';
import svgIcon from '../img/gear.svg';

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
