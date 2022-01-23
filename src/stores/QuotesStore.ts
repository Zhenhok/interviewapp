import {action, makeObservable, observable} from 'mobx';
import {getQuotes} from '../api/requests';
import {QuoteType} from '../utils/types';

class QuotesStore {
  public quotes: QuoteType[] = [];
  public quotesLoading: boolean = true;
  public quotesLoadingError: boolean = false;

  public setQuotes = (quotes: QuoteType[]) => {
    this.quotes = quotes;
  };
  public setQuotesLoading = (quotesLoading: boolean) => {
    this.quotesLoading = quotesLoading;
  };
  public setQuotesLoadingError = (quotesLoadingError: boolean) => {
    this.quotesLoadingError = quotesLoadingError;
  };

  constructor() {
    makeObservable(this, {
      quotes: observable,
      quotesLoading: observable,
      quotesLoadingError: observable,
      setQuotes: action,
      setQuotesLoading: action,
      setQuotesLoadingError: action,
    });
  }

  getQuotes = () => {
    getQuotes()
      .then((json) => {
        console.log('dataUpload', json);
        let jsonKeys: string[] = Object.keys(json);

        this.setQuotes(
          jsonKeys.map((key) => ({
            name: key,
            ...json[key],
          }))
        );

        if (this.quotesLoadingError) {
          this.setQuotesLoadingError(false);
        }

        if (this.quotesLoading) {
          this.setQuotesLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        if (!this.quotesLoadingError) {
          this.setQuotesLoadingError(true);
        }
        if (this.quotesLoading) {
          this.setQuotesLoading(false);
        }
      });
  };
}

export default new QuotesStore();
