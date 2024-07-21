import Colors from "../../components/colors/Colors";
import ContentLoader from "react-content-loader/native";
import { Rect } from "react-native-svg";


const CardLoader = ()=>{
    return (
    <ContentLoader  backgroundColor={Colors.ResColor.white} foregroundColor={Colors.ResColor.lightBlue} >
        <Rect  width="100%" height="50px" fill="black"  rx="10" ry="10"/>
    </ContentLoader>
    )
}

export default CardLoader;