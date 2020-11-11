import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  StatusBar,
  StyleSheet,
  View,
  Button,
  YellowBox,
} from 'react-native';
import {decode, encode} from 'base-64';
import Auth from './src/components/Auth';
import firebase from './src/utils/firebase';
import 'firebase/auth';
import ListBirthday from './src/components/ListBirthday';

if (!global.btoa) global.btoa = encode;
if (!global.atob) global.atob = decode;

YellowBox.ignoreWarnings(['Setting a timer']);

export default function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((response) => {
      setUser(response);
    });
  }, []);

  if (user === undefined) return null;

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.background}>
        {user ? <ListBirthday user={user} /> : <Auth />}
      </SafeAreaView>
    </>
  );
}
function Logout() {
  const logout = () => {
    firebase.auth().signOut();
  };
  return (
    <View>
      <Text>Estas logueado</Text>
      <Button title="Cerrar sesión" onPress={logout} />
    </View>
  );
}
const styles = StyleSheet.create({
  background: {
    backgroundColor: '#15212b',
    height: '100%',
  },
});
