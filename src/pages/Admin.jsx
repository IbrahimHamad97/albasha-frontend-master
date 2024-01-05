import { useContext, useEffect, useRef, useState } from "react";
import AddProduct from "../components/admin/AddProduct";
import Login from "../components/admin/Login";
import AddCategory from "../components/admin/AddCategory";
import AddAddons from "../components/admin/AddAddons";
import AddGroup from "../components/admin/AddGroup";
import {
  getAddons,
  getCategories,
  getGroups,
  getInfo,
  getProducts,
} from "../api/admin.controller";
import { InfinitySpin } from "react-loader-spinner";
import AddGeneral from "../components/admin/AddGeneral";
import { AppContext } from "../AppContext";

const Admin = () => {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("Category");
  const list = ["Category", "Product", "Group", "Addons"];
  const [categories, setCategories] = useState([]);
  const [groups, setGroups] = useState([]);
  const [addons, setAddons] = useState([]);
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(null);
  const [info, setInfo] = useState(null);
  const isMounted = useRef(false);
  const { setMenu } = useContext(AppContext);

  useEffect(() => {
    const fetchTokenAndData = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        setLoading(true);
        await getGeneralInfo();
        await getCats();
        await getProds();
        await getGrps();
        await getAdds();
        setLoading(false);
      }
    };

    if (!isMounted.current) {
      isMounted.current = true;
      fetchTokenAndData();
    }
  }, []);

  const getGeneralInfo = async () => {
    setInfo(await getInfo());
  };

  const getCats = async () => {
    const res = await getCategories();
    setCategories(res);
    setMenu(res);
  };

  const getProds = async () => {
    setProducts(await getProducts());
  };

  const getGrps = async () => {
    setGroups(await getGroups());
  };

  const getAdds = async () => {
    setAddons(await getAddons());
  };

  return (
    <div className="min-h-[80vh] flex justify-center my-6 ">
      {loading ? (
        <div
          className="w-[98vw] sm:w-[420px] rounded-lg p-8 border-2 border-black 
          h-[600px] flex items-center justify-center"
        >
          <InfinitySpin color="#4fa94d" />
        </div>
      ) : (
        <div className="w-[98vw] sm:w-[420px] rounded-lg p-8 border-2 border-black h-fit">
          {token && (
            <div>
              <div
                className="cursor-pointer text-center border border-neutral-400 rounded-lg 
                      font-bold py-2 px-4 gen-anim mb-3"
                style={{
                  backgroundColor: type === "General" ? "black" : "white",
                  color: type === "General" ? "white" : "",
                }}
                onClick={() => setType("General")}
              >
                General Information
              </div>
              <div className="flex justify-between flex-wrap gap-y-3 mb-3">
                {list.map((name, key) => {
                  return (
                    <div
                      key={key}
                      className="cursor-pointer text-center border border-neutral-400 rounded-lg 
                      font-bold py-2 px-4 gen-anim w-[48%]"
                      style={{
                        backgroundColor: type === name ? "black" : "white",
                        color: type === name ? "white" : "",
                      }}
                      onClick={() => setType(name)}
                    >
                      {name}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {token ? (
            type === "Product" ? (
              <AddProduct
                groups={groups}
                products={products}
                click={() => getProds()}
              />
            ) : type === "Category" ? (
              <AddCategory
                categories={categories}
                products={products}
                click={() => getCats()}
              />
            ) : type === "Group" ? (
              <AddGroup
                groups={groups}
                addons={addons}
                click={() => getGrps()}
              />
            ) : type === "General" ? (
              <AddGeneral info={info} />
            ) : (
              <AddAddons addons={addons} click={() => getAdds()} />
            )
          ) : (
            <Login />
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;
