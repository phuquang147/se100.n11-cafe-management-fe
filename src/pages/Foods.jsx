// @mui
import { Container, Stack, Typography } from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="xl">
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h4">Hello user</Typography>
      </Stack>
    </Container>
  );
}
