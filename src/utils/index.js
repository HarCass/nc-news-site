exports.formatDate = (dateStr) => {
    if(!dateStr.length) return '';
    const formattedDate = `${dateStr.slice(8, 10)}/${dateStr.slice(5, 7)}/${dateStr.slice(0, 4)} ${dateStr.slice(11, 16)}`
   return formattedDate;
}

exports.formatProperties = (obj) => {
    return
}