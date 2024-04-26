// ====================================================== //
// ================== fn to fetch data ================== //
// ====================================================== //
const publickey = "2555e84c834b5289fc4fcd3c63782251";
const privatekey = "ce1b5c8e81bf904cc40b9d5f1332acbe886fa070"; // Because I have to host it on github and idk CI/CD yet
const baseURL = "https://gateway.marvel.com/v1/public/characters?";
async function getData(query) {
  let ts = new Date().getTime();
  const hashedkey = CryptoJS.MD5(ts + privatekey + publickey).toString();
  let queryURL;
  if (!query) {
    queryURL = `${baseURL}ts=${ts}&apikey=${publickey}&hash=${hashedkey}`;
    // console.log(queryURL);
  } else {
    queryURL = `${baseURL}nameStartsWith=${query}&ts=${ts}&apikey=${publickey}&hash=${hashedkey}`;
  }

  let response = await (await fetch(queryURL)).json();

  if (response.code === 200) {
    return response.data.results;
  } else {
    console.log(`Error in fetching + status code : ${response.code}`);
  }
}
export default getData;
