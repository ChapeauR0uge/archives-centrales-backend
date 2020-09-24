

const verifyUpload = (req, res, next) => {
    let { headers } = req;

    console.log( headers );
    next();
}

module.exports.verifyUpload = verifyUpload;
