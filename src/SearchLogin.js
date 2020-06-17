import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { StyleSheet, TextInput, Text, View, Button, ActivityIndicator} from 'react-native';

const UID = "2e7af34491714b9d8cfcb7877b3b9be2dfd77a8b921a00a9a2a6a109db8fd787";
const SECRET = "309f03bdf2139076fe0b9c6375bc75d7cab5c1a37e29634a81f4d58a9928c9b5";
const URL = "https://api.intra.42.fr/v2/users/";

export default function Research({navigation}) {
  const [login, setLogin] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const headers = {'Authorization': `Bearer ${token}`};

  useEffect(() => {
      axios.post("https://api.intra.42.fr/oauth/token", { grant_type: 'client_credentials', client_id: UID, client_secret: SECRET})
      .then(res => {
        setToken(res.data.access_token);
      })
    }, []);

  const handleLogin = (method, url) => {
    setIsLoading(true);
    if (login) {
      axios({url, method, headers})
        .then(res => {
          navigation.navigate("Details", { userData: res.data, cursusId: true});
        })
        .catch(err => {
          setError("Enter a valid login plz");
        })
        .then(() => setIsLoading(false));
      }
  }

  return (
  <View style={styles.screen}>
    <TextInput style={styles.input}
      onEndEditing={() => setError('')}
      autoCapitalize="none"
      placeholder='Rechercher un login'
      onChangeText={value => setLogin(value)}/>
    <Text style={{color: 'red', margin: 5}}>{error}</Text>
    <Button onPress={() => handleLogin('get', URL + login)} title='rechercher'></Button>
    {isLoading &&
    <View style={styles.loading}>
      <ActivityIndicator size='large' color="#26c98c"/>
    </View>}
  </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    color: '#4B7E5F',
    fontSize: 30,
    marginLeft: 20
  },
  input:{
    backgroundColor: 'rgba(195,195,195,0.2)',
    padding: 10,
  },
  loading: {
    position: 'absolute',
    backgroundColor: '#AAA8',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
