
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

const TelrSdk = () => {


  const getMoviesFromApi = () => {


    var requst = `<?xml version="1.0" encoding="UTF-8"?>
    <mobile>
          <store>15996</store>
        <key>pQ6nP-7rHt@5WRFv</key>
        <framed>2</framed>
        <device>
            <type>Android</type>
            <id>36C0EC49-AA2F-47DC-A4D7-D9927A739F5F</id>
        </device>
        <app>
            <name>TelrSDK</name>
            <version>0.0.1</version>
            <user>123456</user>
            <id>102863o777</id>
        </app>
        <tran>
            <test>0</test>
            <type>sale</type>
            <class>paypage</class>
            <cartid>999067654319</cartid>
            <description>Test Mobile API</description>
            <currency>AED</currency>
            <amount>1.00</amount>
            <language>en</language>
                  <firstref></firstref>   
        </tran>
        <billing>
            <name>
                <title>Mr</title>
                <first>test</first>
                <last>test</last>
            </name>
            <address>
                <line1>sclk lk fk</line1>
                <city>Riyad</city>
                <region>Saudi Arabia</region>
                <country>SA</country>
                         </address>
                <custref>001</custref>
            <email>stackfortytwo@gmail.com</email>
                <phone>1234567890</phone>
        </billing>
    </mobile>`

    console.log(requst)
    fetch('https://secure.telr.com/gateway/mobile.xml', {
      method: 'POST',
      body: requst
    }).then((response) => response)
      .then((json) => {
        console.log(json)
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <TouchableOpacity onPress={() => {
        getMoviesFromApi()
      }}>
      <Text>click</Text>
      </TouchableOpacity>
     
    </SafeAreaView>
  );

};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: 'white'
  }
});

export default TelrSdk;
