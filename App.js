import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Notifications from 'expo-notifications';

export default function App() {

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
