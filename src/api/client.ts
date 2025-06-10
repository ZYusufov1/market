import axios from 'axios';

export const api = axios.create({
	baseURL: 'http://o-complex.com:1337',
	headers: { 'Content-Type': 'application/json' },
	timeout: 8000,
});
