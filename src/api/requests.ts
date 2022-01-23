import {GetQoutesRequests} from '../utils/requestsTypes';
import {request} from './api';

export const getQuotes = async () => {
  return await request.GET<GetQoutesRequests>('public?command=returnTicker');
};
