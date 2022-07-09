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
                    "Created by": "Created by",
                    "Download": "Download",
                    "Update my Back": "Update my Back",
                    "Preview": "Preview",
                    "Input your email": "Input your email",
                    "Confirm": "Confirm",
                    "Update my Avatar": "Update my Avatar",
                    "Joined": "Joined",
                    "Last update": "Last update",
                    "Never": "Never",
                    "Following": "Following",
                    "Followers": "Followers",
                    "About you": "About you",
                    "Nothing": "Nothing",
                    "Comments": "Comments",
                    "Likes": "Likes",
                    "My Friends": "My Friends",
                    "Friend Requests": "Friend Requests",
                    "Search for friend": "Search for friend",
                    "Mates": "Mates",
                    "You are lonely": "You are lonely",
                    "Out of requests": "Out of requests",
                    "There are no messages yet. Be the first": "There are no messages yet. Be the first",
                    "Send": "Send",
                    "Open a conversation to start a chat.": "Open a conversation to start a chat."
                }
            },
            ua: {
                translations: {
                    "Open a conversation to start a chat.": "Відкрийте бесіду, щоб почати чат.",
                    "Send": "Надіслати",
                    "There are no messages yet. Be the first": "Ще немає повідомлень. Будь першим",
                    "Out of requests": "Немає запитів",
                    "You are lonely": "Ви самотні",
                    "Mates": "Товариші",
                    "Search for friend": "Пошук друга",
                    "Friend Requests": "Запити в друзі",
                    "My Friends": "Мої друзі",
                    "Likes": "Лайки",
                    "Comments": "Коментарі",
                    "Nothing": "Нічого",
                    "About you": "Докладно",
                    "Following": "Підписка",
                    "Followers": "Послідовники",
                    "Never": "Ніколи",
                    "Last update": "Останнє оновлення",
                    "Joined": "Приєднався",
                    "Update my Avatar": "Оновити мій аватар",
                    "Confirm": "Підтвердити",
                    "Input your email": "Введіть адресу електронної пошти",
                    "Preview": "Переглянути",
                    "Update my Back": "Оновіть бекплейт",
                    "Download": "Завантажити",
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
                    "Chats": "Чати",
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
