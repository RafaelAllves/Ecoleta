import React, {useState, useEffect} from 'react';
import { View, Image, StyleSheet, Text, ImageBackground, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather as Icon, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';


interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}


const Home = () => {
  const [uf, setUf] = useState('');
  const [city, setCity] = useState('');
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  
  const navigation = useNavigation();

  function handlerNavigateToPoints() {
    navigation.navigate('Points', {
      uf,
      city,
    });
  }

  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
      const ufInitials = response.data.map(uf => uf.sigla);
      setUfs(ufInitials);
    });
  }, []);

  useEffect(() => {
    if (uf === '0') {
      return;
    }
    axios
      .get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
      .then(response => {
        const cityNames = response.data.map(city => city.nome);
        setCities(cityNames);
      });

  }, [uf]);


  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS ==='ios'? "padding" : undefined}>
      <ImageBackground 
        source={require('../../assets/home-background.png')} 
        style={styles.container}
        imageStyle={{ width: 274, height: 368}}
      >
        <View style={styles.main}> 
          <Image source={require('../../assets/logo.png')}/>
          <View>
            <Text style={styles.title}>Seu Marketplace de coleta de resíduos</Text>
            <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <RNPickerSelect
            placeholder={{
              label: 'Selecione um estado',
            }}
            useNativeAndroidPickerStyle={false}
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 20,
                right: 10,
              },
            }}
            onValueChange={(value) => setUf(value)}
            items={ufs.map(uf => (
              {label: uf, value: uf}
            ))}
            Icon={() => {
              return (
                <AntDesign name="down" color="#B2B2B2" size={24} />
              );
            }}
          />
          <RNPickerSelect
            placeholder={{
              label: 'Selecione uma cidade',
            }}
            useNativeAndroidPickerStyle={false}
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 20,
                right: 10,
              },
            }}
            onValueChange={(value) => setCity(value)}
            items={cities.map(city => (
              {label: city, value: city}
            ))}
            Icon={() => {
              return (
                <AntDesign name="down" color="#B2B2B2" size={24} />
              );
            }}
          />
          <RectButton style={styles.button} onPress={handlerNavigateToPoints}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name="arrow-right" color="#FFF" size={24} />
              </Text>
            </View>
            <Text style={styles.buttonText}>
              Entrar
            </Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontWeight: 'bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',

    fontSize: 16,
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 14,
    fontSize: 16,
    color: '#B2B2B2'

  },
  inputAndroid: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 14,
    fontSize: 16,
    color: '#B2B2B2'
  },
  
});

export default Home;