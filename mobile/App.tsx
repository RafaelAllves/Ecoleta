import React from 'react';
import AppLoading from 'expo';
import Routes from './src/routes'
import { StatusBar } from 'react-native';


export default function App() {

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent/>
      <Routes/>
    </>
  );
}