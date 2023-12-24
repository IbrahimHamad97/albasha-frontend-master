import AboutUs from "../components/AboutUs";
import MenuBanner from "../components/MenuBanner";
import Form from "../components/Form";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import NavigationBar from "../components/NavigationBar";

export const Home = () => {
  const { info } = useContext(AppContext);
  return (
    <>
      <NavigationBar info={info} />
      <AboutUs info={info} />
      <MenuBanner />
      <Form info={info} />
    </>
  );
};
