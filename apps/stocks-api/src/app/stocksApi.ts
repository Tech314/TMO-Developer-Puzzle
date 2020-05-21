
import * as http from 'request-promise';
import {environment} from '../environments/environment';
import { ResponseToolkit } from 'hapi';

export const stockApi = async (request, h: ResponseToolkit) => {
    const payload = request.payload;
    try {
      const response = await http(buildOptions(payload));
      const apiResponse = h.response(response);
      apiResponse.header('cache-control', 'max-age=300, must-revalidate, private');
      return apiResponse;
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
