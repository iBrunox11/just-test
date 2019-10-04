let API_URL = 'http://api-desafio-front.justdigital.com.br/'
const axios = require('axios')

export const justService = {
  getAllProducts
}

/**
 * Get all items inside API
 *
 * @returns {Object || Null}
 */
async function getAllProducts () {
  return callApi(API_URL, '', 'get')
}

/**
 *
 * @param {String} url to use on header of request
 * @param {Object} body json body
 * @param {String} type method of request
 */
async function callApi (url, body, type) {
  let result = {}
  if (type === 'post') {
    result = await axios
      .post(url, body)
  }
  return result
}
