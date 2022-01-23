import React, {FC, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const PageLoader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PageLoader;
