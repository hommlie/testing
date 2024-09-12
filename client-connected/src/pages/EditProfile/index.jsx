import React, { useEffect, useState } from "react";
import axios from 'axios';
import Cookies from "js-cookie";
import { useCont } from "../../context/MyContext";
import { useToast } from "../../context/ToastProvider";
import config from "../../config/config";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';

export default function EditProfile() {
  const { user, setUser, getUser } = useCont();
  const [name, setName] = useState(user?.name || "");
  const [mobile, setMobile] = useState(user?.mobile || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profile_pic, setProfilePic] = useState(null);
  const [selectedPic, setSelectedPic] = useState(null);

  const notify = useToast();
  const successNotify = (success) => notify(success, 'success');
  const errorNotify = (error) => notify(error, 'error');

  const [errors, setErrors] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    // if (!user?.length) getUser();
  }, []);

  useEffect(() => {
    setName(user?.name || []);
    setMobile(user?.mobile);
    setEmail(user?.email || []);
    setProfilePic(user?.profile_pic || null);
  }, [getUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      default:
        break;
    }
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedPic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (name === "User") newErrors.name = "Name should be changed";
    // if (!email.length) newErrors.email = "Email is required";
    return newErrors;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const errorMessages = Object.values(newErrors).join(' & ');
      errorNotify(errorMessages);
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('user_id', user.id);
    if (profile_pic) {
      formData.append('profile_pic', profile_pic);
    }

    try {
      const jwtToken = Cookies.get("HommlieUserjwtToken");
      const response = await axios.post(`${config.API_URL}/api/editprofile`, 
        formData, 
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${jwtToken}`,
          },
      });

      if (response.status === 200) {
        getUser();
        console.log(response.data.message, response.data.user);
        setSelectedPic(null);
        successNotify("Profile updated successfully");
      } else {
        console.error('Error updating profile:', response.data);
        errorNotify('Error updating profile!!!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      errorNotify('Error updating profile. Please try again later!!!');
    }
  };

  return (
    <main className="flex justify-center">
      <section className="w-[90%] md:w-[684px] bg-white p-14 shadow rounded-xl">
        <div>
          <h3 className="text-center text-2xl font-bold">Edit Profile</h3>
          <div className="my-8">
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="flex flex-col gap-4">
                <label htmlFor="name" className="text-sm font-bold">Name *</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className={`h-[50px] w-full pl-4 text-sm rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  style={{ backgroundColor: "rgba(249, 249, 249, 1)", border: "1px solid rgba(230, 230, 230, 1)" }}
                />
                {errors.name && <p className="text-xs mt-1" style={{color: "red"}}>{errors.name}</p>}
              </div>
              <div className="flex flex-col gap-4">
                <label 
                    htmlFor="mobile" 
                    className="text-sm font-bold flex flex-row justify-between items-center"
                >
                    Mobile * <span className="text-xs font-normal">OTP Verified</span>
                </label>
                <span
                  className="h-[50px] w-full pl-4 text-sm rounded bg-gray-100 flex items-center"
                  style={{ border: "1px solid rgba(230, 230, 230, 1)" }}
                >{mobile}</span>
              </div>
              {/* <div className="flex flex-col gap-4">
                <label htmlFor="secondaryMobile" className="text-sm font-bold">Secondary Mobile</label>
                <PhoneInput
                  country={'in'}
                  value={secondaryMobile}
                  onChange={phone => setSecondaryMobile(phone)}
                  inputStyle={{
                    width: '100%',
                    height: "54px",
                    borderRadius: '0.375rem',
                    padding: '0.5rem',
                    paddingLeft: "4rem",
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    fontSize: '1rem'
                  }}
                  buttonStyle={{
                    borderRadius: '0.375rem 0 0 0.375rem',
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    padding: '0.5rem'
                  }}
                  dropdownStyle={{
                    borderRadius: '0.375rem',
                    borderColor: 'rgba(0, 0, 0, 0.1)'
                  }}
                />
              </div> */}
              <div className="flex flex-col gap-4">
                <label htmlFor="email" className="text-sm font-bold">Email *</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={handleInputChange}
                  placeholder="example@gmail.com"
                  className={`h-[50px] w-full pl-4 text-sm rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  style={{ backgroundColor: "rgba(249, 249, 249, 1)", border: "1px solid rgba(230, 230, 230, 1)" }}
                />
                {errors.email && <p className="text-xs mt-1" style={{color: "red"}}>{errors.email}</p>}
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="profile_pic" className="text-sm font-bold">Profile Image</label>
                <input
                  type="file"
                  name="profile_pic"
                  id="profile_pic"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                  className="h-[50px] w-full text-sm"
                  style={{ backgroundColor: "rgba(249, 249, 249, 1)", border: "1px solid rgba(230, 230, 230, 1)" }}
                />
                {profile_pic ? (
                  <div className="mt-4">
                    <img src={selectedPic != null ? URL.createObjectURL(profile_pic) : user?.profile_pic ? user?.profile_pic : ""} alt="Profile" className="h-36 w-36 rounded-full object-cover" />
                  </div>
                ) : null}
              </div>
              <div className="w-full pt-8">
                <button
                  type="submit"
                  className="w-full text-white text-sm font-bold p-4"
                  style={{ backgroundColor: "rgba(36, 147, 112, 1)" }}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
