const sanitizeRequest = (req, res, next) => {
    let input = JSON.stringify(req.body);
    let sanitizedInput = input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    sanitizedInput = JSON.parse(sanitizedInput);
    req.body = sanitizedInput;
    next();
};

module.exports = sanitizeRequest;