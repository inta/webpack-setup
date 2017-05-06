import translate from 'translate.js';
import en from '../translations/en.json';
import de from '../translations/de.json';

const translations = {en: en, de: de};
const defaultLanguage = 'en';

export default (function Translation() {
	function getLanguage(availabeLanguages, defaultLanguage) {
		let savedLanguage = localStorage.getItem('language');
		if (availabeLanguages.indexOf(savedLanguage) > -1) {
			return savedLanguage;
		}

		let acceptedLanguages = navigator.languages || [];
		for (let matchedLanguage of acceptedLanguages) {
			if (availabeLanguages.indexOf(matchedLanguage) > -1) {
				localStorage.setItem('language', matchedLanguage);
				return matchedLanguage;
			}
		}

		localStorage.setItem('language', defaultLanguage);
		return defaultLanguage;
	}

	let currentLanguage = getLanguage(Object.keys(translations), defaultLanguage);
	return translate(translations[currentLanguage]);
}());
