import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';

type HomeProps = {
  navigation: any;
}

export default function Home({ navigation }: HomeProps) {
  return (
    <View style={styles.container}>
      <Text 
        children="Lista de tarefas" 
        style={styles.title}
      />
      <Button 
        icon='checkbox-marked-circle-outline' 
        children="Acessar" 
        mode='contained'
        onPress={() => navigation.navigate('Tasks')}
      />
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
  title: {
    fontSize: 30,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  }
});
