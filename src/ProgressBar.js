import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

export default function ProgressBar({title, pourcentage}) {

  return (
    <View style={{height: 40, margin: 5}}>
      <Text>{title}</Text>
      <View style={styles.bar}>
        <View style={{width: `${pourcentage}%`, backgroundColor: '#00babc'}}/>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  bar: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    height: 20,
    width: '90%'
  },
});