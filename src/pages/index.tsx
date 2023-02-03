import { Card, CardHeader, Grid } from '@mui/material';
import { Layout } from '../components/layouts';
import { EntryList, NewEntry } from '../components/ui';

export default function HomePage() {
  return (
    <Layout title="Home - OpenJira">
      <Grid container spacing={2}>

        <Grid item xs={12} md={4}>
          <Card sx={{ minHeight: 'calc(100vh - 80px)', padding: '5px' }}>
            <CardHeader title="Pending Activities" />
            <NewEntry />
            <EntryList status='pending' />
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ minHeight: 'calc(100vh - 80px)', padding: '5px' }}>
            <CardHeader title="Activities in Progress" />
            <EntryList status='in-progress' />
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ minHeight: 'calc(100vh - 80px)', padding: '5px' }}>
            <CardHeader title="Completed Activities" />
            <EntryList status='finished' />
          </Card>
        </Grid>

      </Grid>
    </Layout >
  )
}
