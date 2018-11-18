import device from '../data/searchResults/device_search_results'
import gfp from '../data/searchResults/gfp_search_results'
import rbs from '../data/searchResults/rbs_search_results'

export default class SearchService {
  // if mock, loads from the json search results in data file
  static async getComponents(query: string, mock: boolean) {
    let json
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

    if (mock){
      return json.hits
             .filter(x => /^https:\/\/synbiohub\.org\/public/.test(x._source.subject))
             .slice(0, 10);
    }
    else {
      //TODO request API call to get search result data
      return {'fully': 'loaded potato'}
    }
  }
}
