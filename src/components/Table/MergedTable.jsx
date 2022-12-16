import { Card, Grid, Stack, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
// images
import tableImg from '~/assets/images/table.svg';
import tableUsedImg from '~/assets/images/table_used.svg';

export default function MergedTable({ table, onSelectTable, onDeselectTable }) {
  const [selected, setSelected] = useState(false);
  const theme = useTheme();

  const handleSelectTable = (table) => {
    if (selected) {
      onDeselectTable(table);
    } else {
      onSelectTable(table);
    }
    setSelected((prevState) => !prevState);
  };

  return (
    <>
      <Card
        sx={{
          padding: '12px',
          '&:hover': {
            cursor: 'pointer',
          },
          border: `1px solid ${selected && theme.palette.primary.main}`,
        }}
        onClick={() => handleSelectTable(table)}
      >
        <Stack rowGap={2}>
          <Stack direction="row" alignItems="start">
            <Grid container columnSpacing={2}>
              <Grid item xs={3}>
                <img src={table.state === 'Còn trống' ? tableImg : tableUsedImg} alt="" draggable="false" />
              </Grid>
              <Grid item xs={9}>
                <Stack>
                  <Typography variant="h6" sx={{ color: '#888' }}>
                    {table.name}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: '800', color: '#ffa16c' }}>
                    {table.state}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </Stack>
      </Card>
    </>
  );
}
