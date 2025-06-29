import { ConfigurationOptions, I18n } from "i18n";
import EN from "../resources/language/en";
import HI from "../resources/language/hi";
const i18n = new I18n();
i18n.configure({
	staticCatalog: {
		en: EN,
		hi: HI,
	},
	defaultLocale: "en",
} as ConfigurationOptions);

export default i18n;
