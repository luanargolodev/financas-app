import React, { useContext, useState, useEffect } from 'react';
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
              value: childItem.val().value
            };

            setMovements(oldArray => [...oldArray, list].reverse());
          })
        })
    }

    loadList()
  }, []);


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
        renderItem={({item}) => <MovementsList data={item} />}
      />
    </Background>
  );
}