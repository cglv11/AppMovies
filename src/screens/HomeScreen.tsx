import React, { useContext, useEffect } from 'react'
import { ActivityIndicator, Dimensions, Text, View, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ImageColors from 'react-native-image-colors'

import Carousel from 'react-native-snap-carousel';

import { HorizontalSlider } from '../components/HorizontalSlider';

import { MoviePoster } from '../components/MoviePoster';
import { useMovies } from '../hooks/useMovies';
import { GradientBackgroud } from '../components/GradientBackgroud';
import { getImageColors } from '../helpers/getColor';
import { GradientContext } from '../context/GradientContext';

const { width: windowWidth } =  Dimensions.get('window')

export const HomeScreen = () => {

    const { nowPlaying, popular, topRated, upcoming, isLoading } = useMovies();
    const { top } = useSafeAreaInsets();
    const { setMainColors } = useContext( GradientContext )

    const getPosterColors = async ( index: number ) => {
        
        const movie = nowPlaying[index]
        const uri =  `https://image.tmdb.org/t/p/w500${ movie.poster_path }`;

        const [ primary = 'blue', secondary = 'grey' ] = await getImageColors( uri );

        setMainColors({ primary, secondary})
        
    }

    useEffect(() => {
        if( nowPlaying.length > 0 ) {
            getPosterColors(0)
        }
    }, [ nowPlaying ])

    if ( isLoading ) {
        return (
            <View style= {{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator color="red" size= { 40 }/>
            </View>
        )
    }

    return (
        <GradientBackgroud>

            <ScrollView>

                <View style={{marginTop: top + 20 }}>
    
                    {/* Carousel principal     */}
                    <View style = {{
                        height: 440,
                    }}>
                        <Carousel
                            data = { nowPlaying }
                            renderItem = { ({ item }: any) => <MoviePoster movie={ item } /> }
                            sliderWidth = { windowWidth }
                            itemWidth = { 300 }
                            inactiveSlideOpacity= {0.9}
                            onSnapToItem= { index => getPosterColors( index )}
                        />
                    </View>

                    <HorizontalSlider title= "Pupulares" movies={ popular } />
                    <HorizontalSlider title= "Top Rated" movies={ topRated } />
                    <HorizontalSlider title= "Upcoming" movies={ upcoming } />

                </View>

            </ScrollView>

        </GradientBackgroud>
    )   
}



