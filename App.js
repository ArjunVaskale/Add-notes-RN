import React, { useState, version } from 'react';
import {
  View,
  Text, TextInput, StyleSheet, ActivityIndicator,
  KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard,
  Button,
  Modal,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Dimensions, PixelRatio } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
let screenWidth = Dimensions.get('window').width;

// Retrieve initial screen's height
let screenHeight = Dimensions.get('window').height;




var firebase = require("firebase");
var config = {
  apiKey: "IzaSyAwClDpTnpHdVie-J1e6UHjXWrsCknE4nw",
  authDomain: "fireapp-25930.firebaseapp.com",
  databaseURL: "https://fireapp-25930.firebaseio.com",
  projectId: "fireapp-25930",
  storageBucket: "fireapp-25930.appspot.com",
  messagingSenderId: "1047324398097",
  appId: "1:1047324398097:web:52e5531cb5732cf84c57b0",
  measurementId: "G-44SF1G5KN1"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

//=============================================================================================

const App = ({ navigation }) => {



  return (

    <View style={styles.container} >
      <View style={{ flex: 1, alignItems: 'center', marginTop: hp('8%') }}>
        <Text style={{ fontSize: wp('10%') }}>WELCOME</Text>
        <Text style={{ fontSize: hp('2%') }}>TO </Text>
        <Text style={{ fontSize: hp('5%'), fontWeight: 'bold' }}>Add Note App </Text>
      </View>

      <View style={{ flex: 1 }}>
        <View style={{ paddingBottom: 40 }}>
          <Button title="Log in" onPress={() => navigation.navigate('Login')} />
        </View>
        <View>
          <Button title="Sign up"
            onPress={() => navigation.navigate('Signup')} />
        </View>
      </View>
    </View>
  )
}


//====================================================================================================


const Login = ({ navigation }) => {


  const [email, setEmail] = useState(0);
  const [pass, setPass] = useState(0);
  const [actvity , setActivity] = useState (false) ;
  const [enableButton , setEnableButton ] = useState (true) ;
  const [blank1 ,setBlank1] = useState('');
  const [blank2 ,setBlank2] = useState('');


  const twoFunction1 = (e) =>{
    setEmail(e);

    setBlank1(e)
    setEnableButton(true)
    check();

  }

  const twoFunction2 = (p) =>{
    setPass(p);
    setBlank2(p)
    setEnableButton(true)
    check();

  }
 const check = () =>{
  if(email.length > 5 && pass.length > 3){
      setEnableButton(false)
        // alert(pass)
   }else setEnableButton(true)
 }

  firebase.auth().onAuthStateChanged(function (user) {

    if (user) {
      setActivity(false)
      setBlank1('');
      setBlank2('');
      setEmail('');
      setPass('');
      console.warn('lagged in')
      navigation.navigate('Welcome')

    } else {

      console.warn('logged out')
      navigation.navigate('Login')


    }
  });

   function callMe() {
    setActivity(true)
    setEnableButton(true)
    // var n = email.endsWith("gmail.com");
    // alert(n);
    // console.warn(email);

    firebase.auth().signInWithEmailAndPassword(email, pass).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
        setActivity(false)

      } else {

        alert(errorMessage);
        setActivity(false)
      }

    });

     setBlank1('');
      setBlank2('');
      setEmail('');
      setPass('');

    navigation.navigate('Login')

  }
  return (


    <ScrollView style={{ flex:1 , backgroundColor:'yellow' }}>
    <KeyboardAvoidingView
      behavior={"padding"} >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ alignItems:'center'}}>
      <View style={{padding:hp('3%')}}>


        <Text style={{ fontSize:hp('6%'), fontWeight: 'bold', textDecorationLine: 'underline' }}>LOGIN HERE </Text>

      </View>
      <View style={{paddingTop:hp('10%')}}>
        <Text style={{ fontSize:hp('3%') }} >USERNAME:</Text>
        <TextInput style={styles.forInput} value={blank1} onChangeText={(e) => twoFunction1(e) } placeholder='enter here'></TextInput>

        <Text style={{fontSize:hp('3%')}} >PASSWORD:</Text>
        <TextInput style={styles.forInput} value={blank2} secureTextEntry={true} onChangeText={(p) => twoFunction2(p) } placeholder='enter here'></TextInput>
      </View>
      <View style={{paddingTop:hp('7%')}}>

          <View>
         { actvity ?
            <View>
              <Text style={{fontSize:hp('3%' ), justifyContent:'center'}} >please wait</Text>
            <ActivityIndicator size="large"/>
           </View>:
           <View></View> }
          </View>
          <View style={{padding:hp('2%')}}>
            <Text>{enableButton} </Text>
          <Button title=" Login " disabled={enableButton} onPress={() => { callMe() }} />
          </View>
        <View style={{padding:hp('2%')}}>
          <Button title='New User ?'  onPress={() => { navigation.navigate('Signup') }} />
          </View>
        <View style={{padding:hp('2%')}}>
          <Button title='Home'  onPress={() => { navigation.navigate("Home") }} /></View>
      </View>
      </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

//======================================================================================================

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState(0);
  const [pass, setPass] = useState(0);
  const [pass2 , setPass2 ] = useState(0);
  const [name, setName] = useState(0);


  const [disabledButton , setDisableButton] = useState(true)
  const [blank1 ,setBlank1] = useState();
  const [blank2 ,setBlank2] = useState();
  const [blank3 ,setBlank3] = useState();
  const [blank4 ,setBlank4] = useState();

  const [showModal , setShowModal] = useState(false);


  const twoFunction1 = (e) =>{
    setEmail(e);

    setBlank1(e)
    setDisableButton(true)
    check();

  }
  const twoFunction2 = (p) =>{
    setPass(p);

    setBlank2(p)
    setDisableButton(true)
    check();

  }
  const twoFunction3 = (n) =>{
    setName(n);

    setBlank3(n)
    setDisableButton(true)
    check();

  }
  const twoFunction4 = (c) =>{
    setPass2(c);

    setBlank4(c)
    setDisableButton(true)

  }

  const check = () =>{
    if(email.length > 4 && pass.length > 4 && name.length > 4){
        setDisableButton(false)
          // alert(pass)
     }else setDisableButton(true)
   }

  function callMe() {
    setShowModal(true)
    setActivity(true)
    console.warn(email, pass)

    console.warn('hello');
  //  alert('in the function')
    firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function (error) {
     setShowModal(false)
      var errorMessage = error.message;
      var errorCode = error.code;

      alert(errorMessage, errorCode)

    });
  }

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
    setShowModal(false)
      setBlank1('');
      setBlank2('');
      setBlank3('');
      setBlank4('');
      console.warn('lagged in')
      navigation.navigate('Welcome')

    } else {

      console.warn('logged out')
      navigation.navigate('Signup')


    }
  });


  return (
    <ScrollView style={{backgroundColor:'yellow'}}>
      <KeyboardAvoidingView
        behavior={"padding"} style={{flex:1}} >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{flex:1 , alignItems:'center'}}>
            <View>

              <Text style={{fontSize:hp('6%')}} >SIGN-UP HERE</Text>
              <View style={{ height: hp('4%')}}></View>
            </View>

            <View >
              <Modal visible={showModal}>
                <View style={{ flex:1 ,
                                backgroundColor:'skyblue',
                                marginTop:hp('30%'),
                                marginBottom:hp('30%'),
                                marginRight:hp('10%'),
                                marginLeft:hp('10%'),
                                justifyContent:'center' ,
                                alignItems:'center'}} >
                <Text style={{fontSize:hp('5%')}}>please wait...</Text>
                <ActivityIndicator size={'large'}/>
                </View>
              </Modal>
              <View>

                <Text style={{fontSize:hp('3%')}} >ENTER YOUR NAME:</Text>
                <TextInput style={styles.forInput} value={blank3} onChangeText={(n)=>{twoFunction3(n)}}  placeholder='enter here'></TextInput>
              </View>

              <Text style={{fontSize:hp('3%')}}>EMAIL:</Text>
              <TextInput  style={styles.forInput} value={blank1} onChangeText={(e) => twoFunction1(e)} placeholder='enter here'></TextInput>

              <Text style={{fontSize:hp('3%')}}>PASSWORD:</Text>
              <TextInput  style={styles.forInput} value={blank2} secureTextEntry={true} onChangeText={(p) => twoFunction2(p)} placeholder='enter here'></TextInput>

              <Text style={{fontSize:hp('3%')}}>CONFIRM-PASSWORD:</Text>
              <TextInput style={styles.forInput}  value={blank4} onChangeText={()=>{twoFunction4}} secureTextEntry={true} placeholder='enter here'></TextInput>


            </View>
            <View style={{padding:10}}>
              <Button title=" SignUp " disabled={disabledButton} onPress={() => callMe(email, pass)} />
              </View>
              <View>
              <Button title=" Back to SignIn " onPress={() => { navigation.navigate('Login') }} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

//========================================================================================================

const Welcome = ({ navigation }) => {


  const [showModal , setShowModal] = useState(false);


  function callMe() {
    setShowModal(true)

    firebase.database().ref().push({ name: 'arjun vaskale' })

    firebase.auth().signOut().then(function () {

    }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorCode, errorMessage)



    });
    console.warn('executed')

  }
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.warn('lagged in')
      navigation.navigate('Welcome')
    } else {
      navigation.navigate('Login')
    }
  });

  return (
    <View style={styles.container}>
      <View style={{ flex: 2, alignItems: 'center', marginTop: 20 }}>
        <Text style={{ fontSize: hp('3%'), }}>HELLO</Text>
        <Text style={{ fontSize: hp('5%'), fontWeight: 'bold', textDecorationLine: 'underline' }}>
          { (((firebase.auth().currentUser.email)).substring(0,((firebase.auth().currentUser.email).length )-10)).toLocaleUpperCase()}
          </Text>

      </View>
      <Modal visible={showModal}>
                <View style={{ flex:1 ,
                                backgroundColor:'skyblue',
                                marginTop:hp('30%'),
                                marginBottom:hp('30%'),
                                marginRight:hp('10%'),
                                marginLeft:hp('10%'),
                                justifyContent:'center' ,
                                alignItems:'center'}} >
                <Text style={{fontSize:hp('5%')}}>please wait...</Text>
                <ActivityIndicator size={'large'}/>
                </View>
              </Modal>

      <View style={{ flex: 1 }}>
        <Button title="add Note" onPress={() => { navigation.navigate('AddNotes') }} />
      </View>
      <View style={{ flex: 1 }}>
        <Button title="View Notes" onPress={() => { navigation.navigate('ViewNotes') }} />
      </View>
      <View style={{ flex: 1 }}>
        <Button title="Sign Out" onPress={() => { callMe() }} />
      </View>
    </View>
  );
};
//===========================================================================================

const AddNotes = ({ navigation }) => {
  const [title, setTitle] = useState();
  const [addNotes, setNotes] = useState();

  const pushData = () => {
    var userId = firebase.auth().currentUser.uid;

    firebase.database().ref(userId + '/users').push({ note: addNotes, title: title })
    alert('your data has been submitted')
    navigation.navigate('Welcome')
  }
  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 30 }}>Title</Text>
        <TextInput style={styles.forInput} onChangeText={(t) => { setTitle(t) }} placeholder='add title' />
        <Text style={{ fontSize: 30 }}>Add Note</Text>
        <TextInput style={[styles.forInput, { height: 100, width: 300 }]} onChangeText={(n) => { setNotes(n) }} placeholder='add notes' />
        <Button title='submit' onPress={() => { pushData() }} />
      </View>
    </View>
  )
}

//===========================================================================================================
const ViewNotes = ({ navigation }) => {

  const [text1, setText1] = useState('View  Notes in just one click');
  const [text2, setText2] = useState();
  const [increment, setIncrement] = useState(0);

  var arrayList = [];
  const [buttonValue, setButtonValue] = useState('show');

  const fetchData = () => {

    var userId = firebase.auth().currentUser.uid;
    firebase.database().ref(userId + '/users').once('value', (snap) => {
      snap.forEach(function (childSnapshot) {


        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        arrayList.push(childData.title, childData.note)
        // console.warn(arrayList)
        // console.warn(arrayList[3])
        //console.warn('arjun');
        console.warn(arrayList)





      });
      var arrayLength = arrayList.length;
      // alert(arrayLength);

      setText1('title =>' + arrayList[increment]);
      setText2('note =>' + arrayList[increment + 1]);
      setIncrement(increment + 2);
      setButtonValue('show more')

      if (arrayLength > 0) {
        if (arrayList[increment] == arrayList[arrayLength]) {
          alert('!! No More Records !!')
          setText1("!! No more records !!");
          setText2('');
          navigation.navigate('Welcome')
        }
      } else {
        alert('NO RECORDS');
        setText1('');
        setText2('');
        navigation.navigate('Welcome')
      }
    })
  }
  //   const inc = (increment) =>{

  //     alert(arrayList);
  //     setText1('title =>' +arrayList[increment]);
  //     // setText2('note =>' +arrayList[decrement]);
  //  }


  return (
    <View style={styles.container}>

      <View style={{ flex: 2 }}>

        <Text style={{ fontSize: 30 }}>{text1} </Text>
        <Text style={{ fontSize: 30 }}>{text2} </Text>
        {/*
        <View style={{flex:.4,flexDirection:'row', justifyContent:'space-between'}}>
          <Button title="pre"/>
          <Button onPress={()=>{inc(increment)}}  title='next'/>
        </View> */}

      </View>
      <View style={{ flex: 3, alignItems: 'center' }}>
        <Button title={buttonValue} onPress={() => { fetchData() }} />




      </View>
    </View>
  )
}
const Stack = createStackNavigator();

function Nav() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={App} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="AddNotes" component={AddNotes} />
        <Stack.Screen name="ViewNotes" component={ViewNotes} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Welcome" component={Welcome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: 'yellow',
    justifyContent: 'center',


  },
  forInput: {
    margin: 10,
    width: 170,
    height: 40,
    borderWidth: 1,

  }
});

export default Nav;
