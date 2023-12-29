import * as React from 'react';
import {useEffect, useState} from 'react';
import axios from "axios";
import {Card, CardContent, CardHeader} from "@mui/material";
import {PieChart} from "@mui/x-charts";
import Backdrop from "./Backdrop";
import { useTaskContext } from '../context/TaskContext'


export default function PieGraphic() {
    const [data, setData] = useState([])
    const [openBackDrop, setOpenBackDrop] = useState(true);
    const { count } = useTaskContext();
    useEffect(() => {
        const entries = Object.entries(count).map((value, index) => {
          return {
              id: index, value: parseInt(value[1] as string, 10), label: value[0]
          }
        });
        setData(entries);
        setOpenBackDrop(false);
    },[count]);

    return (
        <Card>
            <CardHeader title="Tasks graphics"/>
            <CardContent sx={{position: 'relative'}}>
                <PieChart
                    series={[
                        {
                            data,
                        },
                    ]}
                    width={400}
                    height={200}

                />
                <Backdrop open={openBackDrop}/>
            </CardContent>
        </Card>
    )
}
