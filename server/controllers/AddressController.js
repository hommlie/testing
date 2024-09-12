const { Address } = require('../models');
const apiUrl = process.env.apiUrl;

exports.saveAddress = async(req, res) => {
    const { user_id, name, address, landmark, pincode, mobile, email, latitude, longitude } = req.body;
    console.log(req.body);

    try {
      if (!user_id) {
        return res.status(400).json({ status: 0, message: 'Please login to save address' });
      }

      if (!name) {
        return res.status(400).json({ status: 0, message: 'Please enter first name' });
      }

      if (!address) {
        return res.status(400).json({ status: 0, message: 'Please enter address' });
      }

      if (!pincode) {
        return res.status(400).json({ status: 0, message: 'Please enter pincode' });
      }

      if (!mobile) {
        return res.status(400).json({ status: 0, message: 'Please enter mobile number' });
      }

      const fullAddress = await Address.create({
        user_id,
        name,
        address,
        landmark,
        pincode,
        mobile,
        email,
        latitude, 
        longitude
      });

      if (fullAddress) {
        return res.status(200).json({ status: 1, message: 'Success' });
      } else {
        return res.status(200).json({ status: 0, message: 'Something went wrong' });
      }
    } catch (error) {
      return res.status(500).json({ status: 0, message: 'Something went wrong', error: error.message });
    }
}

exports.getAddress = async(req, res) => {
    const { user_id } = req.body;
    console.log(user_id);

    try {
      if (!user_id) {
        return res.status(400).json({ status: 0, message: 'Please login to check address' });
      }

      const addresses = await Address.findAll({
        where: { user_id }
      });

      if (addresses.length > 0) {
        return res.status(200).json({ status: 1, message: 'Success', data: addresses });
      } else {
        return res.status(200).json({ status: 0, message: 'No addresses found' });
      }
    } catch (error) {
      return res.status(500).json({ status: 0, message: 'Something went wrong', error: error.message });
    }
}

exports.editAddress = async(req, res) => {
    const { id, name, address, landmark, pincode, mobile, email, latitude, longitude } = req.body;

    try {
      if (!id) {
        return res.status(400).json({ status: 0, message: 'Invalid Address ID' });
      }

      if (!name) {
        return res.status(400).json({ status: 0, message: 'Please enter first name' });
      }

      if (!address) {
        return res.status(400).json({ status: 0, message: 'Please enter address' });
      }

      if (!pincode) {
        return res.status(400).json({ status: 0, message: 'Please enter pincode' });
      }

      if (!mobile) {
        return res.status(400).json({ status: 0, message: 'Please enter mobile number' });
      }

      const updatedAddress = await Address.update({
        name,
        address,
        landmark,
        pincode,
        mobile,
        email,
        latitude, 
        longitude
      }, {
        where: { id: id }
      });

      if (updatedAddress) {
        return res.status(200).json({ status: 1, message: 'Success' });
      } else {
        return res.status(200).json({ status: 0, message: 'Something went wrong' });
      }
    } catch (error) {
      return res.status(500).json({ status: 0, message: 'Something went wrong', error: error.message });
    }
}

exports.deleteAddress = async(req, res) => {
    const { address_id } = req.body;

    try {
      if (!address_id) {
        return res.status(200).json({ status: 0, message: 'Please provide Address ID' });
      }

      const deleted = await Address.destroy({
        where: { id: address_id }
      });

      if (deleted) {
        return res.status(200).json({ status: 1, message: 'Success' });
      } else {
        return res.status(200).json({ status: 0, message: 'Something went wrong' });
      }
    } catch (error) {
      return res.status(500).json({ status: 0, message: 'Something went wrong', error: error.message });
    }
}