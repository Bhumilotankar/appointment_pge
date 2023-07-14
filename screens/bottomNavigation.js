import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Home from './homePage';
import Icon from 'react-native-vector-icons/FontAwesome';
import More from './More';
import Settings from './Settings';
import Book_Appointment from './Book_Appointment';
import Chat from './Chat';
import { View,TouchableOpacity } from 'react-native';

function BottomNavTabs() {
    const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ iconName, onPress, isFocused }) => (
    <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 5, 
    }}
  >
    <TouchableOpacity
      style={{
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isFocused ? '#175CA4' : 'transparent',
        borderRadius: 8,
        borderWidth: 5,
        borderColor: 'transparent',
        elevation: isFocused ? 15 : 0,
        shadowColor: '#f83287',
        shadowOpacity: isFocused ? 1 : 0,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowRadius: 1,
        marginTop: 5,
      }}
      onPress={onPress}
    >
      <Icon name={iconName} size={25} color={isFocused ? 'white' : '#D3D3D3'}/>

    </TouchableOpacity>
  </View>
);
  return (
    // <BottomTab.Navigator initialRouteName='Dashboard'>
    //   <BottomTab.Screen  name="Dashboard" component={Home} options={{tabBarShowLabel:false,
    //     headerShown:false,
    //   tabBarActiveBackgroundColor:'blue',
    //   tabBarIcon:()=>{return CustomTabBarButton("Home")}}}  />
    //   <BottomTab.Screen name="Chat" component={Chat} options={{headerShown:false,tabBarIcon:()=>{return <Icon
    //           name="chat"
    //           color={'grey'}
    //           size={23}
    //         //   style={{marginRight: 20}}
    //         />}}} />
    //   <BottomTab.Screen name="Book Appointment" component={Book_Appointment} options={{headerShown:false,tabBarIcon:()=>{return <Icon
    //           name="event"
    //           color={'grey'}
    //           size={23}
    //         //   style={{marginRight: 20}}
    //         />}}} />
    //   <BottomTab.Screen name="Settings" component={Settings} options={{headerShown:false,tabBarIcon:()=>{return <Icon
    //           name="shield"
    //           color={'grey'}
    //           size={23}
    //         //   style={{marginRight: 20}}
    //         />}}} />
    //   <BottomTab.Screen name="More" component={More} options={{headerShown:false,tabBarIcon:()=>{return <Icon
    //           name="vertical-dot"
    //           color={'grey'}
    //           size={23}
    //           style={{marginRight: 20}}
    //         />}}} />
    // </BottomTab.Navigator>
    // <NavigationContainer>
            <Tab.Navigator initialRouteName='Book_Appointment'
                screenOptions={{
                    showLabel: false, // Hide the label of the active tab
                    style: {
                        borderTopWidth: 0,
                        elevation: 10,
                        
                    },
                    tabStyle: {
                        justifyContent: 'center', 
                    }
                }}
                tabBar={(props) => (
                    <View
                        style={{
                            flexDirection: 'row',
                            backgroundColor: 'white',
                            height:55, 
                        }}
                    >
                        <CustomTabBarButton
                            onPress={() => props.navigation.navigate('Home')}
                            iconName="home"
                            isFocused={props.state.index === 0}
                        />
                        <CustomTabBarButton
                            onPress={() => props.navigation.navigate('Chat')}
                            iconName="commenting-o"
                            isFocused={props.state.index === 1}
                        />
                        <CustomTabBarButton
                            onPress={() => props.navigation.navigate('Book_Appointment')}
                            iconName="calendar-plus-o"
                            isFocused={props.state.index === 2}
                        />
                        <CustomTabBarButton
                            onPress={() => props.navigation.navigate('Report')}
                            iconName="file-text-o"
                            isFocused={props.state.index === 3}
                        />
                        <CustomTabBarButton
                            onPress={() => props.navigation.navigate('More')}
                            iconName="ellipsis-h"
                            isFocused={props.state.index === 4}
                        />
                    </View>
                )}
            >
                <Tab.Screen name="Home" component={Home} options={{headerShown:false}}/>
                <Tab.Screen name="Chat" component={Chat} />
                <Tab.Screen name="Book_Appointment" component={Book_Appointment} options={{headerShown:false}} />
                <Tab.Screen name="Report" component={Settings} />
                <Tab.Screen name="More" component={More} />
            </Tab.Navigator>
        // </NavigationContainer>
  );
}

export default BottomNavTabs;