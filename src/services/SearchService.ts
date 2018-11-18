import json from '../data/gfp_search_results.js'

export default class SearchService {
  // if mock, loads from the json search results in data file
  static async getComponents(query: string, mock: boolean) {
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
