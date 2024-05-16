import Colors from "../../components/colors/Colors";
import ContentLoader from "react-content-loader/native";
import { Rect } from "react-native-svg";


const MapLoader = ()=>{
    return (
    <ContentLoader  backgroundColor={Colors.ResColor.white} foregroundColor={Colors.ResColor.lightBlue}>
        <Rect  width="100%" height="100%" fill="black" />
    </ContentLoader>
    )
}

export default MapLoader;