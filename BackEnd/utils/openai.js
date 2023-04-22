const { openai } = require('@openai/api');
const TOKEN = require('./token');

const client = new openai({ apiKey: TOKEN.TOKEN });

module.exports = client;
