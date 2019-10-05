const API_URL = 'http://api-desafio-front.justdigital.com.br/'
const axios = require('axios')

/**
 * Get all items inside API
 *
 * @returns {Object || Null}
 */
async function getAllProducts() {
  let result = await callApi(API_URL, 'get')
  return (result && !result.error) ? result : result
}

/**
 * This function can do many others calls if we change/include some parameters
 * I prefer to use like this because we can save some lines of code
 * 
 * @param {String} url to use on header of request
 * @param {String} type method of request
 * @return {Object}
 */
function callApi(url, type) {
  let request = {}
  if (type === 'get') {
    return axios.get(url);
  }
  return { "error": true, "message": request }
}

export const justService = {
  getAllProducts
}