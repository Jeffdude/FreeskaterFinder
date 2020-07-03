import React from 'react';
import { Text, TextInput, View, Button } from 'react-native';
import { addTestList, clearTestList } from '../redux/actions.js';
import { connect } from 'react-redux';

function _TestListList({ test_list }) {
  let jsx_test_list = test_list.map(
    ({ value }, index) => {
      return <Text key={index}>{ value }, </Text>
    }
  );
  console.log("Test list:", test_list);
  return (
    <View style={{height:100, flexDirection: 'row'}}>
      { test_list.length ? jsx_test_list : <Text style={{color: "#ff0000"}}> No elements! </Text>}
    </View>
  );
}
export const TestListList = connect(
  state => ({ test_list: state.test_list.test_list }),
)(_TestListList)

class _TestListInput extends React.Component {
  constructor(props){
    super(props);
    this.state = { input: "" };

    this.updateInput = input => {
      this.setState({ input });
    };

    this.handleAddInput = () => {
      this.props.addTestList(this.state.input);
      this.setState({ input: "" });
    }
  }

  render() {
    const { clearTestList } = this.props
    return(
      <View style={{flexDirection: 'row', width: 500, height: 50}}>
        <TextInput 
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={ this.updateInput }
          value={ this.state.input }/>
        <Button
          title="Add Text"
          color="#00ff00"
          onPress={ this.handleAddInput }
        />
        <Button
          title="Clear Text"
          color="#ff0000"
          onPress={ clearTestList }
        />
      </View>
    );
  }
}

export const TestListInput = connect(
  null,
  { addTestList, clearTestList },
)(_TestListInput);

