import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TopContent from '../components/Common/TopContent';
import MealAccordion from '../components/Common/MealAccordian';

export default function ScreensNAvigations() {
  return (
    <View style={{width: '100%', height: '100%'}}>
      <TopContent content="Please tell us about all the meals you eat on a day-to-day basis. mention a variety of options & not just one." />
      <MealAccordion />
    </View>
  );
}

const styles = StyleSheet.create({});
