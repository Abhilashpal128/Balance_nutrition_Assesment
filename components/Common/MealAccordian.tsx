import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Modal,
  Pressable,
} from 'react-native';
import {useForm, Controller, useFieldArray} from 'react-hook-form';
import Accordion from './MealAccordianComponent';
import {useNavigation} from '@react-navigation/native';
import TopContent from './TopContent';

type FormData = {
  meals: {time: string; menu: string[]}[];
};

const mealsData = [
  {
    title: 'Breakfast',
    placeholder: 'e.g. Upma + Apple juice',
    multiLine: true,
    isRequired: true,
  },
  {
    title: 'Mid-morning',
    placeholder: 'e.g. Snack',
    multiLine: false,
    isRequired: false,
  },
  {
    title: 'Lunch',
    placeholder: 'e.g. Dal + Rice',
    multiLine: true,
    isRequired: true,
  },
  {
    title: 'Late evening',
    placeholder: 'e.g. Tea + Biscuits',
    multiLine: false,
    isRequired: false,
  },
  {
    title: 'Dinner',
    placeholder: 'e.g. Soup + Salad',
    multiLine: true,
    isRequired: true,
  },
];

const MealAccordion: React.FC = () => {
  const navigation = useNavigation();
  const {control, handleSubmit, watch, setFocus} = useForm<FormData>({
    defaultValues: {
      meals: mealsData.map(() => ({time: '', menu: ['']})),
    },
  });

  const [expandedIndex, setExpandedIndex] = useState<number>(0);
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [expandableIndex, setExpandableIndex] = useState<number[]>([0]);
  const [shouldExpand, setShouldExpand] = useState<number[]>([]);
  const [activeforms, setActiveForms] = useState<number[]>([0]);
  const [isCompletedForm, setIsCompletedForm] = useState<boolean>(false);
  const [isAlert, setIsAlert] = useState<boolean>(false);

  const watchMeals = watch('meals');
  const toggleSection = (index: number) => {
    if (completedSections.includes(index)) return;
    setExpandedIndex(prev => (prev === index ? 10 : index));
    // setExpandedIndex(index);

    // setExpandableIndex([index + 1]);
  };

  useEffect(() => {
    setIsAlert(true);
  }, []);

  const handleActivateNext = (text: string, index: number) => {
    if (index === mealsData?.length - 1) {
      setIsCompletedForm(true);
    }
    setActiveForms(prev => {
      if (!prev?.includes(index + 1)) {
        if (!mealsData[index]?.isRequired) {
          return [...prev, index + 1];
        }
        return [...prev, index + 1, index + 2];
      }
      return prev;
    });
  };

  const fieldArrays = mealsData.map((_, index) =>
    useFieldArray({
      control,
      name: `meals[${index}].menu`,
    }),
  );

  const handleAddMore = (index: number) => {
    fieldArrays[index].append('');
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
    navigation.navigate('Workout Meal Details');
  };

  const handleOkPress = () => {
    // log(`hii`);
    setIsAlert(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TopContent content="Please tell us about all the meals you eat on a day-to-day basis. mention a variety of options & not just one." />
      <View style={{marginTop: 20}}>
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
              expandedIndex={expandedIndex}
              isRequired={meal?.isRequired}
            />
          );
        })}
      </View>
      <TouchableOpacity
        style={[
          styles.submitButton,
          {backgroundColor: isCompletedForm ? '#03989f' : '#ccc'},
        ]}
        activeOpacity={isCompletedForm ? 0 : 1}
        onPress={handleSubmit(onSubmit)}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isAlert}
        onRequestClose={() => setIsAlert(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Note!</Text>
            <Text style={styles.modalText}>
              In case you eat out or carry meals to office, do mention those in
              your recall too.
            </Text>
            <Pressable style={styles.okButton} onPress={handleOkPress}>
              <Text style={styles.okButtonText}>Ok</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContainer: {
    width: '85%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  okButton: {
    backgroundColor: '#03989f',
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  okButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default MealAccordion;
