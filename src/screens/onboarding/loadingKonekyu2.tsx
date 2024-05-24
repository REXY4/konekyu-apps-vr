import { useEffect, useState } from 'react';
import { Image, Dimensions, View, StyleSheet, Animated } from 'react-native';
const {height}= Dimensions.get("screen");

const LoadingKonekyu2 = () =>{
    const [fadeAnim, setFadeAnim] = useState(new Animated.Value(0)); 
    const [fadeOut, setFadeOut] = useState(new Animated.Value(0));
   
    useEffect(() => {
        const fadeInOut = () => {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500, // Adjust the duration as needed
                useNativeDriver: true,
            }).start(() => {
                // After fading in, fade out
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 1000, // Adjust the duration as needed
                    useNativeDriver: true,
                }).start();
            });
        };

        const interval = setInterval(fadeInOut, 2000); // Trigger animation every 2 seconds

        return () => clearInterval(interval); // Cleanup the interval on unmount
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const fadeInOut = () => {
            Animated.timing(fadeOut, {
                toValue: 1,
                duration: 1000, // Adjust the duration as needed
                useNativeDriver: true,
            }).start(() => {
                // After fading in, fade out
                Animated.timing(fadeOut, {
                    toValue: 0,
                    duration: 1000, // Adjust the duration as needed
                    useNativeDriver: true,
                }).start();
            });
        };
        const interval = setInterval(fadeInOut, 2000); // Trigger animation every 2 seconds
        return () => clearInterval(interval); // Cleanup the interval on unmount
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
            <View style={{
                flexDirection : "row",
                justifyContent : "center",
                // marginTop : height / 3.5,
            }}>
                <View style={{
                    flexDirection : "row",
                    alignItems  :"center"
                }}>
                    <Image source={require("../../../assets/icons/i.png")} style={{
                        width : 50,
                        height : 50,
                        objectFit : "fill"
                    }}/>
                    <Animated.Image source={require("../../../assets/icons/i1.png")} style={{
                        width : 30,
                        height : 70,
                        objectFit : "fill",
                        opacity : fadeAnim,
                    }}/>
                     <Animated.Image source={require("../../../assets/icons/i1.png")} style={{
                        width : 30,
                        height : 120,
                        objectFit : "fill",
                        opacity : fadeOut,
                    }}/>
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    row : {
        width : 200,
        height: 200,
        borderRadius : 100,
        borderWidth : 30,
    }
})

export default LoadingKonekyu2;