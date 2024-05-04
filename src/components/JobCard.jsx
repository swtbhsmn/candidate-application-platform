import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Box, Button, Chip, Link } from '@mui/material';
import BoltIcon from '@mui/icons-material/Bolt';

export default function JobCard(props) {
    function capitalizeWords(inputString) {
        let words = inputString?.split(" ");
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
        }
        return words.join(" ");
    }

    const { jdUid, jdLink, jobDetailsFromCompany, maxJdSalary, minJdSalary, salaryCurrencyCode, location, minExp, maxExp, jobRole, companyName,logoUrl } = props?.job
    return (
        <Card sx={{ maxWidth: 345 }}>
            <Box sx={{ p: 2 }}><Chip label={`⏳ Posted ${Math.floor(Math.random() * 20)} days ago`} sx={{ p: 1, fontSize: 10 }} /></Box>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" src={logoUrl}/>
                }
                title={companyName}
                subheader={(<React.Fragment>
                    <Typography variant="subtitle2">{capitalizeWords(jobRole)}</Typography>
                    <Typography variant="caption">{capitalizeWords(location)}</Typography>
                </React.Fragment>)}
            />
            <CardContent sx={{ marginTop: -3 }}>
                <Typography sx={{ position: "relative" }} variant="subtitle2">Estimated Salary: {salaryCurrencyCode} {minJdSalary} - {maxJdSalary} LPA <span style={{ marginLeft: 5, position: "absolute" }}> ✅</span></Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>About Company:</Typography>
                <Typography variant="subtitle2">
                    {jobDetailsFromCompany?.substring(0, 224)}...
                    <Box>
                        <Typography sx={{ opacity: .3 }} variant="subtitle2">{jobDetailsFromCompany?.substring(224, 350)}</Typography>
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", opacity: .7 }}>
                            <Link href={jdLink} target="_blank" sx={{ textTransform: "none", mt: -1, textDecoration: "none", cursor: "pointer" }}>View Jobs</Link></Box>
                    </Box>
                </Typography>
                <Box sx={{ height: 50 }}>
                    {minExp ? (
                        <>
                            <Typography variant="body2" >Minimum Experience</Typography>
                            <Typography variant="caption" >{minExp} Years</Typography>
                        </>)
                        : null}
                </Box>
            </CardContent>
            <CardActions disableSpacing>
                <Button fullWidth variant="contained" startIcon={<BoltIcon sx={{ color: "#fd0" }} />} sx={{ textTransform: "none" }}>Easy Apply</Button>
            </CardActions>
        </Card>
    );
}