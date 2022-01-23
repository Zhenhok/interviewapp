import React, {FC, useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet, Image, Animated} from 'react-native';
import {Icons} from '../../../assets';

interface IProps {
  name: string;
  last: string;
  highestBid: string;
  percentChange: string;
}

const QuoteElement: FC<IProps> = (props) => {
  const [visibleValues, setVisibleValues] = useState<Omit<IProps, 'name'>>({
    last: '0',
    highestBid: '0',
    percentChange: '0',
  });

  let textOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setVisibleValues({
      last: props.last,
      highestBid: props.highestBid,
      percentChange: props.percentChange,
    });
    Animated.timing(textOpacity, {
      duration: 250,
      delay: 0,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    Animated.timing(textOpacity, {
      duration: 50,
      delay: 0,
      toValue: 0,
      useNativeDriver: true,
    }).start(({finished}) => {
      if (finished !== true) {
        return;
      }
      setVisibleValues({
        last: props.last,
        highestBid: props.highestBid,
        percentChange: props.percentChange,
      });
      Animated.timing(textOpacity, {
        duration: 250,
        delay: 0,
        toValue: 1,
        useNativeDriver: true,
      }).start();
    });
  }, [props.last, props.percentChange, props.highestBid]);

  const getPercentChangeColor = () => {
    if (+props.percentChange > 0) {
      return '#37a12d';
    } else if (+props.percentChange < 0) {
      return '#a11818';
    } else return '#000';
  };

  return (
    <View style={styles.container}>
      <View style={styles.headline}>
        <Text style={styles.name}>{props.name}</Text>
        <View style={styles.bidCont}>
          <Animated.Text style={{opacity: textOpacity, color: '#000'}}>
            {visibleValues.highestBid}
          </Animated.Text>
          <Image
            source={Icons.bidIcon.path}
            style={[Icons.bidIcon.size, {marginLeft: 5}]}
          />
        </View>
      </View>
      <View style={styles.bottomline}>
        <View style={styles.lastSaleCont}>
          <Image
            source={Icons.lastSaleIcon.path}
            style={[Icons.lastSaleIcon.size, {marginRight: 5}]}
          />
          <Animated.Text style={{opacity: textOpacity, color: '#000'}}>
            {visibleValues.last}
          </Animated.Text>
        </View>
        <Animated.Text
          style={{opacity: textOpacity, color: getPercentChangeColor()}}
        >
          {visibleValues.percentChange + '%'}
        </Animated.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderColor: '#acacac',
  },
  name: {
    fontSize: 18,
    color: '#000',
  },
  headline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  bidCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastSaleCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default QuoteElement;
