import * as React from 'react';
import '@/src/styles/infobutton.css';
import Image from 'next/image';
import { PropaneSharp } from '@mui/icons-material';

export default function InfoButton(props: any) {
    return (
        <div className="button">
            {props.icon ? <Image src={props.icon} alt="" width={35}/> : null}
            <p className="num-text">{props.info}</p>
        </div>
    )
}