import { ImageBackground, SafeAreaView, StatusBar, Text, Dimensions } from "react-native";
import Colors from "../../components/colors/Colors";
const height = Dimensions.get("window").height;

const HomeScreen = () =>{
    return (
        <SafeAreaView>
            <StatusBar backgroundColor={Colors.ResColor.blue}/>
            <ImageBackground 
            style={{
                height : height / 2.5
            }}
            source={require("../../../assets/images/appbar_dashboard.png")}>
                <Text>Hallo World</Text>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default HomeScreen;