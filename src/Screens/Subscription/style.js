import {StyleSheet} from 'react-native';
import {Colors} from '../../Styles';

export const style = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.WHITE},
  cardContainer: {
    width: '90%',
    marginTop: 12,
    alignSelf: 'center',
    paddingVertical: 20,
  },
  titleContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: Colors.WHITE,
    zIndex: 10000,
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    color: Colors.LIGHT_GREEN,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardBody: {
    flex: 1,
    backgroundColor: Colors.LIGHT_GREEN,
    borderRadius: 8,
    paddingVertical: 14,
  },
  plan: {
    paddingVertical: 16,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.WHITE,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  price: {fontSize: 20, fontWeight: 'bold', color: Colors.WHITE},
  subscribeBtn: {
    borderRadius: 8,
    height: 45,
    paddingHorizontal: 14,
    justifyContent: 'center',
    backgroundColor: Colors.WHITE,
  },
  subscribedBtn: {
    borderRadius: 8,
    height: 45,
    paddingHorizontal: 14,
    justifyContent: 'center',
    backgroundColor: Colors.GRAY,
  },
  buttonContainer: {
    width: '70%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  button: {
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 22,
  },
  historyCard: {
    backgroundColor: Colors.LIGHT_GREEN,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 8,
    marginTop: 16,
    justifyContent: 'center',
  },
});
