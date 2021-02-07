/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  RefreshControl,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';
import {Spinner} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import getAction from './redux/action/data';
import {Radio} from 'native-base';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const [refreshing, setRefresh] = useState(false);
  const [value, onChangeText] = useState('');
  const [modal, setModal] = useState(false);
  const [sort, setSort] = useState('');
  const [sortText, setSortText] = useState('URUTKAN');
  const dataArr = useSelector((state) => state.dataArr);
  let [newData, setData] = useState(dataArr);
  const loading = useSelector((state) => state.isLoading);

  const date = (item) => {
    const year = item.slice(0, 4);
    let month = item.slice(5, 7);
    const day = item.slice(8, 10);
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const newDate = `${day} ${months[parseInt(month)]} ${year}`;
    return newDate;
  };

  useEffect(() => {
    dispatch(getAction.getData());
    setData(dataArr);
  }, []);

  const onRefresh = () => {
    dispatch(getAction.getData());
    setSortText('URUTKAN');
  };

  const detail = (item) => {
    navigation.navigate('Detail', item);
  };

  const resetSort = () => {
    setSort('');
    setSortText('URUTKAN');
    setModal('');
  };

  const searchBy = (t) => {
    onChangeText(t);
    const sort1 = dataArr.filter((item) => item.beneficiary_name.includes(t));
    const sort2 = dataArr.filter((item) =>
      item.beneficiary_bank.includes(t.toLowerCase()),
    );
    const sort4 = dataArr.filter((item) =>
      item.sender_bank.includes(t.toLowerCase()),
    );
    const sort3 = dataArr.filter((item) => item.amount.toString().includes(t));
    if (sort1.length) {
      setData(sort1);
    }
    if (sort2.length) {
      setData(sort2);
    }
    if (sort3.length) {
      setData(sort3);
    }
    if (sort4.length) {
      setData(sort4);
    }
  };

  const atoz = () => {
    setSort('atoz');
    setSortText('Nama A-Z');
    const sort1 = newData.sort((a, b) =>
      a.beneficiary_name > b.beneficiary_name
        ? 1
        : b.beneficiary_name > a.beneficiary_name
        ? -1
        : 0,
    );
    setData(sort1);
    setModal(false);
  };

  const ztoa = () => {
    setSort('ztoa');
    setSortText('Nama Z-A');
    const sort1 = newData.sort((a, b) =>
      a.beneficiary_name > b.beneficiary_name
        ? -1
        : b.beneficiary_name > a.beneficiary_name
        ? 1
        : 0,
    );
    setData(sort1);
    setModal(false);
  };

  const newest = () => {
    setSort('newest');
    setSortText('Terbaru');
    const sort1 = newData.sort((a, b) =>
      a.created_at > b.created_at ? -1 : b.created_at > a.created_at ? 1 : 0,
    );
    setData(sort1);
    setModal(false);
  };

  const oldest = () => {
    setSort('oldest');
    setSortText('Terlama');
    const sort1 = newData.sort((a, b) =>
      a.created_at > b.created_at ? 1 : b.created_at > a.created_at ? -1 : 0,
    );
    setData(sort1);
    setModal(false);
  };

  const newAmount = (t) => {
    const reverse = t.toString().split('').reverse().join('');
    let num = reverse.match(/\d{1,3}/g);
    num = num.join('.').split('').reverse().join('');
    return num;
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        <Icon name="search" size={25} color="grey" />
        <TextInput
          style={styles.search}
          onChangeText={(text) => searchBy(text)}
          editable={true}
          value={value}
          placeholder="Cari nama, bank, atau nominal"
        />
        <TouchableOpacity style={styles.sort} onPress={() => setModal(true)}>
          <Text style={styles.sortText}>{sortText}</Text>
          <Icon style={styles.sortIcon} name="keyboard-arrow-down" size={25} />
        </TouchableOpacity>
      </View>

      {loading && <Spinner />}
      {newData.length < 1 && <Spinner />}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {newData.map((item) => {
          return (
            <>
              {item.status === 'SUCCESS' && (
                <TouchableOpacity
                  onPress={() => detail(item)}
                  style={styles.card}>
                  <View style={styles.borderColoredSuccess} />
                  <View style={styles.content}>
                    <View style={styles.leftContent}>
                      <View style={styles.bank}>
                        <Text style={styles.textBold}>{item.sender_bank} </Text>
                        <Icon name="arrow-forward" size={20} />
                        <Text style={styles.textBold}>
                          {' '}
                          {item.beneficiary_bank}
                        </Text>
                      </View>
                      <Text style={styles.textUpper}>
                        {item.beneficiary_name}
                      </Text>
                      <View style={styles.bank}>
                        <Text style={styles.textNominal}>
                          Rp{newAmount(item.amount)}{' '}
                        </Text>
                        <Icon
                          name="fiber-manual-record"
                          size={10}
                          color="black"
                        />
                        <Text> {date(item.created_at)}</Text>
                      </View>
                    </View>
                    <View style={styles.statusSuccess}>
                      <Text style={styles.whiteText}>Berhasil</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              {item.status === 'PENDING' && (
                <View style={styles.card}>
                  <View style={styles.borderColored} />
                  <View style={styles.content}>
                    <View style={styles.leftContent}>
                      <View style={styles.bank}>
                        <Text style={styles.textBold}>{item.sender_bank} </Text>
                        <Icon name="arrow-forward" size={20} />
                        <Text style={styles.textBold}>
                          {' '}
                          {item.beneficiary_bank}
                        </Text>
                      </View>
                      <Text style={styles.textUpper}>
                        {item.beneficiary_name}
                      </Text>
                      <View style={styles.bank}>
                        <Text style={styles.textNominal}>
                          Rp{newAmount(item.amount)}{' '}
                        </Text>
                        <Icon
                          name="fiber-manual-record"
                          size={10}
                          color="black"
                        />
                        <Text> {date(item.created_at)}</Text>
                      </View>
                    </View>
                    <View style={styles.status}>
                      <Text>Pengecekan</Text>
                    </View>
                  </View>
                </View>
              )}
            </>
          );
        })}
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modal}
        style={styles.modal}
        onRequestClose={() => {
          setModal(false);
        }}>
        <View style={styles.modalBg}>
          <View style={styles.modalWrapper}>
            <View style={styles.radioWrapper}>
              <Radio
                selectedColor="#ea6e4e"
                color="#ea6e4e"
                selected={sort === '' ? true : false}
                onPress={resetSort}
              />
              <Text style={styles.textSorting}>URUTKAN</Text>
            </View>
            <View style={styles.radioWrapper}>
              <Radio
                selectedColor="#ea6e4e"
                color="#ea6e4e"
                selected={sort === 'atoz' ? true : false}
                onPress={atoz}
              />
              <Text style={styles.textSorting}>Nama A-Z</Text>
            </View>
            <View style={styles.radioWrapper}>
              <Radio
                selectedColor="#ea6e4e"
                color="#ea6e4e"
                selected={sort === 'ztoa' ? true : false}
                onPress={ztoa}
              />
              <Text style={styles.textSorting}>Nama Z-A</Text>
            </View>
            <View style={styles.radioWrapper}>
              <Radio
                selectedColor="#ea6e4e"
                color="#ea6e4e"
                selected={sort === 'newest' ? true : false}
                onPress={newest}
              />
              <Text style={styles.textSorting}>Tanggal terbaru</Text>
            </View>
            <View style={styles.radioWrapper}>
              <Radio
                selectedColor="#ea6e4e"
                color="#ea6e4e"
                selected={sort === 'oldest' ? true : false}
                onPress={oldest}
              />
              <Text style={styles.textSorting}>Tanggal terlama</Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchWrapper: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 5,
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 50,
  },
  search: {
    width: '65%',
    fontSize: 13,
  },
  sort: {
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sortText: {
    color: '#ea6e4e',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 13,
  },
  sortIcon: {
    color: '#ea6e4e',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  card: {
    height: 100,
    paddingRight: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
  },
  borderColored: {
    backgroundColor: '#ea6e4e',
    width: 7,
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  borderColoredSuccess: {
    backgroundColor: '#1ebea5',
    width: 7,
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10,
  },
  leftContent: {
    // backgroundColor: 'yellow',
  },
  status: {
    borderWidth: 1,
    borderColor: '#ea6e4e',
    borderRadius: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  statusSuccess: {
    backgroundColor: '#1ebea5',
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  whiteText: {
    color: '#fff',
    fontSize: 13,
  },
  textBold: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  textUpper: {
    textTransform: 'uppercase',
    marginBottom: 3,
    fontSize: 13,
  },
  textNominal: {
    fontSize: 13,
  },
  bank: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  modal: {
    padding: 25,
  },
  modalBg: {
    opacity: 0.9,
    backgroundColor: 'grey',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalWrapper: {
    width: '75%',
    height: '50%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderRadius: 10,
    paddingHorizontal: '5%',
  },
  radioWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: '5%',
  },
  textSorting: {
    fontSize: 14,
    marginLeft: '5%',
  },
});

export default Home;
