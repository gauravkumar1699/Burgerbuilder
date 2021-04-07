import axios from 'axios';

const instance = axios.create({
    baseURL:'https://react-my-burger-1a532-default-rtdb.firebaseio.com/'
});

export default instance;