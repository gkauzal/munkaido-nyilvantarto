import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { signOutUser } from '../auth';

const SettingsPage = ({ navigation: { navigate }, userData, setUserData }) => {
  const handleLogout = async () => {
    await signOutUser();
    setUserData(null);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogout} style={[styles.button, styles.shadow]}>
        <Text style={styles.buttonText}>Kijelentkezés</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    // https://stackoverflow.com/a/59183680/9004180
    // fixing the scrolling of the FlatList
    // flex: 1 just means "take up the entire space" (whatever "entire" that may be).
    flex: 1,
  },
  appTitle: {
    textAlign: 'center',
    fontSize: 30,
    marginVertical: 30,
  },
  logoutSection: {
    alignSelf: 'stretch',
  },
  logoutButton: {
    alignSelf: 'stretch',
  },
  logoutButtonText: {
    marginRight: 'auto',
    fontStyle: 'italic',
    color: 'blue',
  },
  statusText: {
    fontSize: 18,
    margin: 15,
  },
  button: {
    margin: 50,
    alignSelf: 'stretch',
    textAlign: 'center',
    paddingVertical: '5%',
    paddingHorizontal: '7%',
    borderRadius: 20,
    color: 'blue',
    backgroundColor: '#0091ff',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: 'white',
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  image: { width: 400, height: 400, resizeMode: 'contain' },
});

export default SettingsPage;
