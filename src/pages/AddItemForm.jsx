// material
import { Card, Container, Stack, Typography } from '@mui/material';
// components

export default function AddItemForm({ title, form }) {
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
      </Stack>

      <Card sx={{ padding: 4 }}>{form}</Card>
    </Container>
  );
}
