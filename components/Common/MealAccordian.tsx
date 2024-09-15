import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import {useForm, Controller, useFieldArray} from 'react-hook-form';
import Accordion from './MealAccordianComponent';
import {useNavigation} from '@react-navigation/native';

type FormData = {
  meals: {time: string; menu: string[]}[];
};

const mealsData = [
  {title: 'Breakfast', placeholder: 'e.g. Upma + Apple juice', multiLine: true},
  {title: 'Mid-morning', placeholder: 'e.g. Snack', multiLine: false},
  {title: 'Lunch', placeholder: 'e.g. Dal + Rice', multiLine: true},
  {title: 'Late evening', placeholder: 'e.g. Tea + Biscuits', multiLine: false},
  {title: 'Dinner', placeholder: 'e.g. Soup + Salad', multiLine: true},
];

const MealAccordion: React.FC = () => {
  const navigation = useNavigation();
  const {control, handleSubmit, watch, setFocus} = useForm<FormData>({
    defaultValues: {
      meals: mealsData.map(() => ({time: '', menu: ['']})),
    },
  });

  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [expandableIndex, setExpandableIndex] = useState<number[]>([0]);
  const [shouldExpand, setShouldExpand] = useState<number[]>([]);
  const [activeforms, setActiveForms] = useState<number[]>([0]);
  const [isCompletedForm, setIsCompletedForm] = useState<boolean>(false);

  const watchMeals = watch('meals');
  const toggleSection = (index: number) => {
    if (completedSections.includes(index)) return;
    setExpandedIndex(prev => (prev === index ? null : index));
    // setExpandedIndex(index);

    // setExpandableIndex([index + 1]);
  };

  const handleActivateNext = (text: string, index: number) => {
    if (index === mealsData?.length - 1) {
      setIsCompletedForm(true);
    }
    setActiveForms(prev => {
      if (!prev?.includes(index + 1)) {
        console.log([...prev, index + 1]);
        return [...prev, index + 1];
      }
      return prev;
    });
  };

  // Create field arrays for each meal menu
  const fieldArrays = mealsData.map((_, index) =>
    useFieldArray({
      control,
      name: `meals[${index}].menu`,
    }),
  );

  const handleAddMore = (index: number) => {
    fieldArrays[index].append('');
  };

  // useEffect(() => {
  //   watchMeals.forEach((meal, index) => {
  //     if (
  //       meal.time &&
  //       meal.menu.every(m => m) &&
  //       !completedSections.includes(index)
  //     ) {
  //       setCompletedSections(prev => [...prev, index]);
  //       setExpandedIndex(index + 1);
  //       setExpandableIndex([index + 1]);
  //     }
  //   });
  // }, [watchMeals]);

  const onSubmit = (data: FormData) => {
    navigation.navigate('Workout Meal Details');
    console.log(data);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {mealsData.map((meal, index) => {
        // const isCompleted = completedSections.includes(index);
        console.log(`expandedIndex`, expandedIndex);
        console.log(`index`, index);

        const isExpanded = expandedIndex === index;

        return (
          <Accordion
            key={index}
            title={meal.title}
            index={index}
            placeholder={meal.placeholder}
            control={control}
            watchMeals={watchMeals}
            isExpanded={isExpanded}
            // isCompleted={isCompleted}
            toggleSection={toggleSection}
            handleActivateNext={handleActivateNext}
            handleAddMore={() => handleAddMore(index)}
            isMultilined={meal?.multiLine}
            expandableIndex={expandableIndex}
            activeforms={activeforms}
            // expandedIndex={expandedIndex}
          />
        );
      })}
      <TouchableOpacity
        style={[
          styles.submitButton,
          {backgroundColor: isCompletedForm ? '#03989f' : '#ccc'},
        ]}
        activeOpacity={isCompletedForm ? 0 : 1}
        onPress={handleSubmit(onSubmit)}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#ffffff',
  },
  submitButton: {
    // backgroundColor: '#isCompletedForm',
    padding: 16,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MealAccordion;
