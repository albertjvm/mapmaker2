import './Panel.scss';

export const Panel = ({ title, children, ...rest}) => {
    return (
        <div className="Panel" {...rest} >
            <label className="Panel-Title">{title}</label>
            {children}
        </div>
    );
};