import * as yup from 'yup'

export const tasksFormSchema = () => {
  return yup.object().shape({
    title: yup.string().required("Título precisa ser preenchido"),
    description: yup.string().nullable(),
  })
}

export const defaultValues = {
  title: '',
  description: '',
  updated: new Date(), 
  created: new Date() 
}
