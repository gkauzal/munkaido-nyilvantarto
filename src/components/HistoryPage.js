import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';

import { getHistory, deleteHistoryById } from '../database';

export default function HistoryPage(props) {
  const [history, setHistory] = useState([]);

  const TwoButtonAlert = () =>
    Alert.alert('Törlés megerősítése', 'Biztos törlöd a bejegyzést?', [
      {
        text: 'Mégse',
        onPress: () => console.log('Törlés visszavonva'),
        style: 'cancel',
      },
      {
        text: 'Törlés',
        onPress: () => {
          deleteHistoryById(props.userData.email, props.userData.id);
        },
      },
    ]);

  const renderItem = ({ item, index }) => (
    <View
      style={[
        styles.historyItemContainer,
        styles.shadow,
        item.state === 'in' ? styles.containerIn : styles.containerOut,
      ]}>
      <View style={styles.historyTextContainer}>
        <Text style={styles.currentStateText}>{item.date.toDate().toLocaleString('hu-HU')}</Text>
        <Text
          style={[
            styles.currentStateText,
            item.state === 'in' ? styles.currentStateTextIn : styles.currentStateTextOut,
          ]}>
          {item.state === 'in' ? 'bejött' : 'távozott'}
        </Text>
      </View>
      {index === 0 ? (
        <View style={styles.buttonContainer}>
          <TouchableOpacity>
            <Text style={styles.deleteButton} onPress={TwoButtonAlert}>
              Törlés
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        ''
      )}
    </View>
  );

  useEffect(() => {
    // async IIFE
    (async () => {
      const historyFromFirebase = await getHistory(props.userData.email);
      setHistory(historyFromFirebase);
    })();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList data={history} renderItem={renderItem} keyExtractor={item => item.id} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'stretch',
    // https://stackoverflow.com/a/59183680/9004180
    // fixing the scrolling of the FlatList
    // flex: 1 just means "take up the entire space" (whatever "entire" that may be).
    flex: 1,
  },
  historyItemContainer: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    margin: 10,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyTextContainer: {},
  currentStateText: {
    fontSize: 17,
    color: 'white',
  },
  containerIn: {
    backgroundColor: '#165BAA',
  },
  containerOut: {
    backgroundColor: '#173F5F',
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  deleteButton: {
    color: 'red',
    fontSize: 17,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  buttonContainer: {
    paddingLeft: 40,
  },
});
