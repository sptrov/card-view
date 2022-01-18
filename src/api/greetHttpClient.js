import axios from "axios";


let http = axios.create({
  baseURL: 'https://greet.bg/wp-json/wc/store/',
  ///greet.bg/wp-json/wc/store/products?page=1
});

export const getProducts = async (page = 1) => {
  let results = await http.get(`/products?page=` + page);

  return results.data;
}



export default http;