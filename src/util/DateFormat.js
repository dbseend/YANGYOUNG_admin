export const formatDate = (date) => {
    let formattedDate = new Date(date);
    let year = formattedDate.getFullYear();
    let month = ("0" + (formattedDate.getMonth() + 1)).slice(-2);
    let day = ("0" + formattedDate.getDate()).slice(-2);
    let hours = ("0" + formattedDate.getHours()).slice(-2);
    let minutes = ("0" + formattedDate.getMinutes()).slice(-2);
    let seconds = ("0" + formattedDate.getSeconds()).slice(-2);
    let milliseconds = ("00" + formattedDate.getMilliseconds()).slice(-3);
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
  }