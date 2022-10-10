import React, { useContext, useState } from 'react';
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

export default function Home() {
  const [movements, setMovements] = useState([
    {key: '1', type: 'receita', value: 1200},
    {key: '2', type: 'despesa', value: 200},
    {key: '3', type: 'receita', value: 40},
    {key: '4', type: 'despesa', value: 89.62},
    {key: '5', type: 'despesa', value: 89.62},
    {key: '6', type: 'despesa', value: 89.62},
    {key: '7', type: 'despesa', value: 89.62},
    {key: '8', type: 'despesa', value: 89.62},
    {key: '9', type: 'despesa', value: 89.62},
  ]);
  const { user } = useContext(AuthContext);

 return (
    <Background>
      <Header />
      <Container>
        <Name>{user && user.name}</Name>
        <Balance>R$ 123,00</Balance>
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