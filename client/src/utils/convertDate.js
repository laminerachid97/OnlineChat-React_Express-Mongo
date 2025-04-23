export default function convertDate(isoString ) {
    const date = new Date(isoString);

    // Get hours and minutes
    let hours = date.getHours();
    const minutes = date.getMinutes();
    
    // Format AM/PM
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 => 12
    
    // Format minutes to always be two digits
    const minutesFormatted = minutes < 10 ? '0' + minutes : minutes;
    
    // Final formatted time
    const formattedTime = hours + ':' + minutesFormatted + ' ' + ampm;
    return formattedTime;
}