import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
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

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>

      <Button title='Schedule notification' onPress={scheduleNotification} />
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
