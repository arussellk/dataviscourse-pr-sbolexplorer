import json from '../data/gfp_search_results.js'

export default class SearchService {
  static async getComponents(query: string) {
    return json.hits.filter(x => {
      return x._source.description && x._source.description.includes(query)
    })
  }
}
