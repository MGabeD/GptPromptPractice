const openai = require('openai');
const TOKEN = require('./token');

openai.apiKey = TOKEN;

module.exports = openai;
