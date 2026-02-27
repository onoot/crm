import React, { useContext, useEffect, useState } from 'react';
import PageHeader from '../components/nav/PageHeader'
import Asaid from '../components/nav/Asaid'
import { StorageContext } from '../contex';
import Box from '@mui/material/Box';

const Tpl_main = (props) => {
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => setOpen(!open);
    const { page } = props;

    return (
        <>
            <Box component="main">
                <Box sx={{ flexGrow: 1, p: 3, mt: 8 }}>
                    <PageHeader open={open} setOpen={setOpen}/>
                    <Asaid position="fixed" open={open} setOpen={setOpen}/>
                </Box>
                {page}

            </Box>
        </>

    );
};

export default Tpl_main;