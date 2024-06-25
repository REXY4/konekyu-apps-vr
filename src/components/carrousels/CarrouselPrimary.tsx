import * as React from 'react';
import { Dimensions, Text, View , Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { DashboardSlider } from '../../entities/dashboard.entities';
import { } from 'react-native-svg';
import { useSharedValue } from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
    data : Array<DashboardSlider>
}

function CarrouselPrimary({data}:Props) {
    const width = Dimensions.get('window').width;
    return (
        <View style={{ flex: 1 }}>
            <Carousel
                loop
                               width={width}
                               height={width / 2}
                               autoPlay={true}
                               data={data}
                               mode='parallax'
                               defaultScrollOffsetValue={useSharedValue(10)}
                               scrollAnimationDuration={3000}
                               panGestureHandlerProps={{
                                   activeOffsetX: [-20, 10],
                                   activeOffsetY: [-20, 10],
                                 }}
                renderItem={({ item,index }) => {
                 return <View
                 key={String(item.id)}
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <TouchableOpacity>
                        <Image 
                        resizeMode='contain'
                        source={{uri :item.mainImage }} style={{
                            width : "100%",
                            height : 250,
                            objectFit : "fill",
                            borderRadius : 20,
                        }}/>
                         </TouchableOpacity>
                    </View>
                }}
            />
        </View>
    );
}

export default React.memo(CarrouselPrimary);