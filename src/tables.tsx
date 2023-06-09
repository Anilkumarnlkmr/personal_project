import * as React from 'react';
import './App.css';
// import Raw from "../src/component/raw";
import ColumnGroupingTable from './dynamicTable.tsx';
import { Tabs, Box, Tab, Modal, List, ListItem, IconButton } from '@mui/material';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

interface Column {
    id: 'ConsumedQuantity' | 'Cost' | "Date" | 'Location' | "MeterCategory" | "ResourceGroup" | 'ResourceLocation' | "ServiceName" | "Tags" | "UnitOfMeasure";
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
 interface DataArray {
    ConsumedQuantity : String,
    Cost: String,
    Date : String,
    InstanceId : String,
    Location : String,
    MeterCategory:String,
    ResourceGroup:String,
    ResourceLocation:String,
    ServiceName:String,
    Tags:{},
    UnitOfMeasure:String,
 }

 
function Tables() {
    const [value, setValue] = React.useState<number>(0);
    const [open, setOpen] = React.useState<boolean>(false)
    const [data, setData] = React.useState<DataArray[]>([]);
    const [list, setList] = React.useState<string[]>([])
    const [listValue, setListValue] = React.useState<string>('')
    const [col, setCol] = React.useState<Column[]>([
        { id: "ConsumedQuantity", label: "Consumed Quantity", minWidth: 100 },
        { id: "Cost", label: "Cost", minWidth: 100, format: (value: number) => value.toFixed(2) },
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
            minWidth: 170,
            // align: "right",
        },
        {
            id: "UnitOfMeasure",
            label: "Unit Of Measure",
            minWidth: 100,
            // align: "right",
            format: (value: number) => value.toFixed(2)
        }
    ])

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        setOpen(newValue ? true : false)
    };

    React.useEffect(() => {
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
    }, [value])

    React.useEffect(() => {
        if (value === 1) {
            fetch(`https://engineering-task.elancoapps.com/api/applications/${listValue}`)
                .then(res => res.json())
                .then(json => setData(json))
        } else if (value === 2) {
            fetch(`https://engineering-task.elancoapps.com/api/resources/${listValue}`)
                .then(res => res.json())
                .then(json => setData(json))
        }
    }, [listValue])

    return (<>
        <div className="App">
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Raw" />
                    <Tab label="Application" />
                    <Tab label="Recources" />
                </Tabs>
            </Box>
            {data.length && <ColumnGroupingTable columnProps={col ? col : ''} data={data} listType={value ? listValue : ''} tableType={value ? 'Raw' : value === 1 ? 'Application' : 'Resources'} />}
        </div>
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <h3>{'Select Any '}{value === 1 ? 'Application' : 'Resources'}</h3>
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
                            onClick={() => {
                                setListValue(value)
                                setOpen(false)
                            }}
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
