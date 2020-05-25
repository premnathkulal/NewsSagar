import React, { Component } from 'react';
import { Tile } from 'react-native-elements';
import { View, Text, FlatList, ScrollView, Picker, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { NEWS_CHANNELS } from '../shared/newsChannels';
import { HostComponent } from "./HomeComponent";
import LiveNewsPage from './LiveNewsPageComponent';
import { Button } from 'react-native-paper';

class ChangeChannel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ChannelLink: '',
            language: ''
        }
    }

    
    render(){

        const renderMenuItem = ({item, index}) => {
            return(
                    <Tile
                        key={index}
                        title= {item.name}
                        titleStyle="center"
                        imageSrc={{uri: item.imgage}}
                        icon={{ name: 'play-circle', type: 'font-awesome', size: 50 }}
                        onPress = {() => 
                            { 
                                this.setState( {ChannelLink: item.url} )
                            }
                        }
                    />
            );
        }

        if(this.state.ChannelLink === ''){
            return(
                <View>
                    <Text />
                    <View style={styles.formRow}>
                        <Picker
                            style={styles.formItem}      
                            selectedValue={this.state.language}
                            onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}
                        >
                            <Picker.Item label='Select Language' value='English' />
                            <Picker.Item label='English' value='English' />
                            <Picker.Item label='Hindi' value='Hindi' />
                            <Picker.Item label='Kannada' value='Kannada' />
                            <Picker.Item label='Malayalam' value='Malayalam' />
                            <Picker.Item label='Tamil' value='Tamil' />
                            <Picker.Item label='Telugu' value='Telugu' />
                        </Picker>
                    </View>
                    <ScrollView>
                        <View style={styles.formRow}>
                            <FlatList
                                data={ 
                                    this.state.language=='' ? NEWS_CHANNELS : NEWS_CHANNELS.filter((newsP) => newsP.language === this.state.language)
                                }
                                renderItem = {renderMenuItem}
                                keyExtractor={item => item.id.toString()}
                            />
                        </View>
                        <Text />
                        <Text />
                    </ScrollView>
                </View>
            );
        }
        else{
            return(
                <View style={{flex: 1}}>
                    <Picker   
                        selectedValue={this.state.language}
                        onValueChange={(itemValue, itemIndex) => 
                            {
                                this.setState({language: itemValue}),
                                this.setState( {ChannelLink: ''} )
                            }
                        }
                    >
                        <Picker.Item label='Select Language' value='English' />
                        <Picker.Item label='English' value='English' />
                        <Picker.Item label='Hindi' value='Hindi' />
                        <Picker.Item label='Kannada' value='Kannada' />
                        <Picker.Item label='Malayalam' value='Malayalam' />
                        <Picker.Item label='Tamil' value='Tamil' />
                        <Picker.Item label='Telugu' value='Telugu' />
                    </Picker>
                    <LiveNewsPage channelUri={this.state.ChannelLink}/>
                </View>
            );
        }
    }
    
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: "center",
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formItem: {
        flex: 2
    }
})

export default ChangeChannel;