import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
} from 'react-native';
import {Controller} from 'react-hook-form';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';

type AccordionProps = {
  title: string;
  index: number;
  placeholder: string;
  control: any;
  watchMeals: any;
  isExpanded: boolean;
  // isCompleted: boolean;
  toggleSection: (index: number) => void;
  handleAddMore: () => void;
  handleActivateNext: (text: string, index: number) => void;
  isMultilined: boolean;
  expandableIndex: any;
  expandedIndex: number;
  activeforms: any;
};

const Accordion: React.FC<AccordionProps> = ({
  title,
  index,
  placeholder,
  control,
  watchMeals,
  isExpanded,
  // isCompleted,
  toggleSection,
  handleAddMore,
  isMultilined,
  expandableIndex,
  expandedIndex,
  handleActivateNext,
  activeforms,
}) => {
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

  console.log(`activeforms`, activeforms);
  console.log(`isExpanded`, isExpanded);

  return (
    <View key={index} style={styles.accordionContainer}>
      <TouchableOpacity
        style={[
          styles.accordionHeader,
          // isCompleted ? styles.completedAccordion : null,
        ]}
        activeOpacity={activeforms?.includes(index) ? 0 : 1}
        onPress={() =>
          activeforms?.includes(index) ? toggleSection(index) : null
        }>
        <Text style={styles.accordionTitle}>
          {title}
          {index === 0 || index === 2 || index === 4 ? '*' : ''}
        </Text>
        {!isExpanded && (
          <Icon
            name={'chevron-circle-down'}
            size={24}
            color={activeforms?.includes(index) ? '#03989f' : 'gray'}
          />
        )}
      </TouchableOpacity>

      <Collapsible collapsed={!isExpanded}>
        <View style={styles.accordionBody}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <Text style={(styles.label, {marginBottom: 16})}>Time:</Text>
            <Controller
              control={control}
              name={`meals[${index}].time`}
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
          <Text style={styles.label}>Menu options:</Text>
          {watchMeals[index]?.menu?.map((_, menuIndex: number) => (
            <Controller
              key={menuIndex}
              control={control}
              name={`meals[${index}].menu[${menuIndex}]`}
              render={({field: {onChange, value}}) => (
                <TextInput
                  style={styles.input}
                  placeholder={placeholder}
                  value={value}
                  onChangeText={text => {
                    onChange(text);
                    handleActivateNext(text, index);
                  }}
                />
              )}
            />
          ))}
          {isMultilined && (
            <TouchableOpacity
              style={styles.addMoreButton}
              onPress={handleAddMore}>
              <Text style={styles.addMoreText}>Add More</Text>
              <Icon2 name="pluscircle" size={20} color="# " />
            </TouchableOpacity>
          )}
        </View>
      </Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  accordionContainer: {
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 3,
    padding: 10,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accordionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  completedAccordion: {
    backgroundColor: '#e8f5e9',
    borderColor: 'green',
    borderWidth: 1,
  },
  accordionBody: {
    marginTop: 12,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: 'bold',
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
    marginBottom: 16,
  },
  timePickerText: {
    fontSize: 14,
    color: '#555',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    marginBottom: 16,
  },
  addMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    justifyContent: 'flex-end',
  },
  addMoreText: {
    fontSize: 14,
    color: '#03989f',
  },
});

export default Accordion;
