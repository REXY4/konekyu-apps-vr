import { View, Text } from "react-native"
import FontStyle from "../../../types/FontTypes";
import Colors from "../../../components/colors/Colors";
import { ArticleDash } from "../../../entities/dashboard.entities";
import CardArtikle from "./CardArtikel";

interface Props {
    data : Array<ArticleDash>
}

const ArtikelData = ({data}:Props) =>{
    return(
        <View>
            <Text style={{
                 fontSize : 14,
                 marginBottom  :10,
                 fontFamily : FontStyle.BOLD,
                 color : Colors.ResColor.black
            }}>Artikel Menarik</Text>
            <View style={{
                flexDirection  :"row",
                flexWrap : "wrap",
                width : "100%",
                justifyContent : "space-between",
            }}>
            {data.map((item:ArticleDash)=>{
                return(
                    <View 
                    key={item.id}
                    style={{
                        width  :"45%",
                        marginBottom  :20,
                    }}>
                        <CardArtikle {...item}/>
                    </View>
                )
            })}
            </View>
        </View>
    )
}

export default ArtikelData;