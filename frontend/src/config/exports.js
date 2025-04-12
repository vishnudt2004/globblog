// Atoms
import Anchor from "../components/atoms/Anchor";
import Border, { BorderX, BorderY } from "../components/atoms/Border";
import Button, { CircleButton } from "../components/atoms/Button";
import Center from "../components/atoms/Center";
import CountDown from "../components/atoms/CountDown";
import CSSTransition_mod, {
  CSSTEffect,
} from "../components/atoms/CSSTransition_mod";
import FAIcon from "../components/atoms/FAIcon";
import Highlighter from "../components/atoms/Highlighter";
import Image from "../components/atoms/Image";
import Input, { TextArea, SuggestionsInput } from "../components/atoms/Input";
import InputCharsCounter_enhancer from "../components/atoms/InputCharsCounter";
import Message, { MessageMini } from "../components/atoms/Message";
import Modal from "../components/atoms/Modal";
import PreLoader, { PreLoaderMini } from "../components/atoms/PreLoader";
import ReactQuill_mod from "../components/atoms/ReactQuill_mod";
import ScrollDownButton from "../components/atoms/ScrollDownButton";
import SVGBackground from "../components/atoms/SVGBackground";
import Tabs from "../components/atoms/Tabs";
import ToggleButton from "../components/atoms/ToggleButton";
import VisibilityControl from "../components/atoms/VisibilityControl";

export {
  Anchor,
  Border,
  BorderX,
  BorderY,
  Button,
  CircleButton,
  Center,
  CountDown,
  CSSTransition_mod,
  CSSTEffect,
  FAIcon,
  Highlighter,
  Image,
  Input,
  TextArea,
  SuggestionsInput,
  InputCharsCounter_enhancer,
  Message,
  MessageMini,
  Modal,
  PreLoader,
  PreLoaderMini,
  ReactQuill_mod,
  ScrollDownButton,
  SVGBackground,
  Tabs,
  ToggleButton,
  VisibilityControl,
};

// Molecules
import BlogCard, { BlogCardMini } from "../components/molecules/BlogCard";
import {
  OrphanBlogPlaceholder,
  NoPostPlaceholder,
  NoMoreResultsPlaceholder,
  NoResultsFoundPlaceholder,
} from "../components/molecules/Placeholders";
import BorderWithText from "../components/molecules/BorderWithText";
import CheckButton from "../components/molecules/CheckButton";
import Form from "../components/molecules/Form";
import GeneralPlaceholders from "../components/molecules/GeneralPlaceholders";
import InfoModal from "../components/molecules/InfoModal";
import LandingPageBG, {
  attribution as landingPageBGAttribution,
} from "../components/molecules/LandingPageBG";
import LoadMoreData from "../components/molecules/LoadMoreData";
import Logo, { LogoMini } from "../components/molecules/Logo";
import Navbar from "../components/molecules/Navbar";
import NavMenu from "../components/molecules/NavMenu";
import PageRedirectButton from "../components/molecules/PageRedirectButton";
import PageRedirectLink from "../components/molecules/PageRedirectLink";
import SocialMediaButton, {
  SocialMediaIconButton,
} from "../components/molecules/SocialMediaButton";
import UserDetailedCard, {
  UserCard,
  UserCardMini,
} from "../components/molecules/UserCard";
import ToggleMode, {
  ToggleModeCircle,
} from "../components/molecules/ToggleMode";
// actions
import DeleteBlogAction_enhancer from "../components/molecules/actions/DeleteBlogAction";
import DeleteUserAction_enhancer from "../components/molecules/actions/DeleteUserAction";
import LogoutAction_enhancer from "../components/molecules/actions/LogoutAction";
// inputs
import AboutInput from "../components/molecules/inputs/AboutInput";
import ContentInput from "../components/molecules/inputs/ContentInput";
import CoverImageInput from "../components/molecules/inputs/CoverImageInput";
import DiscardButton_enhancer from "../components/molecules/inputs/DiscardButton";
import EmailInput from "../components/molecules/inputs/EmailInput";
import GoogleOAuthInput from "../components/molecules/inputs/GoogleOAuthInput";
import OTPInput from "../components/molecules/inputs/OTPInput";
import PasswordInput from "../components/molecules/inputs/PasswordInput";
import ProfileImageInput from "../components/molecules/inputs/ProfileImageInput";
import ProfileNameInput from "../components/molecules/inputs/ProfileNameInput";
import SearchInput from "../components/molecules/inputs/SearchInput";
import SocialMediaProfilesInput from "../components/molecules/inputs/SocialMediaProfilesInput";
import SubmitButton from "../components/molecules/inputs/SubmitButton";
import SummaryInput from "../components/molecules/inputs/SummaryInput";
import TagsInput from "../components/molecules/inputs/TagsInput";
import TitleInput from "../components/molecules/inputs/TitleInput";
import UsernameInput from "../components/molecules/inputs/UsernameInput";
import UsernameOrEmailInput from "../components/molecules/inputs/UsernameOrEmailInput";

export {
  BlogCard,
  BlogCardMini,
  OrphanBlogPlaceholder,
  NoPostPlaceholder,
  NoMoreResultsPlaceholder,
  NoResultsFoundPlaceholder,
  BorderWithText,
  CheckButton,
  Form,
  GeneralPlaceholders,
  InfoModal,
  LandingPageBG,
  landingPageBGAttribution, // constant
  LoadMoreData,
  Logo,
  LogoMini,
  Navbar,
  NavMenu,
  PageRedirectButton,
  PageRedirectLink,
  SocialMediaButton,
  SocialMediaIconButton,
  UserDetailedCard,
  UserCard,
  UserCardMini,
  ToggleMode,
  ToggleModeCircle,
  // actions
  DeleteBlogAction_enhancer,
  DeleteUserAction_enhancer,
  LogoutAction_enhancer,
  // inputs
  AboutInput,
  ContentInput,
  CoverImageInput,
  DiscardButton_enhancer,
  EmailInput,
  GoogleOAuthInput,
  OTPInput,
  PasswordInput,
  ProfileImageInput,
  ProfileNameInput,
  SearchInput,
  SocialMediaProfilesInput,
  SubmitButton,
  SummaryInput,
  TagsInput,
  TitleInput,
  UsernameInput,
  UsernameOrEmailInput,
};

// Organisms
import AuthForm from "../components/organisms/AuthForm";
import BlogList from "../components/organisms/BlogList";
import BlogViewer from "../components/organisms/BlogViewer";
import EditorForm from "../components/organisms/EditorForm";
import Footer from "../components/organisms/Footer";
import Header from "../components/organisms/Header";
import OwnerControls, {
  EditButton,
  DeleteButton,
} from "../components/organisms/OwnerControls";
import PasswordResetForm from "../components/organisms/PasswordResetForm";
import ResultPage from "../components/organisms/ResultPage";
import SearchViewer from "../components/organisms/SearchViewer";
import UserList from "../components/organisms/UserList";
import UpdateUserForm from "../components/organisms/UpdateUserForm";
import UserVerification, {
  UserVerification_enhancer,
  CancellationComponent,
} from "../components/organisms/UserVerification";
import UserViewer from "../components/organisms/UserViewer";

export {
  AuthForm,
  BlogList,
  BlogViewer,
  EditorForm,
  Footer,
  Header,
  OwnerControls,
  EditButton,
  DeleteButton,
  PasswordResetForm,
  ResultPage,
  SearchViewer,
  UserList,
  UpdateUserForm,
  UserVerification,
  UserVerification_enhancer,
  CancellationComponent,
  UserViewer,
};

// Templates
import {
  HorizontallyCenteredLayout,
  DynamicLayout_Tabs$TwoColumns,
  MultiColumnsLayout,
  MultiRowsLayout,
} from "../components/templates/DynamicLayouts";
import Layout from "../components/templates/Layout";

export {
  HorizontallyCenteredLayout,
  DynamicLayout_Tabs$TwoColumns,
  MultiColumnsLayout,
  MultiRowsLayout,
  Layout,
};

// Pages
import Blog from "../components/pages/Blog";
import CreateBlog from "../components/pages/CreateBlog";
import EmailVerification from "../components/pages/EmailVerification";
import GoogleOAuth20 from "../components/pages/GoogleOAuth20";
import Home from "../components/pages/Home";
import Landing from "../components/pages/Landing";
import Login from "../components/pages/Login";
import PasswordReset from "../components/pages/PasswordReset";
import PasswordResetRequest from "../components/pages/PasswordResetRequest";
import Register from "../components/pages/Register";
import Search from "../components/pages/Search";
import Unauthorized from "../components/pages/Unauthorized";
import Unavailable from "../components/pages/Unavailable";
import UpdateBlog from "../components/pages/UpdateBlog";
import UpdateUser from "../components/pages/UpdateUser";
import User from "../components/pages/User";

export {
  Blog,
  CreateBlog,
  EmailVerification,
  GoogleOAuth20,
  Home,
  Landing,
  Login,
  PasswordReset,
  PasswordResetRequest,
  Register,
  Search,
  Unauthorized,
  Unavailable,
  UpdateBlog,
  UpdateUser,
  User,
};

// Miscellaneous
import AppLifecycle from "../components/miscellaneous/AppLifecycle";
import ContextProviders from "../components/miscellaneous/ContextProviders";

export { AppLifecycle, ContextProviders };

// Hooks
import useInterval from "../hooks/useInterval";
import useLocalStorage from "../hooks/useLocalStorage";
import useMediaQuery from "../hooks/useMediaQuery";

export { useInterval, useLocalStorage, useMediaQuery };

// Contexts
import MessageProvider, {
  useMessage,
  useMessageMini,
} from "../contexts/MessageContext";
import PreLoaderProvider, { usePreLoader } from "../contexts/PreLoaderContext";
import ThemeProvider, { useTheme } from "../contexts/ThemeContext";

export {
  MessageProvider,
  useMessage,
  useMessageMini,
  PreLoaderProvider,
  usePreLoader,
  ThemeProvider,
  useTheme,
};

// APIs (calls)
import authApis from "../apis/authApis";
import blogApis from "../apis/blogApis";
import securityApis from "../apis/securityApis";
import userApis from "../apis/userApis";

export { authApis, blogApis, securityApis, userApis };

// Redux / States
// slices / reducers
import blogStates, { blogReducers } from "../states/slices/blogSlice";
import securityStates, {
  securityReducers,
} from "../states/slices/securitySlice";
// actions
import securityActions from "../states/actions/securityActions";
// store
import store from "../states/store";

export {
  // slices / reducers
  blogStates,
  blogReducers,
  securityStates,
  securityReducers,
  // actions
  securityActions,
  // store
  store,
};

// Utilities
import {
  setOverflowY,
  getCssVarValue,
  cssUnitExtractor,
  colorMix,
  checkFAIconLoaded,
  multipleMediaQueries,
} from "../utils/cssUtils";
import eventBus from "../utils/eventBus";
import {
  fetchData,
  populateWithFormData,
  filterTruthElements,
  removeElements,
  clipText,
  capitalize,
  chooseRandom,
  formatUrlQueryObj,
  setCookie,
  getCookie,
} from "../utils/jsUtils";
import { randomFancyColor } from "../utils/uiUtils";
import { durationToMs, generateExpireTime } from "../utils/timeUtils";

export {
  setOverflowY,
  getCssVarValue,
  cssUnitExtractor,
  colorMix,
  checkFAIconLoaded,
  multipleMediaQueries,
  eventBus,
  fetchData,
  populateWithFormData,
  filterTruthElements,
  removeElements,
  durationToMs,
  generateExpireTime,
  clipText,
  capitalize,
  chooseRandom,
  randomFancyColor,
  formatUrlQueryObj,
  setCookie,
  getCookie,
};

// Helpers
import {
  formatUserProfileImageUrl,
  formatBlogCoverImageUrl,
  formatBlogCreatedAt$UpdatedAt,
  formatUserAccCreatedAt$UpdatedAt,
} from "../helpers/apiHelpers";
import BlogReadTracker from "../helpers/BlogReadTracker";

export {
  formatUserProfileImageUrl,
  formatBlogCoverImageUrl,
  formatBlogCreatedAt$UpdatedAt,
  formatUserAccCreatedAt$UpdatedAt,
  BlogReadTracker,
};
