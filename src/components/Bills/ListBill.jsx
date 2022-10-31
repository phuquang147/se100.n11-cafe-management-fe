import { Badge, Card, Stack, Typography } from '@mui/material';

export default function ListBill(props) {
  return (
    <Stack direction="column" spacing={'12px'}>
      {[...Array(10)].map((item, index) => (
        <Card key={index} sx={{ p: 2, cursor: 'pointer' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="h5">Order #35</Typography>
              <Badge color="primary" variant="dot" />
              <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                Active
              </Typography>
            </Stack>
            <Typography variant="subtitle1">$42</Typography>
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="body1">Table 2B</Typography>
              <Badge color="info" variant="dot" />
              <Typography>2 Guests</Typography>
            </Stack>
            <Typography>{new Date().toLocaleTimeString()}</Typography>
          </Stack>
        </Card>
      ))}
    </Stack>
  );
}
