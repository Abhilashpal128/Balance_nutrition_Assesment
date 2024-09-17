import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import TopContent from './Common/TopContent';
import {Picker} from '@react-native-picker/picker';
import {useForm, Controller} from 'react-hook-form';
import {Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';

type FormData = {
  recallOption: string;
  preWorkoutTime: string;
  postWorkoutTime: string;
  preWorkoutMeal: string;
  postWorkoutMeal: string;
};

const onSubmit = (data: FormData) => {
  console.log(data);
  // You can handle form submission here (e.g., sending data to an API)
};

export default function WorkoutMealDetails() {
  const [meals, setMeals] = useState<string>('');

  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleTimeChange = (
    onChange: (value: string) => void,
    event: any,
    selectedTime?: Date,
  ) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const timeString = selectedTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      onChange(timeString);
    }
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    defaultValues: {
      recallOption: 'Both',
      preWorkoutTime: '10:00 PM',
      postWorkoutTime: '11:00 AM',
      preWorkoutMeal: '',
      postWorkoutMeal: '',
    },
  });
  return (
    <SafeAreaView style={{backgroundColor: '#fff', height: '100%'}}>
      <TopContent
        content={
          'Please Descripbe the meals you eat before or after your workout, if any'
        }
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.boxStyle}>
          <Text style={styles.label}>
            Besides the recall you shared, are there any additional pre-workout
            or post-workout meals you consume?
          </Text>
          <View style={styles.pickerContainer}>
            {/* <Controller
              control={control}
              name="recallOption"
              render={({field: {onChange, value}}) => (
                
              )}
            /> */}
            <Picker
              selectedValue={meals}
              style={styles.picker}
              onValueChange={itemValue => setMeals(itemValue)}>
              <Picker.Item label="Select a meal type..." value="" />
              <Picker.Item label="Both" value="Both" />
              <Picker.Item label="Pre-workout" value="Pre-workout" />
              <Picker.Item label="Post-workout" value="Post-workout" />
            </Picker>
          </View>
        </View>

        {/* Pre-Workout Section */}
        {(meals === 'Pre-workout' || meals === 'Both') && (
          <View style={styles.boxStyle}>
            <Text style={styles.label}>
              What is your usual pre-workout meal?
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                marginVertical: 10,
              }}>
              <Text style={styles.label}>Time:</Text>
              <Controller
                control={control}
                name={`preWorkoutTime`}
                render={({field: {onChange, value}}) => (
                  <>
                    <TouchableOpacity
                      style={styles.timePicker}
                      onPress={() => setShowTimePicker(true)}>
                      <Text style={styles.timePickerText}>
                        {value || 'Select time'}
                      </Text>
                      <Icon2 name="caretdown" size={10} color="black" />
                    </TouchableOpacity>
                    {showTimePicker && (
                      <DateTimePicker
                        value={new Date()}
                        mode="time"
                        display="default"
                        onChange={(event, selectedTime) =>
                          handleTimeChange(onChange, event, selectedTime)
                        }
                      />
                    )}
                  </>
                )}
              />
            </View>
            {errors.preWorkoutMeal && (
              <Text style={styles.errorText}>This is required.</Text>
            )}
            <Text style={styles.label}>Menu Options:</Text>
            <Controller
              control={control}
              name="preWorkoutMeal"
              //   rules={{required: true}}
              render={({field: {onChange, value}}) => (
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g. banana, black coffee, nuts"
                  value={value}
                  onChangeText={onChange}
                  placeholderTextColor={'#555'}
                />
              )}
            />
          </View>
        )}
        {/* Post-Workout Section */}
        {(meals === 'Post-workout' || meals === 'Both') && (
          <View style={styles.boxStyle}>
            <Text style={styles.label}>
              What is your usual post-workout meal?
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                marginVertical: 10,
              }}>
              <Text style={styles.label}>Time:</Text>
              <Controller
                control={control}
                name={`preWorkoutTime`}
                render={({field: {onChange, value}}) => (
                  <>
                    <TouchableOpacity
                      style={styles.timePicker}
                      onPress={() => setShowTimePicker(true)}>
                      <Text style={styles.timePickerText}>
                        {value || 'Select time'}
                      </Text>
                      <Icon2 name="caretdown" size={10} color="black" />
                    </TouchableOpacity>
                    {showTimePicker && (
                      <DateTimePicker
                        value={new Date()}
                        mode="time"
                        display="default"
                        onChange={(event, selectedTime) =>
                          handleTimeChange(onChange, event, selectedTime)
                        }
                      />
                    )}
                  </>
                )}
              />
            </View>
            {errors.preWorkoutMeal && (
              <Text style={styles.errorText}>This is required.</Text>
            )}
            <Text style={styles.label}>Menu Options:</Text>
            <Controller
              control={control}
              name="postWorkoutMeal"
              //   rules={{required: true}}
              render={({field: {onChange, value}}) => (
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g. banana, black coffee, nuts"
                  value={value}
                  onChangeText={onChange}
                  placeholderTextColor={'#555'}
                />
              )}
            />
          </View>
        )}
      </ScrollView>
      <Pressable style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    flexGrow: 1,
    gap: 10,
    marginTop: 20,
    height: 'auto',
    paddingBottom: 40,
  },
  submitButton: {
    backgroundColor: '#03989f',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',
    marginBottom: 20,
    width: '100%',
    // bottom: 20,
  },
  boxStyle: {
    padding: 20,
    width: '90%',
    backgroundColor: '#fff',
    marginHorizontal: 'auto',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  timePicker: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // padding: 12,
    borderBottomWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    // marginBottom: 16,
  },
  timePickerText: {
    fontSize: 14,
    color: '#555',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a237e',
  },
  subheading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
  },
  pickerContainer: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#555',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  inputLabel: {
    fontSize: 16,
    marginRight: 8,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    flex: 1,
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    color: '#555',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
