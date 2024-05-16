import { Dimensions, StyleSheet, View } from "react-native";
import { MyLocationEntities } from "../../../entities/location.entities";
import LocationUseCase from "../../../use-case/location.usecase";

const {width} = Dimensions.get("screen");

interface Props {
    myLocation : MyLocationEntities
}

const MapDirection = ({myLocation}:Props) =>{
  const {detailLocation} = LocationUseCase();
  
    return(
             <View style={styles.container}>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: "100%",
      width: width,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
   });


export default MapDirection;