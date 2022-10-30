
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Pressable,
  Text,
  Alert
} from 'react-native';

import TelrSdk from './index2';

const App = () => {

  const [telrModalVisible, setTelrModalVisible] = useState(false);

  const [paymentRequest, setPaymentRequest] = useState(null);
  

  const telrModalClose = () => {
    setTelrModalVisible(false)
    Alert.alert("Transaction aborted by user");
  }
  const didFailWithError = (message) => {
    setTelrModalVisible(false)
    Alert.alert(message);
  }


  const showTelrPaymentPage = () => {
    var paymentRequest = {
      store_id: "15996",
      key: "pQ6nP-7rHt@5WRFv",
      device_type: "iOS",//Android
      device_id: "36C0EC49-AA2F-47DC-A4D7-D9927A739F5F",
      app_name: "TelrSDK",//enter app name
      app_version: "1.0",//app version
      app_user: "123456",//app user
      app_id: "102863o777",//app user id
      tran_test: "1", // 1=test, 0=production
      tran_type: "sale",//sale
      tran_class: "paypage",
      tran_cartid: `${Math.floor(Math.random() * 100) + 1}`,//enter cart id it shoud be unique for every transaction //1234567890
      tran_description: "Test Mobile API",// enter tran description
      tran_currency: "AED",
      tran_amount: "1.00",
      tran_language: "en",
      tran_firstref: "",
      billing_name_title: "Mr",
      billing_name_first: "John",
      billing_name_last: "Parker",
      billing_address_line1: "sclk lk fk",
      billing_address_city: "Riyad",
      billing_address_region: "Saudi Arabia",
      billing_address_country: "SA",
      billing_custref: "001",
      billing_email: "stackfortytwo@gmail.com",
      billing_phone: "1234567890",
    }
    setPaymentRequest(paymentRequest)
    setTelrModalVisible(true)
  }

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <TelrSdk paymentRequest={paymentRequest} telrModalVisible={telrModalVisible} telrModalClose={telrModalClose} didFailWithError={didFailWithError}/>
      <View style={styles.centeredView}>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => showTelrPaymentPage()}>
          <Text style={styles.textStyle}>Make Payment</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: 'white',
    flex: 1
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
});

export default App;
