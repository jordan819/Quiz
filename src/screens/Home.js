import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, Text, StatusBar, TouchableOpacity,
          Button, FlatList} from 'react-native';

function HomeScreen({navigation}) {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchQuizes = async () => {
     try {
      const response = await fetch('https://tgryl.pl/quiz/tests');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchQuizes();
  }, []);

  const Item = ({ id, name, description }) => (
    <TouchableOpacity style={styles.element} onPress={() => navigation.navigate('Test', { testName: name, testId: id, })}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.text}>
         {description}
       </Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
      <Item id={item.id} name={item.name} description={item.description}/>
    );

  return (
    <SafeAreaView style={styles.container}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />

      <View style={styles.footer}>
        <Text style={{fontSize:20, color:'black', fontFamily: 'Mukta-Bold'}}>
        You can check your results here
        </Text>
        <Button
          title="Check"
          onPress={() => navigation.navigate('Results')}
        />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b2dfdb',
  },
  scrollView: {
    marginHorizontal: 20,
  },
  element: {
    backgroundColor: '#4db6ac',
    alignItems: 'center',
    padding: 30,
    margin: 20,
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    textAlign: 'justify',
    color: 'black',
    fontFamily: 'Mukta-Regular'
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
    color: 'black',
    fontFamily: 'Lobster-Regular',
  },
  footer: {
    backgroundColor: '#b2dfdb',
    height: 90,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default HomeScreen;
