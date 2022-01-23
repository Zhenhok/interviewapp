import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface IProps {
  title: string;
}

const PageNotification: FC<IProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 30,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#ba251a',
  },
  title: {
    color: '#fff',
  },
});

export default PageNotification;
