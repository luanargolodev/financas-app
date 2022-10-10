import React, { useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import {
  Background,
  Container,
  Name,
  Balance,
  Title,
  List
} from './styles';
import { AuthContext } from '../../contexts/auth';
import Header from '../../components/Header';
import MovementsList from '../../components/MovementsList';
import firebase from '../../services/firebaseConnection';

export default function Home() {
  const [movements, setMovements] = useState([]);
  const [balance, setBalance] = useState(0);
  const { user } = useContext(AuthContext);
  const uid = user && user.uid;

  useEffect(() => {
    async function loadList() {
      await firebase.database().ref('users').child(uid).on('value', (snapshot) => {
        setBalance(snapshot.val().balance);
      });

      await firebase.database().ref('movements')
        .child(uid)
        .orderByChild('date').equalTo(new Date().toLocaleDateString())
        .limitToLast(10).on('value', (snapshot) => {
          setMovements([]);

          snapshot.forEach((childItem) => {
            let list = {
              key: childItem.key,
              description: childItem.val().description,
              type: childItem.val().type,
              value: childItem.val().value,
              date: childItem.val().date
            };

            setMovements(oldArray => [...oldArray, list].reverse());
          })
        })
    }

    loadList()
  }, []);

  function handleDelete(data) {
    Alert.alert(
      'Cuidado!',
      `Você deseja excluir ${data.description}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Continuar',
          onPress: () => handleDeleteSuccess(data)
        }
      ]
    )
  }

  async function handleDeleteSuccess(data) {
    await firebase.database().ref('movements')
      .child(uid).child(data.key).remove()
      .then(async () => {
        let currentBalance = balance;
        data.type === 'despesa' ? currentBalance += parseFloat(data.value) : currentBalance -= parseFloat(data.value);
        await firebase.database().ref('users').child(uid).child('balance').set(currentBalance);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <Background>
      <Header />
      <Container>
        <Name>{user && user.name}</Name>
        <Balance>R$ {balance.toFixed(2).replace('.', ',')}</Balance>
      </Container>

      <Title>Últimas movimentações</Title>

      <List
        showsVerticalScrollIndicator={false}
        data={movements}
        keyExtractor={item => item.key}
        renderItem={({item}) => <MovementsList data={item} deleteItem={handleDelete} />}
      />
    </Background>
  );
}