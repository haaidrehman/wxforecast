import HeaderTab from './HeaderTab';

let Header = ({ cityName, displayAQI }) => {
    let date = new Date();
    return (
        <>
            <div className="main-heading">
                <h3>{cityName}</h3>
                <p>{date.toLocaleDateString()}</p>
                <HeaderTab displayAQI={displayAQI} />
            </div>
        </>
    );
}

export default Header;