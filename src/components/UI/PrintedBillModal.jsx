import { Box, Button, Dialog, DialogContent } from '@mui/material';
import MuiTypography from '@mui/material/Typography';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFBill from '../Bills/PDFBill';

export default function PrintedBillModal({ receipt, content, handleClose, open }) {
  return (
    <Dialog open={open} sx={{ p: 4 }}>
      <DialogContent>
        <MuiTypography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
          {content}
        </MuiTypography>
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <Button onClick={handleClose} color="error" sx={{ mr: 1 }}>
            Huỷ
          </Button>
          <PDFDownloadLink document={<PDFBill receipt={receipt} />} fileName="bill">
            {({ blob, url, loading, error }) =>
              loading ? (
                <Button type="submit" variant="outlined">
                  Loading...
                </Button>
              ) : (
                <Button type="submit" variant="outlined" onClick={handleClose}>
                  In
                </Button>
              )
            }
          </PDFDownloadLink>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
