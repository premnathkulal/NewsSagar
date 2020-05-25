import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView, Picker, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { NEWS_PAPERS } from '../shared/newPapers';
import { HostComponent } from "./HomeComponent";

class ChangePaper extends Component {

    constructor(props) {
        super(props);
        this.state = {
            language: ''
        }
    }

    addMe = async (paperLink) =>  {
        try{
            await AsyncStorage.setItem('paperUri', paperLink)
        } 
        catch {
            
        }
    }
    
    render(){

        const renderMenuItem = ({item, index}) => {
            return(
                    <ListItem 
                        item= {item}
                        title= {item.name}
                        onPress = {() => 
                            { 
                                this.addMe(item.url),
                                this.props.navigation.navigate('Home');
                            }
                        } 
                    />
            );
        }

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
                                this.state.language=='' ? NEWS_PAPERS : NEWS_PAPERS.filter((newsP) => newsP.language === this.state.language)
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

export default ChangePaper;