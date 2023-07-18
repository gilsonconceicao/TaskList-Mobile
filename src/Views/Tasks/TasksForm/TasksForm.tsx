import { StyleSheet, View } from 'react-native'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { defaultValues, tasksFormSchema } from './TasksFormSchema';
import TextFormField from '../../../Components/TextFormField/TextFormField';
import { Button, Text } from 'react-native-paper';
import { createTaskUseMutation, editTaskUseMutation, getTasks, useGetTaskById } from '../../../Hooks/Tasks';

type TasksFormProps = {
  navigation: any;
  route: any;
}

const TasksForm = ({ navigation, route }: TasksFormProps) => {
  const { id } = route?.params;
  const { data, isLoading } = useGetTaskById(id);
  const { refetch } = getTasks();
  const isEditMode = id !== 'newTask';

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(tasksFormSchema()),
    defaultValues: isEditMode ? data : defaultValues
  });

  const onSuccess = () => {
    refetch();
    navigation.navigate('Tasks');
  }

  const { mutate: createMutation } = createTaskUseMutation(onSuccess);
  const { mutate: editMutation } = editTaskUseMutation(id, onSuccess);
  const onSubmit = (values: any) => isEditMode ? editMutation(values) : createMutation(values);

  if ( isEditMode && isLoading && data === undefined) {
    return <Text style={{margin: 20}}>Carregando...</Text>
  }

  return (
    <View>
      <>
        <TextFormField
          placeholder='Título'
          control={control}
          name="title"
          errors={errors.title}
        />
        <TextFormField
          control={control}
          placeholder='Descrição'
          name="description"
          errors={errors.description}
        />
        <Button
          children='Salvar'
          mode='contained'
          onPress={handleSubmit(onSubmit)}
          style={{ marginRight: 20, marginLeft: 20, marginTop: 20 }}
        />
      </>
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
  }
})

export default TasksForm
