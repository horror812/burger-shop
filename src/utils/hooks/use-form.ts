import { ChangeEvent, FormEvent, useCallback, useState } from "react";


export default function useForm<S>(inputValues: S) {
    const [values, setValues] = useState(inputValues);

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setValues({ ...values, [name]: value });
    }, [values, setValues]);

    return {
        values,
        setValues,
        handleChange
    };
}

export function useSubmitForm<S>(inputValues: S, onSubmit: (values: S) => void) {
    const [values, setValues] = useState(inputValues);

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setValues({ ...values, [name]: value });
    }, [values, setValues]);

    const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(values);
    }, [values, onSubmit]);

    return {
        values,
        setValues,
        handleChange,
        handleSubmit
    };
}

/*
export function useChangedForm<S>(inputValues:S) {
    const [values, setValues] = useState(inputValues);
    const [wasChanged, setChanged] = useState(false);

    const handleChange = useCallback((e:ChangeEvent<HTMLInputElement>) => {
      const {value, name} = e.target;
      setValues({...values, [name]: value});
      setChanged(true);
    },[values, setValues]);    
    
    const handleUpdate = useCallback((e:FormEvent) => {
        e.preventDefault();    
        // dispatch(updateUserThunk(userData));
        setChanged(false);
        setValues({...userData,password: ''});  
      }, [ values, setValues, setChanged]);
    
    const handleCancel = useCallback(() => {
    setChanged(false);
    setUserData({
        ...userData,
        name: userState.user.name || '',
        email: userState.user.email || '',
        password: ''
    });      
    }, [userState, userData, setUserData, setChanged]);

    return {
        wasChanged, 
        setChanged,
        values, 
        setValues,
        handleChange
    };
}*/