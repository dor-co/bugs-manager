import { Radio } from 'antd';

const CustomRadio = ({ field }) => {
    return (
        <Radio.Group {...field}>
            <Radio value={1}>A</Radio>
            <Radio value={2}>B</Radio>
            <Radio value={3}>C</Radio>
            <Radio value={4}>D</Radio>
        </Radio.Group>
    );
};

export default CustomRadio;