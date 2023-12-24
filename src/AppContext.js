import { createContext, useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { getCategories, getInfo } from "./api/admin.controller";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState([]);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setMenu(await getCategories());
        setInfo(await getInfo());
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{ menu, setMenu, info, setInfo }}>
      {loading && (
        <div className="fixed h-screen w-screen flex items-center justify-center z-[9999] bg-white">
          <InfinitySpin color="#4fa94d" />
        </div>
      )}
      {!loading && children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
