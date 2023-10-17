import { StyleSheet, Text, View , FlatList , TextInput} from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native';
import axios from 'axios';

const ChatGPT = () => {

    const [data,setData] = useState([]);
    const apiKey = "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";
    const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-002/completions' ;
    const [textInput,setTextInput] = useState('');

    const handleSend = async () => {
        const prompt = textInput
        const response = await axios.post(apiUrl,{
            prompt: prompt,
            max_tokens: 1024,
            temperature: 0.5,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        });

        const text = response.data.choices[0].text;
        setData([...data, {type: 'user', 'text': textInput} , {type: 'bot' , 'text': text}]);
        setTextInput('');
    }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI ChatBot</Text>
      <FlatList
      data={data}
      keyExtractor={(item,index) => index.toString()}
      style={styles.body}
      renderItem={({item}) => (
        <View style={{flexDirection: 'row',padding: 10}}>
            <Text style={{fontWeight: 'bold',marginLeft: 10,fontSize: 16,color: item.type === 'user' ? 'red' : 'green'}}>{item.type === 'user' ? 'You :' : 'Bot :'}</Text>
            <Text style={styles.bot}>{item.text}</Text>
        </View>
      )}
      />

      <TextInput 
      style={styles.input}
      value={textInput}
      onChangeText={text => setTextInput(text)}
      placeholder='Ask me Anything'
      />

      <TouchableOpacity
      style={styles.button}
      onPress={handleSend}
      >
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ChatGPT

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },

    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 50,
        width: '100%',
        textAlign: 'center',
        padding: 15,
        alignItems: 'center',
        elevation: 5,
        letterSpacing: 1,
        marginBottom: 10,
        color: 'blue'
    },

    body: {
        width: '102%',
        margin: 10,
    },

    bot: {
        fontSize: 16,
        width: '90%',
        paddingLeft: 10,
    },

    input: {
        borderWidth: 1,
        borderColor: 'black',
        width: '90%',
        height: 50,
        marginBottom: 10,
        borderRadius: 10,
        padding: 10,
    },

    button: {
        backgroundColor: 'skyblue',
        width: '30%',
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10
    },

    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'blue',
    }
  });