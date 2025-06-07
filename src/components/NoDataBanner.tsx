import { Stack, Typography } from '@mui/material'
import React from 'react'

interface PropType {
    text: string,
}

const NoDataBanner = (props: PropType) => {
    return (
        <div>
            <Typography variant='h3'>{props.text}</Typography>
        </div>
    )
}

export default NoDataBanner
