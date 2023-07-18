import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { IconButton } from 'react-native-paper';
import { deleteTaskUseMutation, getTasks } from '../../Hooks/Tasks';
import { HStack, Box, Spacer } from "@react-native-material/core";
import { Text, Button, PaperProvider } from 'react-native-paper';
import Tasks from './Tasks';

type TasksProps = {
  navigation: any;
}

const TasksContainer: React.FC<TasksProps> = ({ navigation }) => {
  const { data, refetch, isLoading } = getTasks();

  const onSuccess = () => {
    refetch();
  }

  const { mutate } = deleteTaskUseMutation(onSuccess);
  
  const removeTaskById = (id: string) => mutate(id);

  return (
    <ScrollView>
      <Tasks 
        taskList={data ?? []}
        refetch={refetch} 
        removeTaskById={removeTaskById}
        navigation={navigation}
      />
    </ScrollView>
  )
}

export default TasksContainer;
