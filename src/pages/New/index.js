import React, { useState } from 'react';
import {
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert
} from 'react-native';
import {
  Background,
  Input,
  SubmitButton,
  SubmitText
} from './styles';
import Header from '../../components/Header';
import Picker from '../../components/Picker';
import firebase from '../../services/firebaseConnection';
import { useNavigation } from '@react-navigation/native';

export default function New() {
  const navigation = useNavigation();
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState('receita');

  function handleSubmit() {
    Keyboard.dismiss();

    if(isNaN(parseFloat(value)) || type === null || description === '') {
      alert('Preencha todos os campos!');
      return;
    }

    Alert.alert(
      'Confirmando dados',
      `Você deseja adicionar uma ${type} de R$ ${value} com a descrição ${description}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Continuar',
          onPress: () => handleAdd()
        }
      ]
    )
  }

  async function handleAdd() {
    let uid = await firebase.auth().currentUser.uid;
    let key = await firebase.database().ref('movements').child(uid).push().key;
    await firebase.database().ref('movements').child(uid).child(key).set({
      description: description,
      value: parseFloat(value),
      type: type,
      date: new Date().toLocaleDateString()
    });

    let user = firebase.database().ref('users').child(uid);
    await user.once('value').then((snapshot) => {
      let balance = parseFloat(snapshot.val().balance);
      type === 'despesa' ? balance -= parseFloat(value) : balance += parseFloat(value);
      user.child('balance').set(balance);
    });

    Keyboard.dismiss();
    setDescription('');
    setValue('');
    setType('receita');
    navigation.navigate('Home');
  }

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
            placeholder="Valor"
            keyboardType="numeric"
            returnKeyType="next"
            onSubmitEditing={() => Keyboard.dismiss()}
            value={value}
            onChangeText={text => setValue(text)}
          />

          <Picker onChange={setType} type={type} />

          <SubmitButton onPress={handleSubmit}>
            <SubmitText>Registrar</SubmitText>
          </SubmitButton>
        </SafeAreaView>
      </Background>
    </TouchableWithoutFeedback>
  );
}