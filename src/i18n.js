import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enJson from "./lang/en.json";
import idJson from "./lang/id.json";

i18n.use(initReactI18next).init({
 resources: {
    en: { ...enJson },
    id: { ...idJson },
 },
 lng: "id",
});