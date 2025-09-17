const { Address } = require('../models');

exports.saveAddress = async (req, res) => {
  const {
    user_id,
    name,
    address,
    landmark,
    house_number, // ✅ read it
    pincode,
    mobile,
    email,
    latitude,
    longitude
  } = req.body;

  try {
    if (!user_id) return res.status(400).json({ status: 0, message: 'Please login to save address' });
    if (!name) return res.status(400).json({ status: 0, message: 'Please enter full name' });
    if (!address) return res.status(400).json({ status: 0, message: 'Please enter address' });
    if (!pincode) return res.status(400).json({ status: 0, message: 'Please enter pincode' });
    if (!mobile) return res.status(400).json({ status: 0, message: 'Please enter mobile number' });
    if (!latitude || !longitude) return res.status(400).json({ status: 0, message: 'Latitude/Longitude required' });

    const fullAddress = await Address.create({
      user_id,
      name,
      address,
      landmark,
      house_number, // ✅ save it
      pincode,
      mobile,
      email,
      latitude,
      longitude
    });

    return res.status(200).json({ status: 1, message: 'Success', data: fullAddress });
  } catch (error) {
    return res.status(500).json({ status: 0, message: 'Something went wrong', error: error.message });
  }
};

exports.getAddress = async (req, res) => {
  const { user_id } = req.body;

  try {
    if (!user_id) return res.status(400).json({ status: 0, message: 'Please login to check address' });

    const addresses = await Address.findAll({ where: { user_id } });

    if (addresses.length > 0) {
      return res.status(200).json({ status: 1, message: 'Success', data: addresses });
    }
    return res.status(200).json({ status: 0, message: 'No addresses found', data: [] });
  } catch (error) {
    return res.status(500).json({ status: 0, message: 'Something went wrong', error: error.message });
  }
};

exports.editAddress = async (req, res) => {
  const {
    id,
    name,
    address,
    landmark,
    house_number, // ✅ allow edit
    pincode,
    mobile,
    email,
    latitude,
    longitude
  } = req.body;

  try {
    if (!id) return res.status(400).json({ status: 0, message: 'Invalid Address ID' });
    if (!name) return res.status(400).json({ status: 0, message: 'Please enter full name' });
    if (!address) return res.status(400).json({ status: 0, message: 'Please enter address' });
    if (!pincode) return res.status(400).json({ status: 0, message: 'Please enter pincode' });
    if (!mobile) return res.status(400).json({ status: 0, message: 'Please enter mobile number' });

    const [affected] = await Address.update(
      { name, address, landmark, house_number, pincode, mobile, email, latitude, longitude },
      { where: { id } }
    );

    if (affected > 0) {
      return res.status(200).json({ status: 1, message: 'Success' });
    }
    return res.status(404).json({ status: 0, message: 'Address not found' });
  } catch (error) {
    return res.status(500).json({ status: 0, message: 'Something went wrong', error: error.message });
  }
};

exports.deleteAddress = async (req, res) => {
  const { address_id } = req.body;

  try {
    if (!address_id) return res.status(400).json({ status: 0, message: 'Please provide Address ID' });

    const deleted = await Address.destroy({ where: { id: address_id } });

    if (deleted) return res.status(200).json({ status: 1, message: 'Success' });
    return res.status(404).json({ status: 0, message: 'Address not found' });
  } catch (error) {
    return res.status(500).json({ status: 0, message: 'Something went wrong', error: error.message });
  }
};
