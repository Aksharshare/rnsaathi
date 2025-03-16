// components/ActivityForm.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addActivity, updateActivity } from '../../state/actions';
import { router, useLocalSearchParams } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

interface Activity {
  id: string;
  firstName: string;
  lastName: string;
  activityName: string;
  activityDate: string;
}

const ActivityForm: React.FC = () => {
  const dispatch = useDispatch();
  const params = useLocalSearchParams();
  const { id } = params;
  
  const activities = useSelector((state: any) => state.activityReducer.activities) as Activity[];
  const existingActivity = id ? activities.find((a: Activity) => a.id === id) : null;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [activityName, setActivityName] = useState('');
  const [activityDate, setActivityDate] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (existingActivity) {
      setFirstName(existingActivity.firstName);
      setLastName(existingActivity.lastName);
      setActivityName(existingActivity.activityName);
      setActivityDate(existingActivity.activityDate);
    }
  }, [existingActivity]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!activityName.trim()) newErrors.activityName = 'Activity name is required';
    if (!activityDate.trim()) newErrors.activityDate = 'Date is required';
    else {
      // Simple date validation (YYYY-MM-DD)
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(activityDate)) {
        newErrors.activityDate = 'Date must be in YYYY-MM-DD format';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate;
    console.log('selectedDate', selectedDate);
    setShowDatePicker(Platform.OS === 'ios');
    setShowDatePicker(false);
    setActivityDate(currentDate ? format(currentDate, 'yyyy-MM-dd') : '');
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const activityData: Activity = {
      id: existingActivity ? existingActivity.id : Date.now().toString(),
      firstName,
      lastName,
      activityName,
      activityDate
    };

    if (existingActivity) {
      dispatch(updateActivity(activityData));
    } else {
      dispatch(addActivity(activityData));
    }

    // Reset form
    setFirstName('');
    setLastName('');
    setActivityName('');
    setActivityDate('');
    setErrors({});

    // Navigate back to list
    router.push('/(tabs)/listActivity');
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <Text className="text-2xl font-bold text-gray-800 mb-6">
          {existingActivity ? 'Update Activity' : 'Add New Activity'}
        </Text>
        
        <View className="mb-4">
          <Text className="text-gray-700 mb-2 font-medium">First Name</Text>
          <TextInput
            className={`bg-white p-4 rounded-lg border ${errors.firstName ? 'border-red-500' : 'border-gray-200'}`}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Enter first name"
          />
          {errors.firstName && <Text className="text-red-500 mt-1">{errors.firstName}</Text>}
        </View>

        <View className="mb-4">
          <Text className="text-gray-700 mb-2 font-medium">Last Name</Text>
          <TextInput
            className={`bg-white p-4 rounded-lg border ${errors.lastName ? 'border-red-500' : 'border-gray-200'}`}
            value={lastName}
            onChangeText={setLastName}
            placeholder="Enter last name"
          />
          {errors.lastName && <Text className="text-red-500 mt-1">{errors.lastName}</Text>}
        </View>

        <View className="mb-4">
          <Text className="text-gray-700 mb-2 font-medium">Activity Name</Text>
          <TextInput
            className={`bg-white p-4 rounded-lg border ${errors.activityName ? 'border-red-500' : 'border-gray-200'}`}
            value={activityName}
            onChangeText={setActivityName}
            placeholder="Enter activity name"
          />
          {errors.activityName && <Text className="text-red-500 mt-1">{errors.activityName}</Text>}
        </View>

        <View className="mb-6">
          <Text className="text-gray-700 mb-2 font-medium">Activity Date</Text>
          {/* <TextInput
            className={`bg-white p-4 rounded-lg border ${errors.activityDate ? 'border-red-500' : 'border-gray-200'}`}
            value={activityDate}
            onChangeText={setActivityDate}
            placeholder="YYYY-MM-DD"
          /> */}
        {/* </View> */}

        { <TouchableOpacity 
            onPress={showDatePicker ? () => setShowDatePicker(false) : () => setShowDatePicker(true)}
            className="bg-white p-4 rounded-lg border border-gray-200 flex-row justify-between items-center"
          >
            <Text className="text-gray-800">
              {format(activityDate || new Date(), 'MMMM dd, yyyy')}
            </Text>
            {/* <Text className="text-blue-500">Change</Text> */}
          </TouchableOpacity> }
          
          {/* Date Picker */}
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={activityDate ? new Date(activityDate) : new Date()}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
          {errors.activityDate && <Text className="text-red-500 mt-1">{errors.activityDate}</Text>}
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-blue-500 py-4 px-6 rounded-lg shadow-sm"
        >
          <Text className="text-white font-bold text-center text-lg">
            {existingActivity ? 'Update Activity' : 'Add Activity'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ActivityForm;