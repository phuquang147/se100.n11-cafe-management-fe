// material
import { Card, Container, Stack, Typography } from '@mui/material';

// components
import { MetaTags } from 'react-meta-tags';

export default function EditItemForm({ title, Form }) {
  return (
    <Container>
      <MetaTags>
        <title>Brother Coffee - {title}</title>
      </MetaTags>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
      </Stack>

      <Card sx={{ padding: 4 }}>
        <Form />
      </Card>
    </Container>
  );
}
