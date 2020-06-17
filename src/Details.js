import React from 'react';
import { StyleSheet, Image, Text, View, ScrollView} from 'react-native';
import { Card } from 'react-native-elements';
import ProgressBar from './ProgressBar';

export default function Details({route}) {
  const data = route.params.userData;
  const cursusId = route.params.cursusId ? 21 : 1;
  const cursus = data.cursus_users.filter((cursus => cursus.cursus_id === cursusId));
  const skills = cursus[0] && cursus[0].skills;
  const projects = data.projects_users.filter((projects => projects.cursus_ids[0] === cursusId));
  return(
    <ScrollView>
      <View>
      <Card containerStyle={{marginVertical: 10}} wrapperStyle={styles.header}>
        <Image source={{uri: data.image_url}} style={{width: 120, height: 120, borderRadius: 100}}/>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Text style={styles.fullName} >{data.displayname}</Text>
              <Text >Grade : {data.cursus_users && data.cursus_users[0].grade}</Text>
              <Text >Correction points : {data.correction_point}</Text>
              <Text >Wallet : {data.wallet}</Text>
              <Text >Level : {cursus[0] && cursus[0].level}</Text>
            </View>
          </Card>
        </View>
        <Card>
        {
          skills && skills.map((skill, index) => {
            return (
            <ProgressBar key={index} 
              title={skill.name + " - " + skill.level}
              pourcentage={(skill.level / 21) * 100 }
              />
          )})
        }
        </Card>
        <Card containerStyle={{marginBottom: 10}}>
          {
            projects && projects.map((project, index) => {
              return (
                <View key={index} style={{flexDirection: 'row'}}>
                  <Text>{project.project.name}</Text>
                  <View style={{flex: 1, alignItems: 'flex-end'}}>
                    {
                      project.final_mark > 50 ? 
                      <Text style={{color: 'green'}}>{project.final_mark + " %"}</Text> :
                      <Text style={{color: 'red'}}>{project.final_mark + " %"}</Text>
                    }
                  </View>
                </View>
              )
            })
          }
        </Card>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  list: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    margin: 10
  },
  fullName: {
    fontWeight: 'bold',
    fontSize: 20,
    margin: 5
  }
});