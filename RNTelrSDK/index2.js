
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ActivityIndicator,
  Modal,
  Pressable,
  View
} from 'react-native';
import WebView from 'react-native-webview';
import XMLParser from 'react-xml-parser';
const TelrSdk = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [startUrl, setStartUrl] = useState(null);
  const [code, setCode] = useState(null);
  const [isStatusApiCall, setIsStatusApiCall] = useState(true);

  useEffect(() => {
    if (props.telrModalVisible) {
      setStartUrl(null)
      setIsStatusApiCall(true)
      setCode(null)
      setIsLoading(true)
      makePaymentApiCall();
    }
  }, [props.telrModalVisible]);

  const makePaymentApiCall = () => {
    var request = props.paymentRequest
    var xmlRequest = `<?xml version="1.0" encoding="UTF-8"?>
    <mobile>
        <store>${request.store_id}</store>
        <key>${request.key}</key>
        <framed>2</framed>
        <device>
            <type>${request.device_type}</type>
            <id>${request.device_id}</id>
        </device>
        <app>
            <name>${request.app_name}</name>
            <version>${request.app_version}</version>
            <user>${request.app_user}</user>
            <id>${request.app_id}</id>
        </app>
        <tran>
            <test>${request.tran_test}</test>
            <type>${request.tran_type}</type>
            <class>${request.tran_class}</class>
            <cartid>${request.tran_cartid}</cartid>
            <description>${request.tran_description}</description>
            <currency>${request.tran_currency}</currency>
            <amount>${request.tran_amount}</amount>
            <language>${request.tran_language}</language>
            <firstref>${request.tran_firstref}</firstref>   
        </tran>
        <billing>
            <name>
                <title>${request.billing_name_title}</title>
                <first>${request.billing_name_first}</first>
                <last>${request.billing_name_last}</last>
            </name>
            <address>
                <line1>${request.billing_address_line1}</line1>
                <city>${request.billing_address_city}</city>
                <region>${request.billing_address_region}</region>
                <country>${request.billing_address_country}</country>
            </address>
                <custref>${request.billing_custref}</custref>
                <email>${request.billing_email}</email>
                <phone>${request.billing_phone}</phone>
        </billing>
    </mobile>`
    fetch('https://secure.telr.com/gateway/mobile.xml', {
      method: 'POST',
      body: xmlRequest
    }).then((response) => response.text())
      .then((textResponse) => {
        console.log(textResponse)
        var xml = new XMLParser().parseFromString(textResponse);
        const start = xml.getElementsByTagName("start");
        var startUrlTemp = start[0]?.value;
        if (startUrlTemp != null) {
          const code = xml.getElementsByTagName("code");
          var codeTemp = code[0]?.value;
          setCode(codeTemp)
          setStartUrl(startUrlTemp)
        } else {
          const message = xml.getElementsByTagName("message");
          var messageTemp = message[0]?.value;
          props.didFailWithError(messageTemp)
        }

      })
      .catch((error) => {
        console.log(error);
      });
  };

  const transStatusApiCall = () => {
    var request = props.paymentRequest
    setIsLoading(true)
    var xmlRequest = `<?xml version=\"1.0\"?>
    <mobile>
        <store>${request.store_id}</store>
        <key>${request.key}</key>
        <complete>${code}</complete>
    </mobile>`

    fetch('https://secure.telr.com/gateway/mobile_complete.xml', {
      method: 'POST',
      body: xmlRequest
    }).then((response) => response.text())
      .then((textResponse) => {
        console.log(textResponse)
        var xml = new XMLParser().parseFromString(textResponse);
        const message = xml.getElementsByTagName("message");
        var messageTemp = message[0]?.value;
        if (messageTemp != null) {
          props.didFailWithError(messageTemp)
        }
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Modal
      animationType="slide"
      visible={props.telrModalVisible}
      onRequestClose={() => {
        props.telrModalClose();
      }}>
      <View style={styles.centeredView}>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => props.telrModalClose()}>
          <Text style={styles.textStyle}>Back</Text>
        </Pressable>
        <View style={styles.modalView}>
          {
            startUrl != null ? <WebView
              onLoad={() => { setIsLoading(true) }}
              onLoadEnd={() => { setIsLoading(false) }}
              onNavigationStateChange={navState => {
                console.log(navState.url)
                if (navState.url.includes("https://secure.telr.com/gateway/details.html")) {
                  if (isStatusApiCall) {
                    setIsStatusApiCall(false)
                    transStatusApiCall()
                  }
                } else if (navState.url.includes("https://secure.telr.com/gateway/webview_close.html")) {
                  props.didFailWithError("Something went wrong")
                }
              }}
              source={{
                uri: startUrl
              }} /> : null
          }
          <ActivityIndicator style={{ position: 'absolute', alignSelf: 'center' }} animating={isLoading}></ActivityIndicator>
        </View>
      </View>
    </Modal>
  );

};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  modalView: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  button: {
    borderRadius: 20,
    padding: 5,
    margin: 5,
    elevation: 2,
    width: 100,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  }
});

export default TelrSdk;
