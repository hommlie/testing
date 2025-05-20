import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";
import config from "../../config/config";
import { useToast } from "../../context/ToastProvider";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const ReviewModal = ({
  isOpen,
  onClose,
  orderId,
  productId,
  onReviewSubmitted,
}) => {
  const navigate = useNavigate();
  const notify = useToast();
  const successNotify = (success) => notify(success, "success");
  const errorNotify = (error) => notify(error, "error");
  const warningNotify = (warning) => notify(warning, "warning");

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jwtToken = Cookies.get("HommlieUserjwtToken");
    if (jwtToken) {
      const user = jwtDecode(jwtToken);
      try {
        const response = await axios.post(`${config.API_URL}/api/addratting`, {
          user_id: user.id,
          product_id: productId,
          order_id: orderId,
          ratting: rating,
          comment: comment,
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        if (response.data.status === 1) {
          onReviewSubmitted();
          onClose();
        } else if (response.data.status === 0) {
          warningNotify(response.data.message);
          navigate(`${config.VITE_BASE_URL}/`);
          onClose();
        }
      } catch (error) {
        errorNotify(error);
        console.error("Error submitting review:", error);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-20">
      <div
        className="fixed inset-0 opacity-60"
        style={{ backgroundColor: "black" }}
        onClick={onClose}
      ></div>
      <div className="relative bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Rating</label>
            <div className="flex">
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <FaStar
                    key={index}
                    className="cursor-pointer"
                    color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
                    size={24}
                    onClick={() => setRating(ratingValue)}
                  />
                );
              })}
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Comment</label>
            <textarea
              className="w-full p-2 border rounded"
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-200 rounded"
              style={{ border: "1px solid grey" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white rounded"
              style={{ backgroundColor: "#249370" }}
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
