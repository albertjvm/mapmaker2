import './Slider.scss';

export const Slider = ({ options, valueKey, displayKey, value, onChange }) => {
    return (
        <div className='Slider'>
            {options.map(o => (
                <div 
                    key={o[valueKey]}
                    className={`option ${value === o[valueKey] ? 'active': ''}`}
                    onClick={() => onChange(o[valueKey])}
                >
                    <span className='value'>{o[displayKey]}</span>
                </div>
            ))}
        </div>
    );
};