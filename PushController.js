import React, { Component, Fragment } from "react";
import PushNotification from "react-native-push-notification";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity
} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
export default class PushController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pushData: []
    }
  }
  componentDidMount() {
    PushNotification.createChannel(
        {
          channelId: "channel-id", // (required)
          channelName: "My channel", // (required)
          channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
          playSound: false, // (optional) default: true
          soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
          importance: 4, // (optional) default: 4. Int value of the Android notification importance
          vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
        },
        (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
      );
      PushNotification.getChannels(function (channel_ids) {
        console.log(channel_ids,"sjisduvgu"); // ['channel_id_1']
      });
    let self = this;
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log("TOKEN:", token);
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
        if (notification.foreground) {
            PushNotification.localNotification({
                title:notification.title,
                message:notification.message,
                largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
                largeIconUrl: "https://jeebajijee.pk/public/images/web-settings/1606916402abc.png", // (optional) default: undefined
                vibrate: true, // (optional) default: true
                vibration: 300,
                bigPictureUrl: "https://jeebajijee.pk/public/images/web-settings/1606916402abc.png", // (optional) default: undefined
                bigLargeIcon: "ic_launcher", // (optional) default: undefined
                bigLargeIconUrl: "https://jeebajijee.pk/public/images/web-settings/1606916402abc.png", // (optional) default: undefined
                smallIcon: "https://jeebajijee.pk/public/images/web-settings/1606916402abc.png",
            });
         } 
        // process the notification
        self._addDataToList(notification);
        // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: "1090501687137",

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       */
      requestPermissions: true
    });
  }

  _renderItem = ({ item }) => (
    <View key={item.id}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.message}>{item.message}</Text>
    </View>
  );

  _addDataToList(data) {
    let array = this.state.pushData;
    array.push(data);
    this.setState({
      pushData: array
    });
    console.log(this.state);
  }

  render() {
      console.log('zjcsucvsdhcvsdvch',this.state.pushData)
      console.log('zjcsucvsdhcvsdvch',this.state.pushData[0]?.message);
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Header />
            <View style={styles.listHeader}>
              <Text>Push Notifications</Text>
            </View>
            <View style={styles.body}>
              {(this.state.pushData.length > 0) && <FlatList
                data={this.state.pushData}
                renderItem={(item) => this._renderItem(item)}
                keyExtractor={(item) => item.title}
                extraData = {this.state}
              />
              }
              {(this.state.pushData.length == 0) &&
                <View style={styles.noData}>
                  <Text style={styles.noDataText}>You don't have any push notification yet. Send some push to show it in the list</Text>
                </View>}
              {/* <LearnMoreLinks /> */}
            </View>
           
          </ScrollView>
          <TouchableOpacity onPress={()=>{
            PushNotification.localNotification({
                title:"new message",
                message:"hello world",
                largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
                largeIconUrl: "https://jeebajijee.pk/public/images/web-settings/1606916402abc.png", // (optional) default: undefined
                vibrate: true, // (optional) default: true
                vibration: 300,
                channelId: "channel-id"
            });
          }}>
              <Text>New Local notification</Text>
            </TouchableOpacity>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  listHeader: {
    backgroundColor: '#eee',
    color: "#222",
    height: 44,
    padding: 12
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 10
  },
  noData: {
    paddingVertical: 50,
  },
  noDataText: {
    fontSize: 14,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    paddingBottom: 15,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});