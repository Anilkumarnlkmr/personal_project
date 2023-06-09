import * as React from 'react';
import './App.css';
// import Raw from "../src/component/raw";
import ColumnGroupingTable from './dynamicTable.tsx';
import { Tabs, Box, Tab, Modal, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

interface Column {
    id: 'ConsumedQuantity' | 'Cost' | "Date" | 'Location' | "MeterCategory" | "ResourceGroup" | 'ResourceLocation' | "ServiceName" | "Tag" | "UnitOfMeasure";
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 363,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


function Tables(props: TabPanelProps) {
    const [open, setOpen] = React.useState(false)
    const [data, setData] = React.useState([]);
    const [list, setList] = React.useState([])
    const [listValue, setListValue] = React.useState('')
    const [col,setCol] = React.useState( [
        { id: "ConsumedQuantity", label: "Consumed Quantity", minWidth: 100 },
        { id: "Cost", label: "Cost", minWidth: 100 ,format: (value: number) => value.toFixed(2)},
        {
            id: "Date",
            label: "Date",
            minWidth: 100,
            // align: "right",
        },
        {
            id: "Location",
            label: "Location",
            minWidth: 100,
            // align: "right",
            format: (value: number) => value.toLocaleString("en-US")
        },
        {
            id: "MeterCategory",
            label: "Meter Category",
            minWidth: 100,
            // align: "right",
            format: (value: number) => value.toFixed(2)
        },
        {
            id: "ResourceGroup",
            label: "Resource Group",
            minWidth: 100,
            // align: "right",
            format: (value: number) => value.toFixed(2)
        },
        {
            id: "ResourceLocation",
            label: "Resource Location",
            minWidth: 100,
            // align: "right",
            format: (value: number) => value.toFixed(2)
        },
        {
            id: "ServiceName",
            label: "Service Name",
            minWidth: 100,
            // align: "right",
            format: (value: number) => value.toFixed(2)
        },
        {
            id: "Tags",
            label: "Tags",
            minWidth: 100,
            // align: "right",
            format: ''
        },
        {
            id: "UnitOfMeasure",
            label: "Unit Of Measure",
            minWidth: 100,
            // align: "right",
            format: (value: number) => value.toFixed(2)
        }
    ])


    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        // setCol(rowcol)
        setOpen(newValue ? true : false)
    };

    React.useEffect(() => {
        // if(open === true ) {
        switch (value) {
            case 0:
                fetch("https://engineering-task.elancoapps.com/api/raw")
                    .then(res => res.json())
                    .then(json => setData(json))
            case 1:
                fetch("https://engineering-task.elancoapps.com/api/applications")
                    .then(res => res.json())
                    .then(json => setList(json))
                break;
            case 2:
                fetch("https://engineering-task.elancoapps.com/api/resources")
                    .then(res => res.json())
                    .then(json => setList(json))

            default:
                break;
        }
        // }
    }, [value])

    React.useEffect(()=>{        
        if(value === 1) {
            fetch(`https://engineering-task.elancoapps.com/api/applications/${listValue}`)
                    .then(res => res.json())
                    .then(json => setData(json))
        } else if(value === 2) {
            fetch(`https://engineering-task.elancoapps.com/api/resources/${listValue}`)
            .then(res => res.json())
            .then(json => setData(json))
        }
    },[listValue])

    return (<>
        <div className="App">
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Raw" />
                    <Tab label="Application" />
                    <Tab label="Recources" />
                </Tabs>
            </Box>
            {data.length && <ColumnGroupingTable columnProps={col ? col : ''} data={data} listType={value ? listValue: ''} tableType={value ? 'Raw' : value === 1 ? 'Application' : 'Resources'} />}
        </div>
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <List sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 544,
                    '& ul': { padding: 0 },
                }}>
                    {list && list.map((value) => (
                        <ListItem
                            key={value}
                            disableGutters
                            onClick={()=>{setListValue(value)
                                setOpen(false)}}
                            secondaryAction={
                                <IconButton aria-label="comment">
                                    {/* <CommentIcon /> */}
                                </IconButton>
                            }
                        >
                            {value}
                            {/* <ListItemText primary={value}    /> */}
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Modal>
    </>
    );
}

export default Tables;
