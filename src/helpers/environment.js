let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:3000';
        break;

        case 'gamer-genus-engelken.herokuapp.com':

        APIURL = 'https://gamer-genus.herokuapp.com'
}

export default APIURL