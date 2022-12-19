import { Document, Line, Page, StyleSheet, Svg, Text, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'red',
  },
});

function PDFBill() {
  return (
    <Document language="vietnamese">
      <Page style={styles.body} size="A4">
        <Text style={styles.header}>Coffee Management</Text>
        <Svg height="20" width="520">
          <Line x1="0" y1="0" x2="520" y2="0" strokeWidth={2} stroke="grey" />
        </Svg>
        <View>
          <Text>Ngày: 19/12/2022</Text>
          <Text>Bàn: Bàn 1</Text>
        </View>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem ullam maxime libero vel? Pariatur
          voluptatum quis accusantium repellendus, quisquam aliquam?
        </Text>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          fixed
        />
      </Page>
    </Document>
  );
}

export default PDFBill;
