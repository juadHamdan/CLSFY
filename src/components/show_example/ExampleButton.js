import React from 'react'
import AppTableModal from '../show_example/AppTableModal'
import Fab from '@mui/material/Fab';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';

const ExampleButton = ({buttonText, tableTitle, tableFeatures, tableItems, tableAdditionalText}) => {
    const [showModalTable, setShowModalTable] = React.useState(false)
    return (
        <>
            <Fab 
                style={{color: "inherit", backgroundColor: "inherit"}}
                onClick={() => setShowModalTable(true)}
                size="small" 
                variant="extended" 
                color="inherit">
            <InfoRoundedIcon sx={{ mr: 1 }} />
            {buttonText}
            </Fab>

            <AppTableModal 
                show={showModalTable}
                onHide={() => setShowModalTable(false)} 
                title={tableTitle}
                features={tableFeatures} 
                items={tableItems}
                additionalText={tableAdditionalText}
            />
        </>
    )
}

export default ExampleButton
