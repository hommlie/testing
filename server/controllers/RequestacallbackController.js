// const { Requestcallback } = require('../models');

// exports.createRequestcallback = async (req, res) => {

//   try {
//     const { name, phone } = req.body;

//     if (!name || !phone) {
//       return res.status(400).json({
//         status: 0,
//         message: 'Name and phone are required.',
//       });
//     }

//     const newCallback = await Requestcallback.create({ name, phone });

//     res.status(200).json({
//       status: 1,
//       message: 'Callback request submitted successfully',
//       data: newCallback,
//     });
//   } catch (error) {
//     console.error('Error submitting callback request:', error);
//     res.status(500).json({
//       status: 0,
//       message: 'An error occurred while submitting the callback request',
//       error: error.message,
//     });
//   }
// };
