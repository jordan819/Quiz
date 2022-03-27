import React, { Component } from 'react';
import { StyleSheet, Button, ScrollView, Text, ActivityIndicator} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

class ResultsScreen extends Component {

  state = {
    isLoading: true,
    HeadTable: ['Nick', 'Score', 'Test', 'Date'],
    DataTable: [
      ['Adam', '4/10', 'fizyka', '1-11-2021'],
      ['Jan', '9/15', 'coś dłuższego', '19-10-2021 11:23:32'],
      ['Anna', '6/10', '1', '22-10-2021'],
      ['Julia', '1/10', '1', '30-11-2021'],
    ]
  }

  async fetchResults() {
    try {
      const response = await fetch('https://tgryl.pl/quiz/results');
      const json = await response.json();

      let rows = []
      for (index in json) {
        let nick = json[index].nick;
        let score = json[index].score + '/' + json[index].total;
        let test = json[index].type;
        let date = json[index].createdOn;

        let row = [nick, score, test, date];
        rows.push(row);
      }

    this.setState({DataTable: rows})

    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidMount() {
    this.fetchResults();
  }

  render() {
    const state = this.state;
    return (
      <ScrollView style={styles.container}>
      {state.isLoading ? <ActivityIndicator/> : (
        <Table borderStyle={{borderWidth: 1, borderColor: '#111'}}>
          <Row flexArr={[1.5, 1.2, 1.5, 2]} data={state.HeadTable}
              style={styles.HeadStyle} textStyle={styles.TableText}/>
          <Rows style={styles.bodyStyle} flexArr={[1.5, 1.2, 1.5, 2]} data={state.DataTable} textStyle={styles.TableText} />
        </Table>
      )}
      </ScrollView>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    paddingTop: 35,
    backgroundColor: '#b2dfdb'
  },
  HeadStyle: {
    height: 70,
    alignContent: 'center',
    backgroundColor: '#4db6ac'
  },
  bodyStyle: {
    height: 100
  },
  TableText: {
    textAlign: 'center',
    color: '#111',
    margin: 10,
    fontSize: 14,

  }
});

export default ResultsScreen;
