import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import {initReactI18next} from "react-i18next";

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        // We init with resources
        resources: {
            en: {
                translations: {
                    "Home": "Home",
                    "Create Post": "Create Post",
                    "Attach image": "Attach image",
                    "Type a message": "Type a message",
                    "Welcome to Sonet!": "Welcome to Sonet!",
                    "This is the best place to see what is happening in the world. Find some people and topics to follow now or change your information.":
                        "This is the best place to see what is happening in the world. Find some people and topics to follow now or change your information.",
                    "Update your information": "Update your information",
                    "Follow others": "Follow others",
                    "Profile": "Profile",
                    "Chats": "Chats",
                    "Users": "Users",
                    "Posts": "Posts",
                    "Gallery": "Gallery",
                    "Games": "Games",
                    "Settings": "Settings",
                    "Leave": "Leave",
                    "Post": "Post",
                    "Set up profile": "Set up profile",
                    "Log out": "Log out",
                    "Latest Posts": "Latest Posts",
                    "Show More": "Show More",
                    "Created by": "Created by"
                }
            },
            ua: {
                translations: {
                    "Home": "Домашня",
                    "Create Post": "Створити",
                    "Attach image": "Прикріпити фото або відео",
                    "Type a message": "Ваше повідомлення",
                    "Welcome to Sonet!": "Ласкаво просимо!",
                    "This is the best place to see what is happening in the world. Find some people and topics to follow now or change your information.":
                        "Це найкраще місце, щоб дізнатися, що відбуваеться навколо вас. Вподобайте людей та теми зараз, або змініть ваш профіль.",
                    "Update your information": "Оновіть свою інформацію",
                    "Follow others": "Слідуйте за іншими",
                    "Profile": "Профіль",
                    "Chats": "Повідомлення",
                    "Users": "Користувачі",
                    "Posts": "Повідомлення",
                    "Gallery": "Галерея",
                    "Games": "Ігри",
                    "Settings": "Налаштування",
                    "Leave": "Вийти",
                    "Post": "Опублікувати",
                    "Set up profile": "Налаштувати профіль",
                    "Log out": "Вийти",
                    "Latest Posts": "Останні дописи",
                    "Show More": "Показати більше",
                    "Created by": "Створено"
                }
            }
        },
        fallbackLng: "en",
        debug: true,

        // have a common namespace used around the full app
        ns: ["translations"],
        defaultNS: "translations",

        keySeparator: false, // we use content as keys

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
