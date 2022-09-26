import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Header} from '../../Components';
import {Colors} from '../../Styles';
import Packages from './Packages';
import History from './History';
import {style} from './style';

const index = () => {
  const [activeButton, setActiveButton] = useState('package');
  return (
    <View style={style.container}>
      <View style={{paddingHorizontal: 22}}>
        <Header title={'Subscription'} headerLeft={true} />
      </View>

      <View style={style.buttonContainer}>
        <TouchableOpacity
          onPress={() => setActiveButton('package')}
          style={[
            style.button,
            {
              backgroundColor:
                activeButton === 'package' ? Colors.LIGHT_GREEN : Colors.GRAY,
            },
          ]}>
          <Text style={{color: Colors.WHITE}}>Packages</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveButton('history')}
          style={[
            style.button,
            {
              backgroundColor:
                activeButton === 'history' ? Colors.LIGHT_GREEN : Colors.GRAY,
            },
          ]}>
          <Text style={{color: Colors.WHITE}}>History</Text>
        </TouchableOpacity>
      </View>

      {activeButton === 'package' ? <Packages /> : <History />}
    </View>
  );
};

export default index;
