import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { IconButton } from 'react-native-paper';
import { deleteTaskUseMutation, getTasks } from '../../Hooks/Tasks';
import { HStack, Box, Spacer } from "@react-native-material/core";
import { Text, Button, PaperProvider } from 'react-native-paper';
import { TaskType } from '../../Services/tasks';

type TasksProps = {
  navigation: any;
  removeTaskById: (id: string) => void;
  taskList: TaskType[]; 
  refetch: () => void;
}

const Tasks: React.FC<TasksProps> = ({ navigation, refetch, removeTaskById, taskList }) => {
  return (
    <View>
      <HStack style={{ alignItems: 'center' }}>
        <Text children="Tarefas" style={taskStyle.title} variant='headlineLarge' />
        <Spacer />
        <Button
          icon='hospital'
          children='Adicionar'
          mode='contained'
          onPress={() => navigation.navigate('CreateTask')}
          style={{ width: 120, marginRight: 10, marginTop: 2 }}
        />
        <IconButton onPress={() => refetch()} icon='refresh' />
      </HStack>

      {taskList?.length ? taskList?.map((item) =>
        <View style={taskStyle.cardTask}>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#000000',
            marginBottom: 4
          }}>
            {item.title}
          </Text>
          {!!item?.description && <Text style={{
            fontSize: 18
          }}>
            Descricação: {item.description}
          </Text>}
          <IconButton
            icon='delete'
            onPress={() => removeTaskById(item.id)}
            iconColor='#222'
            style={{
              top: 0,
              right: 0,
              position: 'absolute',
            }}
          />
        </View>
      ) : 
      <View style={{marginTop: '60%'}}>
        <Text style={taskStyle.notTaskTitle} children='Nenhuma tarefa adicionada'/>
      </View>}
    </View>
  )
}

const taskStyle = StyleSheet.create({
  title: {
    fontSize: 30,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
    marginLeft: 10,
    marginTop: 10
  },
  notTaskTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
    height: '100%', 
    textAlign: 'center'
  },
  cardTask: {
    margin: 10,
    padding: 10,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: 'solid',
    position: 'relative'
  }
})

export default Tasks;
