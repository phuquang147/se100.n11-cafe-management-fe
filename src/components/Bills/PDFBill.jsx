import { Document, Font, Line, Page, StyleSheet, Svg, Text, View } from '@react-pdf/renderer';
import { printNumberWithCommas } from '~/utils/printNumerWithCommas';
import ReportTable from './BillTable';

Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf', fontWeight: 300 },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-lightitalic-webfont.woff',
      fontStyle: 'italic',
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf',
      fontWeight: 400,
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf',
      fontWeight: 500,
    },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 600 },
  ],
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 20,
    paddingBottom: 45,
    paddingHorizontal: 20,
    fontFamily: 'Roboto',
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 10,
    fontWeight: 'normal',
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
  },
  total: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 12,
    fontWeight: 'medium',
    marginTop: 6,
  },
  thanks: { fontSize: 10, textAlign: 'center' },
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 8,
    fontStyle: 'italic',
    paddingHorizontal: 20,
  },
});

function PDFBill({ receipt }) {
  const tableNames = receipt.tables.map((table) => table.name);

  return (
    <Document language="vietnamese">
      <Page style={styles.body} size="A6">
        <Text style={styles.title}>BROTHER COFFEE</Text>
        <Text style={styles.subTitle}>H??A ????N THANH TO??N</Text>
        <Text style={styles.description}>S???: {receipt._id.slice(0, 6).toUpperCase()}</Text>
        <View>
          <Text style={styles.description}>Ng??y: {new Date(receipt.createdAt).toLocaleString()}</Text>
          <Text style={styles.description}>B??n: {tableNames.join(' - ')}</Text>
        </View>
        <ReportTable products={receipt.products} />
        <View style={styles.total}>
          <Text>T???ng thanh to??n</Text>
          <Text>{printNumberWithCommas(receipt.totalPrice)} VN??</Text>
        </View>
        <Svg height={20} style={{ marginVertical: 4 }}>
          <Line x1="0" y1="0" x2="260" y2="0" strokeWidth={2} stroke="#000" />
        </Svg>
        <Text style={styles.thanks}>Tr??n tr???ng c???m ??n, h???n g???p l???i qu?? kh??ch</Text>
        <Text style={styles.footer} fixed>
          Wifi password: xincamon{'\n'}
          ?????a ch???: Khu ph??? 6 P, Th??? ?????c, Th??nh ph??? H??? Ch?? Minh
        </Text>
      </Page>
    </Document>
  );
}

export default PDFBill;
