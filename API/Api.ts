import axios from 'axios';


export const FetchSearchData = async(query: string | undefined, page:number | undefined) =>{
    try {
        const response = await axios.get(`http://www.omdbapi.com/?s=${query}&page=${page}&apikey=f5f7208e`);
        return response.data;
    } catch (error) {
        console.error(error);
      }
}

export const FetchSearchDataByID = async(query: string | undefined) =>{
    try {
        const response = await axios.get(`http://www.omdbapi.com/?i=${query}&page=1&apikey=f5f7208e`);
        return response.data;
    } catch (error) {
        console.error(error);
      }
}