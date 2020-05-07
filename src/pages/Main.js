import React, { useState ,useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location'


function Main(){

    const [currentRegion, setCurrentRegion] = useState(null);

    useEffect(()=> {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();

            if(granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                const { latitude, longitude } = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                })
            }
        }

        loadInitialPosition();
    }, []);

    if(!currentRegion){
        return null;
    }
    return (        
        <MapView  initialRegion={currentRegion} style= {style.map}>
            <Marker coordinate={{latitude: -12.9158725, longitude: -38.4369632}}>
                <Image style={style.avatar} source={{ uri: 'https://avatars3.githubusercontent.com/u/25827712?s=400&u=4b4df62325f2118daa9a30a9f7c4702db4d10606&v=4'}}/>
            </Marker> 
        </MapView>
    );
}

const style = StyleSheet.create({
    map: {
        flex: 1 
    },

    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF'
    }

})


export default Main;