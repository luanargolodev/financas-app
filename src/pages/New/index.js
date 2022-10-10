import React, { useState } from 'react';
import { SafeAreaView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import {
  Background,
  Input,
  SubmitButton,
  SubmitText
} from './styles';
import Header from '../../components/Header';
import Picker from '../../components/Picker';

export default function New() {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState('receita');

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Background>
        <Header />
        <SafeAreaView style={{ alignItems: 'center' }}>
          <Input
            placeholder="Descrição"
            returnKeyType="next"
            onSubmitEditing={() => Keyboard.dismiss()}
            value={description}
            onChangeText={text => setDescription(text)}
          />

          <Input
            placeholder="Valor desejado"
            keyboardType="numeric"
            returnKeyType="next"
            onSubmitEditing={() => Keyboard.dismiss()}
            value={value}
            onChangeText={text => setValue(text)}
          />

          <Picker onChange={setType} type={type} />

          <SubmitButton>
            <SubmitText>Registrar</SubmitText>
          </SubmitButton>
        </SafeAreaView>
      </Background>
    </TouchableWithoutFeedback>
  );
}