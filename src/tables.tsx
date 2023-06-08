import * as React from 'react';
import './App.css';
// import Raw from "../src/component/raw";
import ColumnGroupingTable from './dynamicTable.tsx';

interface Column {
  id: "name" | "code" | "population" | "size" | "density" | 'ConsumedQuantity' | 'Cost'|"Date"|'Location'|"MeterCategory"|"ResourceGroup"|'ResourceLocation'|"ServiceName"|"Tag"|"UnitOfMeasure";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

function Tables() {
  const [data,setData] = React.useState([]);
  const [col] = React.useState([
    { id: "ConsumedQuantity", label: "Consumed Quantity", minWidth: 170 },
    { id: "Cost", label: "ISO\u00a0Code", minWidth: 100 },
    {
      id: "Date",
      label: "Date",
      minWidth: 100,
      align: "right",
      format: (value: number) => value.toLocaleString("en-US")
    },
    {
      id: "Location",
      label: "Location",
      minWidth: 100,
      align: "right",
      format: (value: number) => value.toLocaleString("en-US")
    },
    {
      id: "MeterCategory",
      label: "Meter Category",
      minWidth: 100,
      align: "right",
      format: (value: number) => value.toFixed(2)
    },
    {
      id: "ResourceGroup",
      label: "Resource Group",
      minWidth: 100,
      align: "right",
      format: (value: number) => value.toFixed(2)
    },
    {
      id: "ResourceLocation",
      label: "Resource Location",
      minWidth: 100,
      align: "right",
      format: (value: number) => value.toFixed(2)
    },
    {
      id: "ServiceName",
      label: "Service Name",
      minWidth: 100,
      align: "right",
      format: (value: number) => value.toFixed(2)
    },
    {
      id: "Tag",
      label: "Tag",
      minWidth: 100,
      align: "right",
      format: (value: number) => value.toFixed(2)
    },
    {
      id: "UnitOfMeasure",
      label: "Unit Of Measure",
      minWidth: 100,
      align: "right",
      format: (value: number) => value.toFixed(2)
    }
  ])

  React.useEffect(()=>{
    fetch("https://engineering-task.elancoapps.com/api/raw")
    .then(res => res.json())
    .then(json => setData(json))
  },[])
  return (
    <div className="App">
      
      {data.length && <ColumnGroupingTable columnProps = {col ? col : ''} data={ data }/>}
    </div>
  );
}

export default Tables;
