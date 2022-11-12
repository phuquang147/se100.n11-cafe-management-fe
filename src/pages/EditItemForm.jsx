// material
import { Card, Container, Stack, Typography } from '@mui/material';
import { useLocation } from 'react-router';

// components

export default function EditItemForm({ title, Form }) {
  const location = useLocation();

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
      </Stack>

      <Card sx={{ padding: 4 }}>
        <Form data={location.state} />
      </Card>
    </Container>
  );
}
