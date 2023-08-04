// const allowedCors = [
//   'https://neequu.nomoreparties.co',
//   'http://neequu.nomoreparties.co',
//   'https://api.neequu.nomoreparties.co',
//   'http://api.neequu.nomoreparties.co',
//   'localhost:3000',
// ];

// const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

// export default (req, res, next) => {
//   const { origin } = req.headers;
//   const { method } = req;
//   const requestHeaders = req.headers['access-control-request-headers'];
//   res.header('Access-Control-Allow-Credentials', true);
//   if (allowedCors.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//   }
//   if (method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
//     res.header('Access-Control-Allow-Headers', requestHeaders);
//     res.end();
//   }
//   next();
// };
// eslint-disable-next-line func-names
export default function () {}
