import axios from 'axios';
const ApiManager = axios.create({
	baseURL: 'http://localhost:5001/api',
	responseType: 'json',
	withCredentials: true
});

export default ApiManager;