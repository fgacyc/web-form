import { DatePicker, Cell } from '@arco-design/mobile-react';
import {useState} from "react";

export default  function Appointment1(){
    const [picker1Visible, setPicker1Visible] = useState(true);
    const [picker2Visible, setPicker2Visible] = useState(true);
    const [picker3Visible, setPicker3Visible] = useState(true);
    const [picker1Value, setPicker1Value] = useState(new Date('2020-02-21 10:10:08'.replace(/-/g, "/")).getTime());
    const [picker2Value, setPicker2Value] =  useState(new Date('2020-08-31 10:10:08'.replace(/-/g, "/")).getTime());
    const [picker3Value, setPicker3Value] =  useState(new Date('2020-02-29 10:10:08'.replace(/-/g, "/")).getTime());

    return (<>
            <Cell.Group bordered={false}>
                <Cell
                    showArrow
                    label="Complete time format"
                    onClick={() => {setPicker1Visible(true);}}
                />
                <Cell
                    showArrow
                    label="Select month, year and day"
                    onClick={() => {setPicker2Visible(true);}}
                />
                <Cell
                    showArrow
                    label="Select month and day"
                    onClick={() => {setPicker3Visible(true);}}
                />
                <DatePicker
                    visible={picker1Visible}
                    maskClosable
                    disabled={false}
                    minTs={new Date('2020-02-22 18:00:00'.replace(/-/g, "/")).getTime()}
                    currentTs={picker1Value}
                    title="year/month/day/hour/minute/second"
                    onHide={() => {
                        setPicker1Visible(false);
                    }}
                    onChange={(timestamp, obj) => {
                        console.info('---demo on change index', timestamp);
                        setPicker1Value(timestamp);
                    }}
                    touchToStop={true}
                />
                <DatePicker
                    visible={picker2Visible}
                    maskClosable
                    disabled={false}
                    currentTs={picker2Value}
                    mode="date"
                    onHide={() => {
                        setPicker2Visible(false);
                    }}
                    onChange={(timestamp, obj) => {
                        console.info('---demo on change', timestamp);
                        setPicker2Value(timestamp);
                    }}
                    onOk={(timestamp, obj) => {
                        console.info('----- time onok demo date', obj, timestamp);
                    }}
                    formatter={(value, type) => {
                        if (type === 'year') {
                            return `${value}年`;
                        } else if (type === 'month') {
                            return `${value}月`;
                        } else if (type === 'date') {
                            return `${value}日`;
                        }
                    }}
                />
                <DatePicker
                    visible={picker3Visible}
                    maskClosable
                    disabled={false}
                    currentTs={picker3Value}
                    typeArr={['month', 'date']}
                    onHide={() => {
                        setPicker3Visible(false);
                    }}
                    onChange={(timestamp, obj) => {
                        console.info('---demo on change', timestamp);
                        setPicker3Value(timestamp);
                    }}
                    onOk={(timestamp, obj) => {
                        console.info('----- time onok demo date', obj, timestamp);
                    }}
                    formatter={(value, type) => type === 'month' ? `${value}月` : `${value}日`}
                />
            </Cell.Group>
        </>
    );
}