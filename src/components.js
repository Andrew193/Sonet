import ContainerAuth from './auth/AuthPageContainer';
import Footer from './footer';
import SpecialPosts from "./posts/specialPosts";
import Comment from "./components/comments/index";
import Header from './header/HeaderContainerPage';
import MainPage from "./main-page/MainPageContainer";
import Profile from './components/profile/ProfileContainer';
import ModalUser from './main-page/modalUpdateUser';
import UsersContainer from './users/UsersContainer';
import PostsContainer from "./posts/index"
import TopInfo from './components/TopInfo/TopInforationContainer';
import Followers from "./followers/index";
import GamesContainer from '../src/games/GamesContainer';
import SettingsContainerPage from "./settings/SettingsContainerPage";

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
    Followers
}

export default obj;