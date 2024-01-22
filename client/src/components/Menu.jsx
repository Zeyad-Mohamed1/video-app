import styled from "styled-components";
import zeyadtube from "../img/logo.png";
import {
  AccountCircleOutlined,
  ArticleOutlined,
  ExploreOutlined,
  FlagOutlined,
  HelpOutlineOutlined,
  HistoryOutlined,
  Home,
  LibraryMusicOutlined,
  LiveTvOutlined,
  MovieOutlined,
  SettingsBrightnessOutlined,
  SettingsOutlined,
  SportsBasketballOutlined,
  SportsEsportsOutlined,
  SubscriptionsOutlined,
  VideoLibraryOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = styled.aside`
  min-height: 100vh;
  flex: 1;
  background-color: ${({ theme }) => theme.bgLighter};
  background-size: cover;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  position: relative;
`;

const Wrapper = styled.div`
  padding: 18px 26px;
  position: sticky;
  top: 0px;
  left: 0%;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;
`;

const Image = styled.img`
  height: 25px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div``;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const Menu = ({ darkMode, setDarkMode }) => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Container className="menu">
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <Image src={zeyadtube} />
            ZEYADTUBE
          </Logo>
        </Link>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <Home />
            Home
          </Item>
        </Link>
        <Link to="trends" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <ExploreOutlined />
            Explore
          </Item>
        </Link>
        <Link
          to="subscriptions"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <SubscriptionsOutlined />
            Subscriptions
          </Item>
        </Link>
        <Hr />
        <Item>
          <VideoLibraryOutlined />
          Library
        </Item>
        <Item>
          <HistoryOutlined />
          History
        </Item>
        <Hr />
        {!currentUser && (
          <>
            <Login>
              Sign in to like videos, comment, and subscribe.
              <Link
                to="signin"
                style={{ textDecoration: "none", color: "#3ea6ff" }}
              >
                <Button>
                  <AccountCircleOutlined />
                  SIGN IN
                </Button>
              </Link>
            </Login>
            <Hr />
          </>
        )}
        <Title>BEST OF ZEYADTUBE</Title>
        <Item>
          <LibraryMusicOutlined />
          Music
        </Item>
        <Item>
          <SportsBasketballOutlined />
          Sports
        </Item>
        <Item>
          <SportsEsportsOutlined />
          Gaming
        </Item>
        <Item>
          <MovieOutlined />
          Movies
        </Item>
        <Item>
          <ArticleOutlined />
          News
        </Item>
        <Item>
          <LiveTvOutlined />
          Live
        </Item>
        <Hr />
        <Item>
          <SettingsOutlined />
          Settings
        </Item>
        <Item>
          <FlagOutlined />
          Report
        </Item>
        <Item>
          <HelpOutlineOutlined />
          Help
        </Item>
        <Item onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlined />
          {darkMode ? "Light" : "Dark"} Mode
        </Item>
      </Wrapper>
    </Container>
  );
};

export default Menu;
