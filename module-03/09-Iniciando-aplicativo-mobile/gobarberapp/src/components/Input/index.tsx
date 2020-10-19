import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, icon, ...rest },
  ref,
) => {
  const inputElementref = useRef<any>(null);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValeuRef = useRef<InputValueReference>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValeuRef.current.value);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementref.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValeuRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValeuRef.current.value = value;
        inputElementref.current.setNative({ text: value });
      },
      clearValue() {
        inputValeuRef.current.value = '';
        inputElementref.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container isFocused={isFocused}>
      <Icon
        name={icon}
        size={20}
        color={isFocused || isFilled ? '#ff9000' : '#666360'}
      />

      <TextInput
        ref={inputElementref}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChangeText={value => {
          inputValeuRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
