import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';


Notifications.setNotificationHandler({

  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true
    };
  }
});

export default function App() {

  const [expoPushToken, setExpoPushToken] = useState('');

  useEffect(() => {

    async function configurePushNotifications() {
      const { status } = await Notifications.getPermissionsAsync();

      let finalStatus = status;

      if (finalStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        Alert.alert(
          'Permission required',
          'Push notifications need the appropriate permissions'
        )

        return;
      }

      const pushTokeData = await Notifications.getExpoPushTokenAsync();
      console.log(pushTokeData);

      setExpoPushToken(pushTokeData.data)


      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.DEFAULT
        });
      }
    }
    configurePushNotifications();

  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener((notification) => {
      console.log('NOTIFICATION RECEIVED');
      // console.log(notification);

      const userName = notification.request.content.data.userName
      console.log(userName)
    });

    const subscription2 = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('NOTIFICATION RESPONSE RECEIVED');
      console.log(response);
      const userName = response.request.content.data.userName
      console.log(userName)

    });

    return () => {
      subscription.remove();
      subscription2.remove();
    }

  }, []);

  function scheduleNotification() {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'My first local notification',
        body: 'Pretty good!',
        data: { userName: 'Max' }
      },
      trigger: {
        seconds: 2
      }
    })
  }


  function sendPushNotificationHandler() {

    fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: expoPushToken,
        sound: 'default',
        title: 'Send push notification',
        body: 'And here is the body!',
      }),
    });
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>

      <Button title='Schedule notification' onPress={scheduleNotification} />
      <Button title='sendPushNotificationHandler' onPress={sendPushNotificationHandler} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
