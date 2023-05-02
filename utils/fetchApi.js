import axios from "axios";

export const baseUrl = "https://bayut.p.rapidapi.com"


export const fetchApi = async ( url ) => {
    const {data} = await axios.get((url), {
        headers: {
            'X-RapidAPI-Key': 'bcb58e302dmsh67f92872631da5dp16c5f2jsn4021ad7b9ae8',
            'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
        }
    })

    return data;
}