import { useRef } from 'react';
let HeaderTab = ({ displayAQI }) => {

    let buttonWrapper = useRef();

    return (

        <>
            <div className="tabs">
                <div className="tab-inner">
                    <div ref={buttonWrapper}>
                        <button onClick={(e) => displayAQI(e, buttonWrapper)}>Air quality</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HeaderTab;