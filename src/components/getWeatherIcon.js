// dayIconsPack
import cloudyDay1 from '../assets/icons/animated-svg-icons/day/cloudy-day-1.svg';
import cloudy from '../assets/icons/animated-svg-icons/day/cloudy.svg';
import day from '../assets/icons/animated-svg-icons/day/day.svg';
import rainy1 from '../assets/icons/animated-svg-icons/day/rainy-1.svg';
import snowy1 from '../assets/icons/animated-svg-icons/day/snowy-1.svg';
import thunderstormsDay from '../assets/icons/animated-svg-icons/day/thunderstorms-day.svg';
import thunderstormsNightDay from '../assets/icons/animated-svg-icons/day/thunderstorms-day.svg';


// nightIconsPack
import cloudyNight2 from '../assets/icons/animated-svg-icons/night/cloudy-night-2.svg';
import night from '../assets/icons/animated-svg-icons/night/night.svg';
import rainy4 from '../assets/icons/animated-svg-icons/night/rainy-4.svg';
import rainy5 from '../assets/icons/animated-svg-icons/night/rainy-5.svg';
import rainy6 from '../assets/icons/animated-svg-icons/night/rainy-6.svg';
import snowy6 from '../assets/icons/animated-svg-icons/night/snowy-6.svg';
import thunderstormsNight from '../assets/icons/animated-svg-icons/night/thunderstorms-night.svg';
import thunderstormsNightRain from '../assets/icons/animated-svg-icons/night/thunderstorms-night.svg';



// universalIconsPack
import rainy7 from '../assets/icons/animated-svg-icons/rainy-7.svg';
import snowy5 from '../assets/icons/animated-svg-icons/snowy-5.svg';
import thunder from '../assets/icons/animated-svg-icons/thunder.svg';
import cloudySingleCloud from '../assets/icons/animated-svg-icons/cloudySingleCloud.svg';
import mist from '../assets/icons/animated-svg-icons/mist.svg';

let dayIconsPack = ['cloudy-day-1', 'cloudy', 'day', 'rainy-1', 'snowy-1'];
let nightIconsPack = ['cloudy-night-2', 'night', 'rainy-4', 'rainy-5', 'rainy-6', 'snowy-6'];
let universalIconsPack = ['rainy-7', 'snowy-5', 'thunder'];



export let getWeatherIcon = (iconCode) => {
    switch (iconCode) {
        case '01n':
            return night;
        case '01d':
            return day;
        case '02n':
            return cloudyNight2;
        case '02d':
            return cloudyDay1;
        case '03n':
            return cloudySingleCloud;
        case '03d':
            return cloudySingleCloud;
        case '04n':
            return cloudy;
        case '04d':
            return cloudy;
        case '09n':
            return rainy5;
        case '09d':
            return rainy5;
        case '10n':
            return rainy6;
        case '10d':
            return rainy1;
        case '11n': // for day also
            return thunderstormsNight;
        case '11d':
            return thunderstormsDay;
        case '13n': // for day also
            return snowy6;
        case '13d':
            return snowy6;
        case '50d':
            return mist;
        case '50n':
            return mist;
        default:
            return 'no-icon';
    }

}


