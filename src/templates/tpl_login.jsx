import React, { useState } from 'react';
import Box from '@mui/material/Box';

const Tpl_login = (props) => {
    const { page } = props;

    return (
        <>
            <Box
                style={{overflowY: 'hidden' }}
                className="position-relative h-100 border-radius-lg">
                {page}

            </Box>
        </>
    );
};

export default Tpl_login;