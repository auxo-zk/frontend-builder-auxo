import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { TCampaignData } from 'src/services/campaign/api';
import CardCampaign from '../../common/CardCampaign';

export default function LatestFundingCampaigns({ latestFundingCampaigns }: { latestFundingCampaigns: TCampaignData[] }) {
    return (
        <Box mt={5}>
            <Box sx={{ display: 'flex', placeItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6">Latest Funding Campaigns</Typography>
                <Button variant="contained">More Campaigns</Button>
            </Box>

            <Box mt={2.5}>
                <Grid container spacing={3.5}>
                    {latestFundingCampaigns.map((item, index) => {
                        return (
                            <Grid key={'lastestcampain' + index + item.name} item xs={12} xsm={6}>
                                <CardCampaign data={item}></CardCampaign>
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
        </Box>
    );
}
