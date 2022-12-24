import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { printNumberWithCommas } from '~/utils/printNumerWithCommas';

const styles = StyleSheet.create({
  table: {
    width: '100%',
    border: '1px solid #000',
    borderRight: 0,
    fontSize: 8,
    marginTop: 10,
  },
  header: {
    borderTop: 'none',
  },
  bold: {
    fontWeight: 'bold',
  },
  textCenter: {
    textAlign: 'center',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    borderTop: '1px solid #000',
  },
  row1: {
    width: '10%',
    borderRight: '1px solid #000',
    padding: 8,
  },
  row2: {
    width: '40%',
    borderRight: '1px solid #000',
    padding: 8,
  },
  row3: {
    width: '10%',
    borderRight: '1px solid #000',
    padding: 8,
  },
  row4: {
    width: '20%',
    borderRight: '1px solid #000',
    padding: 8,
  },
  row5: {
    width: '20%',
    borderRight: '1px solid #000',
    padding: 8,
  },
});

const ReportTable = ({ products }) => {
  return (
    <View style={styles.table}>
      <View style={[styles.row, styles.bold, styles.header]}>
        <Text style={[styles.row1, styles.textCenter]}>STT</Text>
        <Text style={[styles.row2, styles.textCenter]}>Tên món</Text>
        <Text style={[styles.row3, styles.textCenter]}>SL</Text>
        <Text style={[styles.row4, styles.textCenter]}>ĐG</Text>
        <Text style={[styles.row5, styles.textCenter]}>TT</Text>
      </View>
      {products.map((product, i) => (
        <View key={i} style={styles.row} wrap={false}>
          <Text style={[styles.row1, styles.textCenter]}>{i + 1}</Text>
          <Text style={[styles.row2, styles.textCenter]}>{product.name}</Text>
          <Text style={[styles.row3, styles.textCenter]}>{product.quantity}</Text>
          <Text style={[styles.row4, styles.textCenter]}>{printNumberWithCommas(product.price)}</Text>
          <Text style={[styles.row5, styles.textCenter]}>
            {printNumberWithCommas(product.quantity * product.price)}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default ReportTable;
