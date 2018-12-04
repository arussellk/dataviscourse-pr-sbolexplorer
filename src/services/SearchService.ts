import device from '../data/searchResults/device_search_results'
import gfp from '../data/searchResults/gfp_search_results'
import rbs from '../data/searchResults/rbs_search_results'
import request = require('request')

export default class SearchService {
  // if mock, loads from the json search results in data file
  static async getComponents(query: string, mock: boolean) {
    let json

    if (mock) {
      switch (query) {
        case 'device':
          json = device
          break
        case 'gfp':
          json = gfp
          break
        case 'rbs':
          json = rbs
          break
        default:
          json = { hits: [] }
      }
    } else {
      json = await new Promise((resolve, reject) => {
        request('http://localhost:13162/search?query=' + query, (error, response, body) => {
          console.log('error:', error)
          resolve(JSON.parse(body))
        })
      })
    }

    return json.hits
           .filter(x => /^https:\/\/synbiohub\.org\/public\/igem/.test(x._source.subject))
           .slice(0, 100);
  }
}
