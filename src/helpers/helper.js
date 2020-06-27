export const TOTAL_IN_RELATIONSHIPS = (payload) => {
    let total = 0;
    payload.forEach(function(property) {
        var tup = property.split(':');
        total = total +parseInt(tup[1]);
    });
    return total;
};