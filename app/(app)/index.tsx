import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text, } from 'react-native';
import { useSession } from '../../context/ctx';


type UserDetails = {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	role_permission: number;
	description: string;
	location: {
		type: string,
		data: {
			lng: number,
			lat: number
		}
	}
};


const App = () => {


	const { signOut, session } = useSession();
	//const { session } = useSession();
	const [data, setData] = useState<UserDetails[]>([]);
	const [loading, setLoading] = useState(true);



	const getHabits = async () => {
		console.debug('again');
		try {
			const authKey = session;
			console.debug(authKey);
			const response = await fetch('https://xnme-bfhy-y4ex.n7.xano.io/api:QrQJpPSC/bridget', {
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${authKey}`,
					'Content-Type': 'application/json',
				},
			});
			const json = await response.json();
			setData(json);
		} catch (error) {
			console.error(error);
			//router.replace('/');
		} finally {
			setLoading(false);
			console.debug("homeloaded");
		}
	};

	useEffect(() => {
		console.debug('useeffect');
		getHabits();
		console.debug('test');
	}, []);



	if (loading) {
		return <Text>Loading...</Text>;
	}

	return (
		<View style={{ flex: 1 }}>
			<Text
				onPress={() => {
					// The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
					signOut();
				}}>
				Sign Out
			</Text>
			<MapView style={{ flex: 1 }}
				initialRegion={{
					latitude: 42.290390,
					longitude: -83.713242,
					latitudeDelta: 0.922,
					longitudeDelta: 0.421,
				}}>
				{data.map((item, index) => (
					<Marker
						key={index}
						coordinate={{ latitude: item.location.data.lat, longitude: item.location.data.lng }}
						title={item.first_name} // Assuming your data has a title field
						description={item.description} // Assuming your data has a description field
					/>
				))}
			</MapView>
		</View>
	);

}


export default App;