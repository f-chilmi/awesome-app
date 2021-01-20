/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Spinner} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import getAction from './redux/action/data';

const Main = () => {
  const dispatch = useDispatch();
  const [refreshing, setRefresh] = useState(false);
  const [modal, setModal] = useState(false);
  const data = useSelector((state) => state.data);
  const isLoading = useSelector((state) => state.isLoading);

  useEffect(() => {
    dispatch(getAction.getData());
  }, []);

  const add = () => {
    dispatch(getAction.addData());
  };

  const up = (index, item) => {
    dispatch(getAction.updateData(index, item));
  };

  const detail = () => {
    setModal(true);
  };

  const refreshData = () => {
    dispatch(getAction.deleteData());
    dispatch(getAction.getData());
  };

  const renderItem = ({item, index}) => (
    <TouchableOpacity style={styles.card} onPress={detail}>
      <View style={styles.num}>
        <Text style={styles.numText}> {item.id} </Text>
      </View>
      <View style={styles.text}>
        <Text> {item.joke} </Text>
      </View>
      {index === 0 && (
        <View style={styles.button1}>
          <Text>1st</Text>
        </View>
      )}
      {index !== 0 && (
        <TouchableOpacity
          onPress={() => up(index, item)}
          style={styles.buttonUp}>
          {/* <Icon name="arrow-up" size={25} /> */}
          <Text>Up</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Who's on Top?</Text>
      {isLoading && <Spinner />}
      {data == undefined ? (
        <Spinner />
      ) : (
        <>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            refreshing={refreshing}
            onRefresh={refreshData}
          />
          {data.length <= 4 && (
            <View style={styles.buttonWrapper}>
              <TouchableOpacity onPress={add} style={styles.button}>
                <Text>Add more data</Text>
              </TouchableOpacity>
            </View>
          )}
          <Modal transparent animationType="slide" visible={modal}>
            <View style={styles.modalWrap}>
              <View style={styles.modal}>
                <Text>Omo, you click me! ^^</Text>
                <TouchableOpacity
                  style={styles.click}
                  onPress={() => setModal(false)}>
                  <Text>Click me again to dismiss</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFF7EC',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    color: '#89687d',
    marginBottom: 15,
  },
  card: {
    width: '100%',
    backgroundColor: '#FCD8CC',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#89687d',
    borderRadius: 18,
    padding: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  num: {
    width: 30,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numText: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    width: '70%',
    marginRight: 10,
  },
  buttonUp: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: '#89687d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button1: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: '#FFF7EC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#89687d',
  },
  buttonWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 30,
    width: '50%',
    height: 40,
    backgroundColor: '#a7e0e9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalWrap: {
    backgroundColor: 'white',
    opacity: 0.8,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    opacity: 1,
    width: '80%',
    height: 90,
    padding: 20,
    backgroundColor: '#89687d',
    borderRadius: 15,
    color: '#FFF7EC',
  },
  click: {
    marginTop: 8,
  },
});

export default Main;
