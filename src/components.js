import ContainerAuth from './auth/AuthPageContainer';
import Footer from './footer';
import SpecialPosts from "./posts/specialPosts";
import Comment from "./components/comments/CommentsPageContainer";
import Header from './header/HeaderContainerPage';
import MainPage from "./main-page/MainPageContainer";
import Profile from './components/profile/ProfileContainer';
import ModalUser from './main-page/modalUpdateUser';
import UsersContainer from './users/UsersContainer';
import PostsContainer from "./posts/PostsContainer";
import TopInfo from './components/TopInfo/TopInforationContainer';
import Followings from "./followings/FollowingsPageContainer";
import GamesContainer from '../src/games/GamesContainer';
import SettingsContainerPage from "./settings/SettingsContainerPage";
import Followers from "./followers/FollowersPageContainer";
import ChatContainer from "./chats/ChatContainer";

const obj = {
    GamesContainer,
    ContainerAuth,
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
    TopInfo,
    Followings,
    Followers,
    ChatContainer
}

export default obj;