import { useState } from 'react';

export default function FieldPicker({ onSelect, title, data }) {
    const [showInitialOption, setShowInitialOption] = useState(true);

    const handleSelect = (event) => {
        const selectedValue = event.target.value;
        onSelect(selectedValue);
        setShowInitialOption(false);
    };

    return (
        <select
            className='appointment-select'
            value={showInitialOption ? '' : undefined}
            onChange={handleSelect}
        >
            <option value='' disabled hidden>{title}</option>
            {
                data.map((item, index) => {
                    return (
                        <option key={index} value={item.value}>{item.label}</option>
                    )
                })
            }
        </select>
    )
}