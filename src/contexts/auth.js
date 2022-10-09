import React, { createContext, useState, useEffect } from 'react';
import firebase from '../services/firebaseConnection';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

function AuthProvider({ children}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorage() {
      const storageUser = await AsyncStorage.getItem('Auth_user');

      if(storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }

      setLoading(false);
    }

    loadStorage();
  }, []);

  async function signUp(name, email, password) {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(async (value) => {
        let uid = value.user.uid;
        await firebase.database().ref('users').child(uid).set({
          name: name,
          balance: 0
        })
          .then(() => {
            let data = {
              uid: uid,
              name: name,
              email: value.user.email,
            };
            setUser(data);
            storageUser(data);
          })
          .catch((error) => {
            alert(error.code);
          })
      })
  }

  async function signIn(email, password) {
    await firebase.auth().signInWithEmailAndPassword(email, password)
      .then(async (value) => {
        let uid = value.user.uid;
        await firebase.database().ref('users').child(uid).once('value')
          .then((snapshot) => {
            let data = {
              uid: uid,
              name: snapshot.val().name,
              email: value.user.email,
            };
            setUser(data);
            storageUser(data);
          })
      })
      .catch((error) => {
        alert(error.code);
      })
  }

  async function storageUser(data) {
    await AsyncStorage.setItem('Auth_user', JSON.stringify(data));
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signUp, signIn, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;