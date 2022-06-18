import React from 'react';
import { Button } from 'antd';

interface TProps {
    name: string
}

export default (props: TProps) => (
    <Button type="primary" >
        {props.name}
    </Button>

);