import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, FlatList, Linking, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

// 1. HOME - Weather
function HomeScreen() {
  const [weather, setWeather] = useState({ temp: '...', desc: 'Loading...' });

  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=23.4569&longitude=93.3271&current=temperature_2m,weather_code')
      .then(res => res.json())
      .then(data => {
        setWeather({ 
          temp: Math.round(data.current.temperature_2m), 
          desc: getWeatherDesc(data.current.weather_code) 
        });
      })
      .catch(() => setWeather({ temp: '-', desc: 'Internet check rawh' }));
  }, []);

  const getWeatherDesc = (code) => {
    if (code === 0) return 'Nisa, a thiang';
    if (code < 4) return 'A zím deuh';
    if (code < 50) return 'Ruah sur';
    return 'Chhum a zím';
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Zawlsei Khaw App</Text>
      <Text style={styles.subtext}>Chibai! Kan khaw dawr, chanchin, leh contact te.</Text>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Zawlsei Weather</Text>
        <Text style={styles.weatherTemp}>{weather.temp}°C</Text>
        <Text>{weather.desc}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Thu Pawimawh</Text>
        <Text>App hi siam thar mek a ni. News leh dawr update theih e.</Text>
      </View>
    </ScrollView>
  );
}

// 2. DAWR - Your 3 Stores
function ShopScreen() {
  const shops = [
    {id: '1', name: 'Rampari Variety Store', phone: '918014612701', items: 'Bungrua hrang hrang'},
    {id: '2', name: 'Mawitei Variety Store', phone: '917085073454', items: 'Mamawh zualpui'},
    {id: '3', name: 'Nitei Variety Store', phone: '918730885627', items: 'Dawr mamawh'},
  ];

  const openWhatsApp = (phone, name) => {
    const message = `Chibai ${name}, dawr atanga thil order duh ka nia`;
    Linking.openURL(`whatsapp://send?phone=${phone}&text=${encodeURIComponent(message)}`);
  };
  
  return (
    <FlatList
      data={shops}
      style={styles.container}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text>{item.items}</Text>
          <Text style={styles.phone}>Phone: +{item.phone.slice(0,2)} {item.phone.slice(2,7)} {item.phone.slice(7)}</Text>
          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.callBtn} onPress={() => Linking.openURL(`tel:+${item.phone}`)}>
              <Ionicons name="call" size={18} color="white" />
              <Text style={styles.btnText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.waBtn} onPress={() => openWhatsApp(item.phone, item.name)}>
              <Ionicons name="logo-whatsapp" size={18} color="white" />
              <Text style={styles.btnText}>WhatsApp</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
}

// 3. NEWS - Chanchin Thar
function NewsScreen() {
  const news = [
    {id: '1', title: 'App siam thar', date: '5 May 2026', body: 'Zawlsei khaw tan app kan siam ta. Dawr leh contact a awm e.'},
    {id: '2', title: 'VC hriattirna', date: '4 May 2026', body: 'Inrinni zan dar 7:00 ah YMA Hall-ah khaw mipui meeting a awm dawn.'},
  ];
  
  return (
    <FlatList
      data={news}
      style={styles.container}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.date}>{item.date}</Text>
          <Text>{item.body}</Text>
        </View>
      )}
    />
  );
}

// 4. CONTACT - Pawimawh te
function ContactScreen() {
  const contacts = [
    {id: '1', name: 'VCP - Lalbera', phone: '919862000100'},
    {id: '2', name: 'YMA President', phone: '919862000101'},
    {id: '3', name: 'PHC Zawlsei', phone: '919862000102'},
    {id: '4', name: 'Zawlsei PS', phone: '919862000103'},
  ];

  const openWhatsApp = (phone, name) => {
    const message = `Chibai ${name}`;
    Linking.openURL(`whatsapp://send?phone=${phone}&text=${encodeURIComponent(message)}`);
  };
  
  return (
    <FlatList
      data={contacts}
      style={styles.container}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.phone}>Phone: +{item.phone.slice(0,2)} {item.phone.slice(2,7)} {item.phone.slice(7)}</Text>
          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.callBtn} onPress={() => Linking.openURL(`tel:+${item.phone}`)}>
              <Ionicons name="call" size={18} color="white" />
              <Text style={styles.btnText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.waBtn} onPress={() => openWhatsApp(item.phone, item.name)}>
              <Ionicons name="logo-whatsapp" size={18} color="white" />
              <Text style={styles.btnText}>WhatsApp</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = 'home';
            else if (route.name === 'Dawr') iconName = 'cart';
            else if (route.name === 'News') iconName = 'newspaper';
            else if (route.name === 'Contact') iconName = 'call';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerStyle: { backgroundColor: '#2E7D32' },
          headerTintColor: '#fff',
          tabBarActiveTintColor: '#2E7D32',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Dawr" component={ShopScreen} />
        <Tab.Screen name="News" component={NewsScreen} />
        <Tab.Screen name="Contact" component={ContactScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { fontSize: 28, fontWeight: 'bold', margin: 20, color: '#2E7D32' },
  subtext: { fontSize: 16, marginHorizontal: 20, marginBottom: 20 },
  card: { backgroundColor: 'white', padding: 16, margin: 10, borderRadius: 8, elevation: 2 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 6 },
  phone: { color: '#555', marginTop: 6, marginBottom: 4 },
  date: { color: '#666', marginBottom: 6, fontSize: 12 },
  weatherTemp: { fontSize: 40, fontWeight: 'bold', color: '#1976D2' },
  btnRow: { flexDirection: 'row', marginTop: 12, gap: 10 },
  callBtn: { backgroundColor: '#1976D2', padding: 10, borderRadius: 6, flexDirection: 'row', alignItems: 'center', gap: 6, flex: 1, justifyContent: 'center' },
  waBtn: { backgroundColor: '#25D366', padding: 10, borderRadius: 6, flexDirection: 'row', alignItems: 'center', gap: 6, flex: 1, justifyContent: 'center' },
  btnText: { color: 'white', fontWeight: '600' },
});