function toDateInputFormat (isoString) {
    if (!isoString) return '';
    console.log('Converting ISO string to date input format:', isoString);
    const date = new Date(isoString);
    return date.toISOString().slice(0, 16);
};


export {
    toDateInputFormat,
};