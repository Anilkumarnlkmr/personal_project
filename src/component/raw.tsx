import * as React from 'react';


export default function Raw(props) {

    React.useEffect(()=>{
        fetch("https://engineering-task.elancoapps.com/api/raw")
        .then(res => res.json())
        .then(json => console.log(json))
      },[])


    return (
        <>{'anil'}</>
    );
}