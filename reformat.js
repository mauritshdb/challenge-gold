function formatRes(data, message) {
    return {
        data: data ? data : null,
        message: message ? message : "success"
    }
}
module.exports = {formatRes}