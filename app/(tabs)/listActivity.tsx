// app/(tabs)/listActivity.tsx
import React from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import ActivityCard from '../../components/ActivityCard';
import { Activity } from '@/state/types';

export default function ListActivity() {
  const activities = useSelector((state: any) => state.activityReducer.activities) as Activity[];
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <View className="flex-1 bg-gray-50">
      {activities.length > 0 ? (
        <FlatList
          data={activities}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ActivityCard key={item.id} activity={item} />}
          contentContainerClassName="p-4"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-gray-500 text-lg mb-2">No activities yet</Text>
          <Text className="text-gray-400 text-center">
            Add your first activity by tapping on the "Add Activity" tab below.
          </Text>
        </View>
      )}
    </View>
  );
}