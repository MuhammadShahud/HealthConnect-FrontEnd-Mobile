import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Header} from '../../Components';
import {Colors} from '../../Styles';
import Past from './Past';
import {style} from './style';
import Upcoming from './Upcoming';

const Appointments = props => {
  const [activeButton, setActiveButton] = useState('upcoming');
  return (
    <View style={style.container}>
      <View style={{paddingHorizontal: 22}}>
        <Header 
        headerLeft={true}
        title={'My Appointments'} />
      </View>

      <View style={style.buttonContainer}>
        <TouchableOpacity
          onPress={() => setActiveButton('upcoming')}
          style={[
            style.button,
            {
              backgroundColor:
                activeButton === 'upcoming' ? Colors.LIGHT_GREEN : Colors.GRAY,
            },
          ]}>
          <Text style={{color: Colors.WHITE}}>Upcoming</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveButton('past')}
          style={[
            style.button,
            {
              backgroundColor:
                activeButton === 'past' ? Colors.LIGHT_GREEN : Colors.GRAY,
            },
          ]}>
          <Text style={{color: Colors.WHITE}}>Past</Text>
        </TouchableOpacity>
      </View>

      {activeButton === 'upcoming' ? <Upcoming /> : <Past />}
    </View>
  );
};

export default Appointments;
