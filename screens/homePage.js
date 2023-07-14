import {Image, Text, View, TouchableOpacity,BackHandler,Alert} from 'react-native';
import {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Activity from 'react-native-vector-icons/MaterialCommunityIcons'
import Back from 'react-native-vector-icons/MaterialIcons'
const Home = ({navigation}) => {
  const [appointments, setAppointments] = useState([]);

  const [userName, setUserName] = useState('');

    {/*function monthIndexToMonth(date){
        console.log("HELPER CLALLED");
    return date.toLocaleString('en-US', {
      month: 'long',
    });
  }

    let [username, setUsername] = useState('');
  
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hours = new Date().getHours(); 
    var min = new Date().getMinutes(); 
var sec = new Date().getSeconds();*/}
    async function fetchUsername() {
      uname = await AsyncStorage.getItem('loggedIn');
      setUserName(uname);
    }
  
    useEffect(() => {
      fetchUsername();
      retrieveUserName();
      fetchAppointments();
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
  
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      };
    }, []);
    async function Logout(){
      await AsyncStorage.clear()
      navigation.replace('Login')
    }

    const retrieveUserName = async () => {
      try {
        const storedUserName = await AsyncStorage.getItem('UserName');
        console.log(storedUserName);
        if (storedUserName) {
          setUserName(storedUserName);
        }
      } catch (error) {
        console.error('Error retrieving userName from AsyncStorage:', error);
      }
    };
    const handleBackPress = () => {
            BackHandler.exitApp();
      return true;
    };

    const fetchAppointments = async () => {
      try {
        const response = await fetch(`https://retoolapi.dev/fDK1ci/data?username=${username}`);
        const jsonData = await response.json();
        setAppointments(jsonData);
        console.log(jsonData)
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    return (

      
      <View>
        <TouchableOpacity onPress={handleBackPress}>
        <Back name='arrow-back-ios' size={30} style={{marginLeft:responsiveWidth(2)}}/>
        </TouchableOpacity>
          {/*<Text style={{color: 'black', fontWeight: 'bold', fontSize: 15}}>
            Thursday {date}, {monthIndexToMonth(month)} 2022
        </Text>*/}


    <View style={{flexDirection:'row'}}>
      <View style={{ marginLeft: responsiveWidth(5),marginTop:responsiveHeight(1.8)}}>
        <Text style={{ fontSize: responsiveFontSize(2), color: '#9e9e9e' }}>Welcome</Text>
        <Text style={{ fontSize: responsiveFontSize(3), color: '#1c1d23' }}>{userName}</Text>
      </View>
      <View style={{ flexDirection: 'row',marginTop:responsiveHeight(1.8),marginLeft:responsiveWidth(35)}}>
        <TouchableOpacity onPress={Logout}>
          <Icon name="person-circle" color={'#9E9E9E'} size={70} />
        </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row',marginTop:responsiveHeight(5),marginLeft:responsiveWidth(2)}}>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Icon
            name="notifications"
            color={'#9E9E9E'}
            size={25}
          />
        </TouchableOpacity>
        </View>
    </View>
    <View
    style={{borderRadius: 8,
      backgroundColor: "#175ca4",
      width: responsiveWidth(90),
      height: responsiveHeight(10),
      marginLeft:responsiveWidth(5),
      flexDirection:'row',
      marginTop:responsiveHeight(2)
    }}
    >
            <Activity
            name="chart-line-stacked"
            color={'#ffffff'}
            size={25}
            style={{marginTop:responsiveHeight(3.2),marginLeft:responsiveWidth(3)}}
          />
      <Text style={{marginTop:responsiveHeight(2.5),marginLeft:responsiveWidth(2),color:'#fff',fontSize:responsiveFontSize(3),fontFamily:'Poppins-Regular'}}>Eligibility Check</Text>
      <TouchableOpacity
        style={{
          borderRadius: 50,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          height: responsiveHeight(4),
          width: responsiveWidth(22),
          marginTop: responsiveHeight(3),
          marginLeft: responsiveWidth(5),
        }}
      >
        <Text 
        style={{fontSize:responsiveFontSize(1.5),color:'#fff',marginLeft:responsiveWidth(3),marginTop:responsiveHeight(0.8)}}>
          Check now
        </Text>
        </TouchableOpacity>
      </View>
    <View
    style={{borderRadius: 8,
      backgroundColor: "#ffaf39",
      width: responsiveWidth(90),
      height: responsiveHeight(10),
      marginLeft:responsiveWidth(5),
      flexDirection:'row',
      marginTop:responsiveHeight(2)
    }}
    >
            <Activity
            name="calendar-month"
            color={'#ffffff'}
            size={25}
            style={{marginTop:responsiveHeight(3.2),marginLeft:responsiveWidth(3)}}
          />
      <Text style={{marginTop:responsiveHeight(2.5),marginLeft:responsiveWidth(2),color:'#fff',fontSize:responsiveFontSize(3.2),fontFamily:'Poppins-Regular'}}>Appointments</Text>
      <TouchableOpacity
        style={{
          borderRadius: 50,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          height: responsiveHeight(4),
          width: responsiveWidth(22),
          marginTop: responsiveHeight(3),
          marginLeft: responsiveWidth(3),
        }}
      >
        <Text 
        style={{fontSize:responsiveFontSize(1.8),color:'#fff',marginLeft:responsiveWidth(3),marginTop:responsiveHeight(0.8)}}>
          See more
        </Text>
        </TouchableOpacity>
      </View>

      <View>
      {/* Render the appointments list */}
      {appointments && appointments.length > 0 ? (
        appointments.map((appointment, index) => (
          <View key={index}>
            <Text>Date: {appointment.date}</Text>
            <Text>Time: {appointment.time}</Text>
            <Text>Slot: {appointment.slot}</Text>
          </View>
        ))
      ) : (
        <View style={{flexDirection:'row', marginTop:20,marginHorizontal:20,justifyContent:'space-between'}}>
          <View style={{width:'50%',justifyContent:'center'}}>
             <Text numberOfLines={3} ellipsizeMode='tail' style={{color:'grey',fontFamily:'Poppins-Regular',fontSize:20,marginLeft:10}}>No Appointments Available</Text> 
             </View>
        <Image source={require('../assets/doctor.png')} style={{marginRight:10,width:140,height:150}}/>
        </View>
      )}
    </View>

  
       {/*} <View style={{margin: 20}}>
          <Text style={{fontSize: 30, fontWeight: 'bold', color: 'black'}}>
            Welcome Back,
          </Text>
          <Text style={{fontSize: 21, color: '#295C99', marginTop: 5}}>
            {username}
          </Text>
        </View>*/}
  
        {/*<View
          style={{
            flexDirection: 'row',
            marginHorizontal: 25,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              height: 85,
              width: 85,
              backgroundColor: 'white',
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 12, color: 'black'}}>
              Upcoming
            </Text>
            <Text style={{color: '#295C99', fontSize: 30, fontWeight: '500'}}>
              03
            </Text>
          </View>
  
          <View
            style={{
              height: 80,
              width: 80,
              backgroundColor: 'white',
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 12, color: 'black'}}>
              Attended
            </Text>
            <Text style={{color: '#295C99', fontSize: 30, fontWeight: '500'}}>
              13
            </Text>
          </View>
          <View
            style={{
              height: 80,
              width: 80,
              backgroundColor: 'white',
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 12, color: 'black'}}>
              Total
            </Text>
            <Text style={{color: '#295C99', fontSize: 30, fontWeight: '500'}}>
              16
            </Text>
          </View>
        </View>
  
        <View style={{margin: 20}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15}}>
              Upcoming Appointments
            </Text>
            <TouchableOpacity>
              <Text style={{color: '#295C99', fontWeight: 'bold', fontSize: 15}}>
                View More
              </Text>
            </TouchableOpacity>
          </View>
        </View>
          */}
      </View>
    );
  };
  export default Home;