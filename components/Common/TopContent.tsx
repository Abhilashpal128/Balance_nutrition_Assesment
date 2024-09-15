import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface TopContentPropType {
  content: String;
}

export default function TopContent({content}: TopContentPropType) {
  return (
    <View style={styles.topContentContainer}>
      <Text style={styles.topContentText}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  topContentContainer: {
    backgroundColor: '#e0f7fa',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  topContentText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
