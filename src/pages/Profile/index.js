import React, { useContext } from 'react';
import {
  Container,
  Name,
  NewLink,
  NewText,
  Logout,
  LogoutText
} from './styles';
import { AuthContext } from '../../contexts/auth';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';

export default function Profile() {
  const { user, signOut } = useContext(AuthContext);
  const navigation = useNavigation();

 return (
    <Container>
      <Header />
      <Name>
        {user && user.name}
      </Name>
      <NewLink onPress={() => navigation.navigate('Registrar')}>
        <NewText>Registrar gastos</NewText>
      </NewLink>

      <Logout onPress={() => signOut()}>
        <LogoutText>Sair</LogoutText>
      </Logout>
    </Container>
  );
}