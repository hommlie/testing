const express = require("express");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const checkUserToken = require("../middleware/userMiddleware");
const upload = require("../config/multerConfig");

const UserController = require("../controllers/UserController");
const ProductsController = require("../controllers/ProductsController ");
const HomeController = require("../controllers/HomeController");
const CategoryController = require("../controllers/CategoryController");
const BannerController = require("../controllers/BannerController");
const WishlistController = require("../controllers/WishlistController");
const RattingController = require("../controllers/RattingController");
const BrandController = require("../controllers/BrandController");
const AddressController = require("../controllers/AddressController");
const CartController = require("../controllers/CartController");
const CheckoutController = require("../controllers/CheckoutController");
const PaymentController = require("../controllers/PaymentController");
const OrderController = require("../controllers/OrderController");
const NotificationController = require("../controllers/NotificationController");
const CouponsController = require("../controllers/CouponsController");
const SettingsController = require("../controllers/SettingsController");
const CMSController = require("../controllers/CMSController");
const ReturnConditionController = require("../controllers/ReturnConditionsController");
const MessageController = require("../controllers/MessageController");
const CareerContoller = require("../controllers/CareerController");
const PartnerContoller = require("../controllers/PartnerController");
const InspectionController = require("../controllers/InspectionController");
const ListingFormController = require("../controllers/ListingFormController");
const WalletController = require("../controllers/WalletController");
const SEOPageController = require("../controllers/SEOPageController");
const blogController = require("../controllers/BlogController");
const commentController = require("../controllers/CommentController");
const LandingPageController = require("../controllers/LandingPageController");

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());

//Usermanagement
app.post("/register", UserController.registerOrLogin);
app.post("/verifyotp", UserController.verifyOtp);
app.post("/resendotp", UserController.reSendOtp);
// app.post('/add-mobile', UserController.addMobile);
app.post("/getprofile", UserController.getProfile);
app.post(
  "/editprofile",
  upload.single("profile_pic"),
  UserController.editProfile
);
app.post("/help", UserController.help);
app.get("/vendors", UserController.vendors);

//Homefeeds
app.post("/homefeeds", HomeController.homeFeeds);
app.get("/homepage", HomeController.getHomePageData);

//Product
app.post("/products", ProductsController.products);
app.post("/viewalllisting", ProductsController.viewAllListing);
app.post("/productdetails", ProductsController.productDetails);
app.post("/vendorproducts", ProductsController.vendorProducts);
app.get("/searchproducts", ProductsController.searchProducts);
app.post("/filter", ProductsController.filter);

//Wishlist
app.post("/addtowishlist", WishlistController.addToWishlist);
app.post("/removefromwishlist", WishlistController.removeFromWishlist);
app.post("/getwishlist", WishlistController.getWishlist);

//Rattings
app.post(
  "/addratting",
  upload.array("reviewImages", 5),
  RattingController.addRatting
);
app.post("/productreview", RattingController.productReview);
app.get("/google-reviews", RattingController.getGoogleReviews);

//Categorymanagement
app.get("/category", CategoryController.getCategory);
app.post("/subcategory", CategoryController.getSubcategory);
app.post("/cleaningsubcategory", CategoryController.getCleaningSubcategory);

//Bannermanagement
app.get("/banner", BannerController.getBanner);

//Brands
app.get("/brands", BrandController.brands);
app.post("/brandsproducts", BrandController.brandsProducts);

//Address
app.post("/saveaddress", AddressController.saveAddress);
app.post("/getaddress", AddressController.getAddress);
app.post("/editaddress", AddressController.editAddress);
app.post("/deleteaddress", AddressController.deleteAddress);

//Cart
app.post("/addtocart", CartController.addToCart);
app.post("/getcart", CartController.getCart);
app.post("/deleteproduct", CartController.deleteProduct);
app.post("/qtyupdate", CartController.qtyUpdate);

//Checkout
app.post("/checkout", CheckoutController.checkout);

//Payment list
app.post("/paymentlist", PaymentController.paymentlist);

//Order
// app.post("/initiatePaymentApp", OrderController.initiatePaymentApp);
app.post("/initiatePayment", OrderController.initiatePayment);
app.post("/verifyPayment", OrderController.verifyPayment);
// app.post("/paymentSuccess/{category}/{slug}", OrderController.paymentSuccess);
app.post("/order", OrderController.order);
app.post("/orderhistory", OrderController.orderhistory);
app.post("/orderdetails", OrderController.orderdetails);
app.post("/cancelorder", OrderController.cancelOrder);
app.post("/rescheduleorder", OrderController.rescheduleOrder);
app.post("/trackorder", OrderController.trackOrder);
app.post("/wallet", OrderController.wallet);
app.post("/recharge", OrderController.recharge);

//Notification
app.post("/notification", NotificationController.notification);
app.post("/notificationread", NotificationController.notificationread);

//Coupons
// app.get("/coupons", CouponsController.coupons);
app.post("/coupons", CouponsController.coupons);
app.post("/applycoupons", CouponsController.applycoupons);
app.get("/getcoupons", CouponsController.getCoupons);

//Return conditions
app.post("/returnconditions", ReturnConditionController.returnconditions);
app.post("/returnrequest", ReturnConditionController.returnrequest);

//PrivacyPolicy
app.get("/cmspages", CMSController.index);

//Help
app.post("/help", UserController.help);

//Settings
app.get("/settings", SettingsController.settings);

//Message
app.post("/message", MessageController.Message);

//Career
app.post("/addCareer", upload.single("resume"), CareerContoller.addCareer);

//Partner
app.post("/createpartnerform", PartnerContoller.createPartnerForm);

//Inspection
app.post("/createInspection", InspectionController.createInspection);

//free listing form
app.post("/freelisting/create", ListingFormController.create);

//wallet
app.post("/wallet/balance", WalletController.getWalletBalance);
app.post("/wallet/add-money", WalletController.addMoneyToWallet);
app.post("/wallet/deduct-money", WalletController.deductMoneyFromWallet);
app.post("/wallet/transactions", WalletController.getWalletTransactions);

//SEO Page
app.get("/seopage/getPageBySlug/:slug", SEOPageController.getPageBySlug);

//Blogs
app.get("/blogs/getall", blogController.getAllPublished);
app.get("/blogs/getbyslug/:slug", blogController.getBySlug);
app.get("/blogs/getbyid/:id", blogController.getById);
app.get("/blogcategory/getall", blogController.getAllBlogCategories);

//Blog comments
app.post("/comments/create/:authorId", commentController.create);
app.put("/comments/update/:id/:authorId", commentController.update);
app.delete("/comments/delete/:id/:authorId", commentController.delete);

//Landing page
app.get(
  "/landing/getPageBySlug/:slug",
  LandingPageController.getLandingPageBySlug
);

module.exports = app;
