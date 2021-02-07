import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Detail extends Component {
  render() {
    const data = this.props.route.params;

    const year = data.created_at.slice(0, 4);
    let month = data.created_at.slice(5, 7);
    const day = data.created_at.slice(8, 10);
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
    const date = `${day} ${months[parseInt(month)]} ${year}`;

    const newAmount = (t) => {
      const reverse = t.toString().split('').reverse().join('');
      let num = reverse.match(/\d{1,3}/g);
      num = num.join('.').split('').reverse().join('');
      return num;
    };

    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.title}>
            <Text style={styles.textBold}>ID TRANSAKSI:#{data.id} </Text>
            <Icon name="content-copy" size={20} color="#ea6e4e" />
          </View>
          <View style={styles.wrapper}>
            <Text style={styles.textBold}>detail transaksi</Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Home')}>
              <Text style={styles.buttonClose}>Tutup</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.line} />
          <View style={styles.bank}>
            <Text style={styles.textBold}>{data.sender_bank} </Text>
            <Icon name="arrow-forward" size={20} />
            <Text style={styles.textBold}> {data.beneficiary_bank}</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.col1}>
              <View style={styles.wrapper1}>
                <Text style={styles.textUpper}>{data.beneficiary_name}</Text>
                <Text style={styles.text}>{data.account_number}</Text>
              </View>
              <View style={styles.wrapper1}>
                <Text style={styles.textUpper}>BERITA TRANSFER</Text>
                <Text style={styles.text}>{data.remark}</Text>
              </View>
              <View>
                <Text style={styles.textUpper}>WAKTU DIBUAT</Text>
                <Text style={styles.text}>{date}</Text>
              </View>
            </View>
            <View style={styles.col2}>
              <View style={styles.wrapper1}>
                <Text style={styles.textUpper}>NOMINAL</Text>
                <Text style={styles.text}>Rp{newAmount(data.amount)}</Text>
              </View>
              <View>
                <Text style={styles.textUpper}>KODE UNIK</Text>
                <Text style={styles.text}>{data.unique_code}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
  },
  card: {
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    paddingVertical: 25,
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 25,
  },
  textBold: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  textUpper: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginBottom: 3,
    fontSize: 13,
  },
  text: {
    fontSize: 13,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 25,
  },
  buttonClose: {
    color: '#ea6e4e',
    fontSize: 14,
  },
  line: {
    borderWidth: 0.5,
    borderColor: 'lightgrey',
    width: '100%',
  },
  bank: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginVertical: 25,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 25,
  },
  col1: {
    width: '60%',
  },
  col2: {
    width: '40%',
  },
  wrapper1: {
    marginBottom: 25,
  },
});
