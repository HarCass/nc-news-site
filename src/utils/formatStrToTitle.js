const formatStrToTitle = (str) => {
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

export default formatStrToTitle;