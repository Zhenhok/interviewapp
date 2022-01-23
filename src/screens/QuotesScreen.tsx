import {observer} from 'mobx-react';
import React, {FC, useEffect, useRef} from 'react';
import {FlatList} from 'react-native';
import {QuotesStore} from '../stores';
import {Page, PageLoader, PageNotification} from '../ui';
import {QuoteElement} from '../ui/components';
import {QuoteType} from '../utils/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface IProps {
  navigation: NativeStackNavigationProp<any, any>;
}

const QuotesScreen: FC<IProps> = (props) => {
  let updateInterval = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      QuotesStore.getQuotes();
      updateInterval.current = setInterval(() => {
        console.log('focus');
        QuotesStore.getQuotes();
      }, 5000);
    });

    return unsubscribe;
  }, [props.navigation]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('blur', () => {
      console.log('blur');
      clearInterval(updateInterval.current as NodeJS.Timeout);
      QuotesStore.setQuotesLoading(true);
    });

    return unsubscribe;
  }, [props.navigation]);

  const renderItem = ({item}: {item: QuoteType}) => {
    return (
      <QuoteElement
        name={item.name ?? 'Не указано'}
        percentChange={item.percentChange}
        last={item.last}
        highestBid={item.highestBid}
      />
    );
  };

  const keyExtractor = (item: QuoteType) => `${item.id}`;

  return (
    <Page>
      {QuotesStore.quotesLoadingError && (
        <PageNotification title={'Ошибка загрузки'} />
      )}
      {QuotesStore.quotesLoading ? (
        <PageLoader />
      ) : (
        <FlatList
          data={QuotesStore.quotes}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      )}
    </Page>
  );
};

export default observer(QuotesScreen);
