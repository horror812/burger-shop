import { ChangeEvent, FormEvent, useCallback, useState } from "react";


export default function useForm<S>(inputValues:S) {
    const [values, setValues] = useState(inputValues);
  
    const handleChange = useCallback((e:ChangeEvent<HTMLInputElement>) => {
      const {value, name} = e.target;
      setValues({...values, [name]: value});
    },[values, setValues]);            

    return {
        values, 
        setValues,
        handleChange
    };
}

export function useSubmitForm<S>(inputValues:S, onSubmit:(values:S)=>void) {
    const [values, setValues] = useState(inputValues);
  
    const handleChange = useCallback((e:ChangeEvent<HTMLInputElement>) => {
      const {value, name} = e.target;
      setValues({...values, [name]: value});
    },[values, setValues]);

    const handleSubmit = useCallback((e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(values);
    },[values, onSubmit]);             

    return {
        values, 
        setValues,
        handleChange,         
        handleSubmit
    };
}