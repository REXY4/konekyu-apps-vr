import { SafeAreaView, ScrollView, View, TouchableOpacity, Text } from "react-native"
import LocationUseCase from "../../use-case/location.usecase";
import { GetLocationEntities, GetMemberLocation } from "../../entities/location.entities";
import CardListMap from "./components/CardListMap";

const ListLocationScreen = ()=>{
    const {locationData} = LocationUseCase();
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{
                }}>
                    {locationData && locationData.map((item:GetMemberLocation)=>{
                        return (
                            <View style={{
                                marginBottom : 2,
                            }}>
                                <CardListMap {...item}/>
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ListLocationScreen;