import { StyleSheet, View } from 'react-native'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { defaultValues, tasksFormSchema } from './TasksFormSchema';
import TextFormField from '../../../Components/TextFormField/TextFormField';
import { Button } from 'react-native-paper';
import { createTaskUseMutation, getTasks } from '../../../Hooks/Tasks';

type TasksFormProps = {
  navigation: any; 
}

const TasksForm = ({ navigation }: TasksFormProps) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(tasksFormSchema()),
    defaultValues: defaultValues
  });

  const { refetch } = getTasks();
  
  const onSuccess = () => {
    refetch();
    navigation.navigate('Tasks'); 
  }

  const { mutate } = createTaskUseMutation(onSuccess);

  const onSubmit = (values: any) => mutate(values);

  return (
    <View>
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
