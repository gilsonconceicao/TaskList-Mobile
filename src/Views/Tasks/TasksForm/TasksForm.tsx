import { View } from 'react-native'
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
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
  const isEditMode = id !== 'newTask';
  const { data: dataList,  refetch } = getTasks();
  const data = dataList?.find(task => task.id === id);

  const formValues = useForm({
    resolver: yupResolver(tasksFormSchema()),
    defaultValues: data ?? {} ?? defaultValues
  });

  const onSuccess = () => {
    refetch();
    navigation.navigate('Tasks');
  }

  const { mutate: createMutation } = createTaskUseMutation(onSuccess);
  const { mutate: editMutation } = editTaskUseMutation(id, onSuccess);
  const onSubmit = (values: any) => isEditMode ? editMutation(values) : createMutation(values);

  if (isEditMode && data === undefined) {
    return <Text style={{ margin: 20 }}>Carregando...</Text>
  }

  return (
    <View>
      <>
        <FormProvider {...formValues}>
          <TextFormField
            placeholder='Título'
            control={formValues.control}
            name="title"
            errors={formValues.formState.errors.title}
          />
          <TextFormField
            control={formValues.control}
            placeholder='Descrição'
            name="description"
            errors={formValues.formState.errors.description}
          />
          <Button
            children='Salvar'
            mode='contained'
            onPress={formValues.handleSubmit(onSubmit)}
            style={{ marginRight: 20, marginLeft: 20, marginTop: 20 }}
          />
        </FormProvider>
      </>
    </View>
  )
}

export default TasksForm
