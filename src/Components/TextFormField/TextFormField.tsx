import React from 'react'
import { Controller } from 'react-hook-form'
import { Text, TextInput } from 'react-native'

type TextFormFieldProps = {
  control?: any; 
  errors?: any;
  placeholder: string;
  name: string;
  required?: boolean;
}

const TextFormField: React.FC<TextFormFieldProps> = ({ 
  control, 
  errors, 
  placeholder, 
  name, 
  required
}) => {
  return (
    <>
      <Controller
        control={control}
        rules={{ required }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              padding: 10,
              margin: 10,
              borderRadius: 5,
              backgroundColor: 'white',
              color: 'black',
              fontSize: 16,
              fontFamily: 'Roboto',
            }}
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name={name}
      />
      {errors && 
        <Text style={{
          color:'red',
          fontSize: 12,
          fontFamily: 'Roboto',
          marginLeft: 13, 
          marginTop: -3
        }}>{errors?.message}</Text>
      }
    </>
  )
}

export default TextFormField
