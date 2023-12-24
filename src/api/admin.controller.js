import { getAPI, postAPI } from "./helperAPI";

// const localUrl = "http://localhost:8000/v1/admin/";
const baseUrl =
  "https://albasha-restaurant-87b9d1383ccc.herokuapp.com/v1/admin/";

export const loginHTTP = async (authData) => {
  const url = baseUrl + "login";
  const body = {
    email: authData.email,
    password: authData.password,
  };
  return await postAPI(url, body, "", true);
};

export const getInfo = async () => {
  const url = baseUrl + "information";
  return await getAPI(url);
};

export const editInformationHTTP = async (info) => {
  const url = baseUrl + "updateInfo";
  return await postAPI(url, info);
};

export const getCategories = async () => {
  const url = baseUrl + "categories";
  return await getAPI(url);
};

export const getProducts = async () => {
  const url = baseUrl + "products";
  return await getAPI(url);
};

export const getGroups = async () => {
  const url = baseUrl + "groups";
  return await getAPI(url);
};

export const getAddons = async () => {
  const url = baseUrl + "addons";
  return await getAPI(url);
};

export const addCategoryHTTP = async (category, type) => {
  const url =
    baseUrl +
    (type === "create" ? "createCategory" : "editCategory/" + category.id);
  const body = {
    name: category.name,
    description: category.description,
    products: category.products,
    special: category.special,
  };
  return await postAPI(url, body);
};

export const uploadImageHTTP = async (image) => {
  const url = baseUrl + "uploadImage";
  const body = image;
  return await postAPI(url, body);
};

export const addProductHTTP = async (product, type) => {
  const url =
    baseUrl +
    (type === "create" ? "createProduct" : "editProduct/" + product.id);
  const body = {
    name: product.name,
    description: product.description,
    price: product.price,
    groups: product.groups,
    image: product.image,
  };
  return await postAPI(url, body);
};

export const addGroupHTTP = async (group, type) => {
  const url =
    baseUrl + (type === "create" ? "createGroup" : "editGroup/" + group.id);
  const { id, ...body } = group;
  return await postAPI(url, body);
};

export const addAddonsHTTP = async (addon, type) => {
  const url =
    baseUrl + (type === "create" ? "createAddon" : "editAddon/" + addon.id);
  const body = {
    name: addon.name,
    price: addon.price,
  };
  return await postAPI(url, body);
};

export const removeHTTP = async (id, type) => {
  let url = baseUrl;
  if (type === "category") url = url + "removeCategory/" + id;
  else if (type === "product") url = url + "removeProduct/" + id;
  else if (type === "group") url = url + "removeGroup/" + id;
  else if (type === "addon") url = url + "removeAddon/" + id;
  const body = {};
  return await postAPI(url, body);
};
