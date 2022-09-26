import {StyleSheet} from 'react-native';
import {Colors} from '../../Styles';

export const style = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.WHITE},
  cardsContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    paddingHorizontal: 8,
    backgroundColor: Colors.BG_GRAY,
    marginVertical: 8,
    alignItems: 'center'
  },
  addCardBtn: {
    paddingVertical: 16,
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.LIGHT_GREEN,
    flexDirection: 'row',
  },
  titleContainer: {marginHorizontal: 30, marginVertical: 15},
  title: {color: Colors.BLACK, fontWeight: 'bold', fontSize: 20},
  cardButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  cardText: {paddingHorizontal: 22, color: Colors.BLACK},
  addCardText: {textAlign: 'center', fontSize: 16, color: Colors.WHITE},
});
