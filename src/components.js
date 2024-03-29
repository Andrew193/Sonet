import ContainerAuth from './auth/AuthPageContainer';
import Footer from './footer';
import SpecialPosts from "./posts/specialPosts";
import Comment from "./components/comments/CommentsPageContainer";
import Header from './header/HeaderContainerPage';
import MainPage from "./main-page/ClearMainPage";
import Profile from './components/profile/ProfileContainer';
import ModalUser from './main-page/modalUpdateUser';
import UsersContainer from './users/UsersContainer';
import PostsContainer from "./posts/PostsContainer";
import AsideBarContainer from './components/aside-bar/AsideBarContainer';
import Followings from "./followings/FollowingsPageContainer";
import GamesContainer from '../src/games/GamesContainer';
import SettingsContainerPage from "./settings/SettingsContainerPage";
import Followers from "./followers/FollowersPageContainer";
import ChatContainer from "./chats/ChatContainer";
import GalleryContainer from "./gallery/GalleryContainer";
import MusicContainerPage from "./music/MusicContainerPage";
import FastMessageContainer from "./fast-message/FastMessageContainer";
import FastActionsContainer from "./fast-actions/FastActionsContainer";
import FastMusicContainer from "./fast-music/FastMusicContainer";
import Bookmarks from "./bookmarks/BookmarksPageContainer";
import NotificationsContainer from "./notifications/NotificationsContainer";

const obj = {
    NotificationsContainer,
    FastMusicContainer,
    Bookmarks,
    FastMessageContainer,
    FastActionsContainer,
    MusicContainerPage,
    GamesContainer,
    ContainerAuth,
    GalleryContainer,
    SettingsContainerPage,
    Footer,
    SpecialPosts,
    Comment,
    Header,
    MainPage,
    Profile,
    ModalUser,
    UsersContainer,
    PostsContainer,
    AsideBarContainer,
    Followings,
    Followers,
    ChatContainer
}

export default obj;