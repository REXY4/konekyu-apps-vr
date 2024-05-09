import { View, Animated, Image } from "react-native"
import { TabBarLocation } from '../../../components/icons/TabBarIcon';
import Colors from "../../../components/colors/Colors";
import { useEffect, useState } from "react";

const IconLocation = ()=>{
    const [fadeAnim, setFadeAnim] = useState(new Animated.Value(0)); 
    const [fadeAnim2, setFadeAnim2] = useState(new Animated.Value(0)); 
   
    useEffect(() => {
        const fadeInOut = () => {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300, // Adjust the duration as needed
                useNativeDriver: true,
            }).start(() => {
                // After fading in, fade out
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 600, // Adjust the duration as needed
                    useNativeDriver: true,
                }).start();
            });
        };

        const interval = setInterval(fadeInOut, 2000); // Trigger animation every 2 seconds

        return () => clearInterval(interval); // Cleanup the interval on unmount
    }, []);

    useEffect(() => {
        const fadeInOut = () => {
            Animated.timing(fadeAnim2, {
                toValue: 1,
                duration: 600, // Adjust the duration as needed
                useNativeDriver: true,
            }).start(() => {
                // After fading in, fade out
                Animated.timing(fadeAnim2, {
                    toValue: 0,
                    duration: 1000, // Adjust the duration as needed
                    useNativeDriver: true,
                }).start();
            });
        };

        const interval = setInterval(fadeInOut, 2000); // Trigger animation every 2 seconds

        return () => clearInterval(interval); // Cleanup the interval on unmount
    }, []);
    return (
        <View style={{
            position : "relative",
            bottom : 10,
            right : 10,
        }}>
            <Animated.View style={{
                    borderColor : Colors.ResColor.yellow,
                    borderWidth : 2,
                    padding : 5,
                    borderRadius : 100,
                    left : 11.5,
                    top  :17,
                    opacity  :fadeAnim,
                    position :"absolute",
                }}>

                </Animated.View>
                <Animated.View style={{
                    borderColor : Colors.ResColor.yellow,
                    borderWidth : 2,
                    padding : 8,
                    left : 8,
                    top : 15,
                    position : "absolute",
                    borderRadius : 100,
                    opacity  :fadeAnim2
                }}>

                </Animated.View>
                <View style={{
                    position : "relative",
                    left : 10,
                    top : 10,
                }}>
                <TabBarLocation size={18} color={Colors.ResColor.blue}/>
                </View>
        </View>
    )
}

export default IconLocation;