export default function getCurrentTimeFormatted() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';

    // Convert hours from 24-hour to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    // Ensure minutes are displayed with leading zero if needed
    const minutesFormatted = minutes < 10 ? '0' + minutes : minutes;

    const formattedTime = hours + ':' + minutesFormatted + ' ' + ampm;
    return formattedTime;
}
