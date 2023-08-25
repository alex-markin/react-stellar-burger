
import { ChangeEvent, useState } from 'react';

type FormValues = {
  [key: string]: string;
};

export function useForm(inputValues = {}) {
  const [values, setValues] = useState<FormValues>(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
    console.log(values);
  };
  return { values, handleChange, setValues };

}