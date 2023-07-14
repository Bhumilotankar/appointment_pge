import { Icon, TouchableOpacity, View, Text, ScrollView, Alert, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions'
// import { Calendar } from 'react-native-calendars'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Calendar from './Calendar';

const Book_Appointment = () => {
  const [APIData, setAPIData] = useState([]);
  const [APIData1, setAPIData1] = useState([]);
  const [selectedTime, onSelectTime] = useState('')
  const [morning, setMorning] = useState(false);
  const [day, setDay] = useState(false);
  const [night, setNight] = useState(false);
  const [morningData, setMorningData] = useState([]);
  const [dayData, setDayData] = useState([]);
  const [nightData, setNightData] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [categoryData,setCategoryData]=useState([]);
  const [selectedCategory,onSelectCategory]=useState(null);


  // https://retoolapi.dev/rJlECu/appointment
  useEffect(() => {
    APIgetData();
    APIgetData1();

  })

  // '#175CA4'
  const APIgetData = async () => {
    try{
      const response = await fetch('https://www.myjsons.com/v/d8211381');
      const jsonData = await response.json();
      // console.log(jsonData.details);
      setAPIData(jsonData.details);
      setCategoryData(jsonData.details);
     
     }catch(error){
      console.log("Error: ",error);
     }
     
   
    
  };

  const APIgetData1 = async () => {
    const response = await fetch('https://www.myjsons.com/v/e56b1373');
    const jsonData = await response.json();
    setAPIData1(jsonData.timeslots);
    setMorningData(jsonData.timeslots[0].morning);
    setDayData(jsonData.timeslots[0].afternoon);
    setNightData(jsonData.timeslots[0].evening);
  };

  const handleTimeSlotPress = (timeSlot) => {
    if (timeSlot === selectedSlot) {
      // Deselect the time slot if it is already selected
      setSelectedSlot(null);
      onSelectTime('');
    } else {
      // Select the time slot
      setSelectedSlot(timeSlot);
      onSelectTime(timeSlot.time);
    }
  };


  async function Logout(){
    await AsyncStorage.clear();
    navigation.replace('Login')
  }

  const handleSubmission = () => {
    if (!onSelectDate || !selectedTime) {
      Alert.alert('Error', 'Fill all fields');
    }
    else {
      console.log('submitted');
      Alert.alert('Submitted', 'Your Appointment is booked')
      const storeEndpoint = 'https://retoolapi.dev/rJlECu/appointment';
      const credentials = {
        date: onSelectDate,
        time: selectedTime,
      };

      return fetch(storeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

    }

    const bookAppointment = async () => {
      // Check if all required data is available
      if (username && email && selectedSlot !== -1 && selectedTime) {
        try {
          const formattedDate = moment(currentDate, 'ddd, MMM D').format('DD-MM-YYYY');
          const response = await fetch('https://retoolapi.dev/fDK1ci/data', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username,
              email,
              slot: selectedSlot,
              time: selectedTime,
              date: formattedDate,
            }),
          });
    
          if (response.ok) {
            // Appointment booked successfully
            console.log('Appointment booked successfully');
          } else {
            // Handle error response
            console.error('Failed to book appointment');
          }
        } catch (error) {
          console.error('Error booking appointment:', error);
        }
      } else {
        console.error('Missing required data');
      }
    };
    
  }

  

  const [onSelectDate, setOnselectDate] = useState('')
  return (
  <ScrollView>
  
  <View style={{ marginHorizontal: responsiveWidth(4) }}>
  <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
  <View
    style={{
      borderRadius: responsiveHeight(1),
      padding: responsiveWidth(2),
      marginTop: responsiveHeight(2),
      borderColor: 'black',
    }}>
  </View>
  </View>

   <View style={{  borderRadius:15}} >
   <Text style={{ color: 'black', fontSize: 15,fontFamily:'Poppins-Regular'}}> Choose Date </Text>
   <Calendar onSelectDate={setOnselectDate} selected={onSelectDate}  />
   </View>
 
   <Text style={{ color: 'black', fontSize: 15,fontFamily:'Poppins-Regular'}}> Choose Category </Text>

<ScrollView horizontal>
    <View style={{flexDirection:'row',borderColor:'black',  borderRadius:10}}>

    { categoryData.map((element)=>{return <TouchableOpacity onPress={() => onSelectCategory(element.category)}><View style={[{borderWidth:1,borderColor:'black',borderRadius:10,marginHorizontal:10,marginTop: 10,},{  backgroundColor: selectedCategory === element.category ? '#175CA4' : 'white',}]}>
          <Text numberOfLines={3} style={[{ color: 'black',marginHorizontal:14,fontSize:12,marginVertical:7,fontFamily:'Poppins-Regular'},{  color: selectedCategory === element.category ? 'white' : 'black'}]}>{element.category}</Text>
          <Text numberOfLines={3} style={[{ color: 'black',marginHorizontal:14,fontSize:12,marginBottom:7,fontFamily:'Poppins-Regular'},{  color: selectedCategory === element.category ? 'white' : 'black'}]}>{element.duration} mins </Text>

          </View></TouchableOpacity>})
 }
     </View>
     </ScrollView>
  
 
        <View style={{marginTop:30}}>
          <Text style={{ color: 'black', fontSize: 15,fontFamily:'Poppins-Regular' }}> Choose Time </Text>
          <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
         <View  style={{ flexDirection: 'row'}}>
         <Image   source={require('../assets/halfsun.png')} style={{width:30,height:18,marginTop:5}}/>
         <Text style={{ color: 'black', fontSize: 18,fontFamily:'Poppins-Regular'}}> Morning </Text>

         </View>
             <TouchableOpacity onPress={()=>{morning?setMorning(false):setMorning(true)}}>
             <AntDesign name={morning?"upcircle":"downcircle"} style={{ color: 'grey'}} size={15} />
             </TouchableOpacity>
          </View>

        
          { morning ?<View style= {{marginTop:15}}>
            <View
          style={{flex: 1, height: 1, backgroundColor: 'grey',marginBottom:10}}
           />
          <View style={{ flexDirection: 'row', flex: 1, flexWrap: 'wrap'}}>
{
           morningData.map((element)=>{return <TouchableOpacity   onPress={() => onSelectTime(element.time)}><View style={[{borderWidth:1,borderColor:'grey',borderRadius:40,marginHorizontal:10,marginTop: 10},{  borderColor: selectedTime === element.time ? '#175CA4' : 'grey',}]}>
          <Text style={[{ color: 'black',marginHorizontal:14,fontSize:12,marginVertical:7,fontFamily:'Poppins-Regular'},{  color: selectedTime === element.time ? '#175CA4' : 'grey',}]}>{element.time}</Text>
          </View></TouchableOpacity>})

}
          
          </View></View> : null}

          <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' }}>
          <View  style={{ flexDirection: 'row'}}>

            <Image  source={require('../assets/sun.png')} style={{width:30,height:30,}}/>
             <Text style={{ color: 'black', fontSize: 18 ,fontFamily:'Poppins-Regular'}}> Day </Text>
             </View>
             <TouchableOpacity onPress={()=>{day?setDay(false):setDay(true)}}>
             <AntDesign name={day?"upcircle":"downcircle"} style={{ color: 'grey'}} size={15} />
             </TouchableOpacity>
          </View>

        
          { day ?<View style= {{marginTop:15}}>
            <View
          style={{flex: 1, height: 1, backgroundColor: 'grey',marginBottom:10}}
           />
          <View style={{ flexDirection: 'row', flex: 1, flexWrap: 'wrap'}}>

          {dayData.map((element)=>{return <TouchableOpacity onPress={() => onSelectTime(element.time)}><View style={[{borderWidth:1,borderColor:'grey',borderRadius:40,marginHorizontal:10,marginTop: 10},{  borderColor: selectedTime === element.time ? '#175CA4' : 'grey',}]}>
          <Text style={[{ color: 'black',marginHorizontal:14,fontSize:12,marginVertical:7,fontFamily:'Poppins-Regular'},{  color: selectedTime === element.time ? '#175CA4' : 'grey',}]}>{element.time}</Text>
          </View></TouchableOpacity>})}

          </View></View> : null}

          <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' }}>
          <View  style={{ flexDirection: 'row'}}>
                <Image  source={require('../assets/moon.png')} style={{width:24,height:28,marginLeft:5}}/>
            <Text style={{ color: 'black', fontSize: 18 ,fontFamily:'Poppins-Regular'}}> Night </Text>
             </View>
             <TouchableOpacity onPress={()=>{night?setNight(false):setNight(true)}}>
             <AntDesign name={night?"upcircle":"downcircle"} style={{ color: 'grey'}} size={15} />
             </TouchableOpacity>
          </View>

    
          { night ?<View style= {{marginTop:15}}>
            <View
          style={{flex: 1, height: 1, backgroundColor: 'grey',marginBottom:10}}
           />
          <View style={{ flexDirection: 'row', flex: 1, flexWrap: 'wrap'}}>
          
          {
         nightData.map((element)=>{return <TouchableOpacity onPress={() => onSelectTime(element.time)}><View style={[{borderWidth:1,borderColor:'grey',borderRadius:40,marginHorizontal:10,marginTop: 10},{  borderColor: selectedTime === element.time ? '#175CA4' : 'grey',}]}>
          <Text style={[{ color: 'black',marginHorizontal:14,fontSize:12,marginVertical:7,fontFamily:'Poppins-Regular'},{  color: selectedTime === element.time ? '#175CA4' : 'grey',}]}>{element.time}</Text>
          </View></TouchableOpacity>
          })}
          
          </View></View> : null}
        </View>
      </View>


      <View style={{
        flex: 1,
        justifyContent: 'flex-end',
        marginTop:20
      }}>
        <TouchableOpacity style={{}}
          onPress={handleSubmission}>
          <View style={{ color: 'white', width: '90%', backgroundColor: '#175CA4', height: 40, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
            <Text style={{ color: 'white', fontWeight: "600" ,fontFamily:'Poppins-Regular'}}>
              Set Date & Time
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default Book_Appointment