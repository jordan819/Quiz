import React, { Component, useLayoutEffect, useState, useEffect } from 'react';
import { StyleSheet, Button, View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';

function TestScreen ({route, navigation}) {

  const {testName, testId} = route.params;
  const header = testName;
  navigation.setOptions({title: header});

  const [questionNumber, setQuestionNumber] = useState(1);
  const [score, setScore] = useState(0);

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchQuiz = async () => {
     try {
      const response = await fetch(`https://tgryl.pl/quiz/test/${testId}`);
      const json = await response.json();
      setData(json);

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      //console.log(data.tasks[0].question);
    }
  }

  useEffect(() => {
    fetchQuiz();
  }, []);
/*
  const tasks = [{
    "question": "Który wódz po śmierci Gajusza Mariusza, prowadził wojnę domową z Sullą?",
    "answers":[
      {
        "content": "Lucjusz Cynna",
        "isCorrect": true
      },
      {
        "content": "Juliusz Cezar",
        "isCorrect": false
      },
      {
        "content": "Lucjusz Murena",
        "isCorrect": false
      },
      {
        "content": "Marek Krassus",
        "isCorrect": false
      }
    ]
  },
  {
    "question": "Ile to jest 2+2?",
    "answers":[
      {
        "content": "1",
        "isCorrect": false
      },
      {
        "content": "2",
        "isCorrect": false
      },
      {
        "content": "3",
        "isCorrect": false
      },
      {
        "content": "4",
        "isCorrect": true
      }
    ]
  },
  {
    "question": "Kto był pierwszym człowiekiem w kosmosie?",
    "answers":[
      {
        "content": "Neil Armstrong",
        "isCorrect": false
      },
      {
        "content": "Jurij Gagarin",
        "isCorrect": true
      },
      {
        "content": "Alan Shepard",
        "isCorrect": false
      },
      {
        "content": "Walentina Tierieszkowa",
        "isCorrect": false
      }
    ]
  },
  {
    "question": "W którym roku powstała biblioteka React?",
    "answers":[
      {
        "content": "2009",
        "isCorrect": false
      },
      {
        "content": "2010",
        "isCorrect": false
      },
      {
        "content": "2013",
        "isCorrect": true
      },
      {
        "content": "2015",
        "isCorrect": false
      }
    ]
  },
]
*/
  onClick = (number) => {
    if (data.tasks[questionNumber-1].answers[number].isCorrect) {
      setScore(score+1);
    }
    //console.log(number);
    setQuestionNumber (questionNumber + 1);
  }

if (isLoading) {
  return (
    <ActivityIndicator/>
  );
} else if (questionNumber >= data.tasks.length+1) {
  fetch('https://tgryl.pl/quiz/result', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "nick": "Juliusz",
      "score": score,
      "total": data.tasks.length,
      "type": "typ"
    })
  });
  return (
    <View style={styles.container}>
      <Text style={styles.questionTitleText}>Koniec testu</Text>
      <Text style={styles.questionTitleText}>Twój wynik to {score}/{data.tasks.length}</Text>
    </View>
  )

}

return (
  <View style={styles.container}>

    <View style={styles.questionsProgress}>
      <Text style={{color: '#111', fontSize:18, marginBottom:10}}>Question {questionNumber} of {data.tasks.length}</Text>
    </View>

    <View style={styles.question}>
       <Text style={styles.questionTitleText}>{data.tasks[questionNumber-1].question}</Text>
    </View>

    <View style={styles.answers}>
      <TouchableOpacity style={styles.answer} onPress={() => onClick(0)}>
        <Text style={styles.answerText}>{data.tasks[questionNumber-1].answers[0].content}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.answer} onPress={() => onClick(1)}>
        <Text style={styles.answerText}>{data.tasks[questionNumber-1].answers[1].content}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.answer} onPress={() => onClick(2)}>
        <Text style={styles.answerText}>{data.tasks[questionNumber-1].answers[2].content}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.answer} onPress={() => onClick(3)}>
        <Text style={styles.answerText}>{data.tasks[questionNumber-1].answers[3].content}</Text>
      </TouchableOpacity>
    </View>
  </View>
);


/*
    return (
      <View style={styles.container}>

        <View style={styles.questionsProgress}>
          <Text style={{color: '#111', fontSize:18, marginBottom:10}}>Question {questionNumber} of 4</Text>
        </View>

        <View style={styles.question}>
           <Text style={styles.questionTitleText}>{tasks[questionNumber-1].question}</Text>
        </View>

        <View style={styles.answers}>
          <TouchableOpacity style={styles.answer} onPress={() => onClick(0)}>
            <Text style={styles.answerText}>{tasks[questionNumber-1].answers[0].content}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.answer} onPress={() => onClick(1)}>
            <Text style={styles.answerText}>{tasks[questionNumber-1].answers[1].content}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.answer} onPress={() => onClick(2)}>
            <Text style={styles.answerText}>{tasks[questionNumber-1].answers[2].content}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.answer} onPress={() => onClick(3)}>
            <Text style={styles.answerText}>{tasks[questionNumber-1].answers[3].content}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
    */
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#b2dfdb',
  },
  questionsProgress: {

  },
  questionTitleText: {
    color: '#111',
    fontSize: 24,
    textAlign: 'center'
  },
  questionText: {
    color: '#111',
    alignSelf: 'center',
    marginTop: 60,
    margin: 20,
    textAlign: 'center'
  },
  testNumber: {
    alignItems: 'center',
    flex: 0.1,
    backgroundColor: 'blue'
  },
  answers: {
    flex: 0.33,
  },
  question: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.5,
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 5,
  },
  answer: {
    flex: 0.25,
    backgroundColor: '#4db6ac',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  answerText: {
    color: '#fff',
  },
  baseText:{
    flex: 1,
    color: 'black',
    fontSize: 48
  }
})

export default TestScreen;
