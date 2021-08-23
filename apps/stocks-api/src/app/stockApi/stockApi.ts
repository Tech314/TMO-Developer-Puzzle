
import * as http from 'request-promise';
import {environment} from '../../environments/environment';

export const stockApi = async (request, h) => {
    const payload = request.payload;
    try {
      const response = await http(buildOptions(payload));
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
};

const buildOptions = (opts) => {
  return {
    uri: `${environment.apiURL}/beta/stock/${opts.symbol}/chart/${opts.period}`,
    method: 'GET',
    qs: {
      token: environment.apiKey
    },
    json: true
  }
};
