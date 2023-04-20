exports.formatDate = (dateStr) => {
    if(!dateStr.length) return '';
    const formattedDate = `${dateStr.slice(8, 10)}/${dateStr.slice(5, 7)}/${dateStr.slice(0, 4)} ${dateStr.slice(11, 16)}`
   return formattedDate;
}

exports.formatStrToTitle = (str) => {
    if (!str.length) return '';

    switch(str) {
        case 'created_at':
            return 'Date';
        case 'comment_count':
            return 'Comments';
        default:
            return str[0].toUpperCase() + str.slice(1);
    }
}