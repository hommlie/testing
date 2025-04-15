<?php
use App\Http\Controllers\Admin\QuestionsController;


Route::redirect('/', 'public/login');
    
Route::redirect('/home', 'admin');

Auth::routes(['register' => false]);

Route::group(['prefix' => 'admin', 'as' => 'admin.', 'namespace' => 'Admin', 'middleware' => ['auth']], function () {
    Route::get('/', 'HomeController@index')->name('home');

    Route::delete('permissions/destroy', 'PermissionsController@massDestroy')->name('permissions.massDestroy');

    Route::resource('permissions', 'PermissionsController');

    Route::delete('roles/destroy', 'RolesController@massDestroy')->name('roles.massDestroy');

    Route::resource('roles', 'RolesController');

    Route::delete('users/destroy', 'UsersController@massDestroy')->name('users.massDestroy');

    Route::resource('users', 'UsersController');

    Route::delete('products/destroy', 'ProductsController@massDestroy')->name('products.massDestroy');

    Route::resource('products', 'ProductsController');

    Route::resource('questions', 'QuestionsController');


    Route::delete('questions/destroy', 'QuestionsController@massDestroy')->name('question.massDestroy');

    // Route::get('questions','QuestionsController@index')->name('questions.index');

    // Employee Routes
    Route::get('employees', 'EmployeeController@index')->name('employees.index');
    Route::get('addemployee', 'EmployeeController@addemployee')->name('employees.add'); 
    Route::post('storeemployee', 'EmployeeController@storeemployee')->name('employees.store');
    Route::get('getAllEmployees', 'EmployeeController@getAllEmployees')->name('admin.getAllEmployees'); 
    Route::get('/getassignemployee/{id}', 'EmployeeController@getassignemployee')->name('employees.getassignemployee');
    Route::get('/assignemployee/{id}', 'EmployeeController@assignemployee')->name('employees.assignemployee');
    Route::get('getemployee', 'EmployeeController@retrieve')->name('employees.retrieve'); 
    Route::get('/employee/show/{id}', 'EmployeeController@show')->name('employees.show');


    Route::get('/employee/view/{id}', 'EmployeeController@view')->name('employees.view');
    Route::get('/employee/assign/{id}', 'EmployeeController@assign')->name('employees.assign');
    Route::put('/employee/update/{id}', 'EmployeeController@update')->name('employees.update');
    Route::put('/employee/assign/{id}', 'EmployeeController@assignUpdate')->name('employees.assignUpdate');
    Route::post('/admin/employee/delete', 'EmployeeController@delete')->name('employees.delete');
    Route::post('/admin/employee/deactive', 'EmployeeController@deactive')->name('employees.deactive');


     // TimeSlot Routes
    Route::get('timeslot', 'TimeslotController@index')->name('timeslot');
    Route::get('addtimeslot', 'TimeslotController@addtimeslot')->name('timeslot.add'); 
    Route::post('storetimeslot', 'TimeslotController@storetimeslot')->name('timeslot.store'); 
    Route::get('/timeslot/show/{id}', 'TimeslotController@show')->name('timeslot.show');
    Route::get('/timeslot/view/{id}', 'TimeslotController@view')->name('timeslot.view');
    Route::put('/timeslot/update/{id}', 'TimeslotController@update')->name('timeslot.update');
    Route::post('/admin/timeslot/delete', 'TimeslotController@delete')->name('timeslot.delete');
    Route::post('/admin/timeslot/deactive', 'TimeslotController@deactive')->name('timeslot.deactive');


        // Testimonial Routes
    Route::get('testimonials', 'TestimonialsController@index')->name('testimonials'); 
    Route::get('addtestimonials', 'TestimonialsController@addtestimonials')->name('testimonials.add'); 
    Route::post('storetestimonials', 'TestimonialsController@storetestimonials')->name('testimonials.store'); 
    Route::get('/testimonials/show/{id}', 'TestimonialsController@show')->name('testimonials.show');
    Route::get('/testimonials/view/{id}', 'TestimonialsController@view')->name('testimonials.view');
    Route::put('/testimonials/update/{id}', 'TestimonialsController@update')->name('testimonials.update');
    Route::post('/admin/testimonials/delete', 'TestimonialsController@delete')->name('testimonials.delete');
    Route::post('/admin/testimonials/deactive', 'TestimonialsController@deactive')->name('testimonials.deactive');


    // Quotations Routes
    Route::get('quotation', 'QuotationController@index')->name('quotation'); 
    Route::get('addquotation', 'QuotationController@addquotation')->name('quotation.add'); 
    Route::post('storequotation', 'QuotationController@storequotation')->name('quotation.store'); 
    Route::get('/quotation/show/{id}', 'QuotationController@show')->name('quotation.show');
    Route::get('/quotation/view/{id}', 'QuotationController@view')->name('quotation.view');
    Route::put('/quotation/update/{id}', 'QuotationController@update')->name('quotation.update');
    Route::post('/admin/quotation/delete', 'QuotationController@delete')->name('quotation.delete');
    Route::post('/admin/quotation/deactive', 'QuotationController@deactive')->name('quotation.deactive');

    // PO Routes
    Route::get('purchaseorder', 'PurchaseOrderController@index')->name('purchaseorder'); 
    Route::get('addpurchaseorder', 'PurchaseOrderController@addpurchaseorder')->name('purchaseorder.add'); 
    Route::post('storepurchaseorder', 'PurchaseOrderController@storepurchaseorder')->name('purchaseorder.store'); 
    Route::get('/purchaseorder/show/{id}', 'PurchaseOrderController@show')->name('purchaseorder.show');
    Route::get('/purchaseorder/view/{id}', 'PurchaseOrderController@view')->name('purchaseorder.view');
    Route::put('/purchaseorder/update/{id}', 'PurchaseOrderController@update')->name('purchaseorder.update');
    Route::post('/admin/purchaseorder/delete', 'PurchaseOrderController@delete')->name('purchaseorder.delete');
    Route::post('/admin/purchaseorder/deactive', 'PurchaseOrderController@deactive')->name('purchaseorder.deactive');

    Route::get('purchaseorder/vendor', 'PurchaseOrderController@vendor')->name('purchaseorder.vendor'); 
    Route::get('purchaseorder/addvendor', 'PurchaseOrderController@addvendor')->name('purchaseorder.addvendor'); 
    Route::post('purchaseorder/storevendor', 'PurchaseOrderController@storevendor')->name('purchaseorder.storevendor'); 
    Route::post('purchaseorder/changeStatus', 'PurchaseOrderController@changeStatus')->name('purchaseorder.changeStatus'); 



    // Location Routes
    Route::get('location', 'LocationController@index')->name('location'); 
    Route::get('addlocation', 'LocationController@addlocation')->name('location.add'); 
    Route::post('storelocation', 'LocationController@storelocation')->name('location.store'); 
    Route::get('/location/show/{id}', 'LocationController@show')->name('location.show');
    Route::get('/location/view/{id}', 'LocationController@view')->name('location.view');
    Route::put('/location/update/{id}', 'LocationController@update')->name('location.update');
    Route::post('/admin/location/delete', 'LocationController@delete')->name('location.delete');
    Route::post('/admin/location/changeStatus', 'LocationController@changeStatus')->name('location.changeStatus');




    // Question Routes
    Route::get('question', 'QuestionController@index')->name('question'); 
    Route::get('addquestion', 'QuestionController@addquestion')->name('question.add'); 
    Route::post('storequestion', 'QuestionController@storequestion')->name('question.store'); 
    Route::get('/question/show/{id}', 'QuestionController@show')->name('question.show');
    Route::get('/question/view/{id}', 'QuestionController@view')->name('question.view');
    Route::put('/question/update/{id}', 'QuestionController@update')->name('question.update');
    Route::post('/admin/question/delete', 'QuestionController@delete')->name('question.delete');
    Route::post('/admin/question/deactive', 'QuestionController@deactive')->name('question.deactive');


    // Jobs Alloc
    Route::get('gantt', 'GanttController@index')->name('gantt');


        // manual_order Routes
    Route::get('manual_order', 'ManualOrderController@index')->name('manual_order'); 
    Route::get('addmanual_order', 'ManualOrderController@addmanual_order')->name('manual_order.add');
    Route::post('storemanual_order', 'ManualOrderController@storemanual_order')->name('manual_order.store');
    Route::get('/manual_order/show/{id}', 'ManualOrderController@show')->name('manual_order.show');
    Route::get('/manual_order/view/{id}', 'ManualOrderController@view')->name('manual_order.view');
    Route::put('/manual_order/update/{id}', 'ManualOrderController@update')->name('manual_order.update');
    Route::post('/admin/manual_order/delete', 'ManualOrderController@delete')->name('manual_order.delete');
    Route::post('/admin/manual_order/deactive', 'ManualOrderController@deactive')->name('manual_order.deactive');

    // Inventory Routes
    Route::get('inventory', 'InventoryController@index')->name('inventory'); 
    Route::get('inventory_history', 'InventoryController@inventory_history')->name('inventory.inventory_history'); 
    Route::get('assigned_inventory_history', 'InventoryController@assigned_inventory_history')->name('inventory.assigned_inventory_history'); 
    Route::get('addinventory', 'InventoryController@addinventory')->name('inventory.add'); 
    Route::post('storeinventory', 'InventoryController@storeinventory')->name('inventory.store'); 
    Route::get('addinventory_category', 'InventoryController@addinventory_category')->name('inventory.addCategory'); 
    Route::post('storeinventory_category', 'InventoryController@storeinventory_category')->name('inventory.storeCategory'); 
    Route::get('addinventory_type', 'InventoryController@addinventory_type')->name('inventory.addType'); 
    Route::post('storeinventory_type', 'InventoryController@storeinventory_type')->name('inventory.storeType');
    Route::get('/inventory/show/{id}', 'InventoryController@show')->name('inventory.show');
    Route::get('/inventory/outward/{id}', 'InventoryController@outward')->name('inventory.outward');
    Route::get('/inventory/inward/{id}', 'InventoryController@inward')->name('inventory.inward');
    Route::get('/inventory/view/{id}', 'InventoryController@view')->name('inventory.view');
    Route::put('/inventory/update/{id}', 'InventoryController@update')->name('inventory.update');
    Route::put('/inventory/OutwardUpdate/{id}', 'InventoryController@OutwardUpdate')->name('inventory.OutwardUpdate');
    Route::put('/inventory/InwardUpdate/{id}', 'InventoryController@InwardUpdate')->name('inventory.InwardUpdate');
    Route::post('/admin/inventory/delete', 'InventoryController@delete')->name('inventory.delete');
    Route::post('/admin/inventory/deactive', 'InventoryController@deactive')->name('inventory.deactive');

    Route::post('StoreAssignedInventory', 'InventoryController@StoreAssignedInventory')->name('StoreAssignedInventory');


    // Attendance Routes
    Route::get('empattendance', 'AttendenceController@index')->name('empattendance'); 
    Route::post('getLoginData', 'AttendenceController@getLoginData')->name('empattendance.getLoginData');
    Route::post('VerifyAttendance', 'AttendenceController@VerifyAttendance')->name('empattendance.VerifyAttendance');
    Route::get('verifiedAttendence', 'AttendenceController@verifiedAttendence')->name('empattendance.verifiedAttendence');

        
    // Manual Order Assign Routes
    Route::get('manualorderassign', 'OrderController@manualorderassign')->name('manualorderassign'); 
    Route::post('addmanualorderassignUpdate', 'OrderController@addmanualorderassignUpdate')->name('addmanualorderassignUpdate'); 

    

    // Orders
    Route::group(['prefix' => 'orders'], function () {
        Route::get('/', 'OrderController@index')->name('orders');
        Route::get('addorder', 'OrderController@addorder')->name('orders.add');
        // IMPORT ORDER DATA
        Route::get('importOrderData', 'OrderController@importOrderData')->name('orders.importOrderData');
       
        // SERVICES CENTER/ BUSINESS STORE / GET BRANCH CODE / GET CERVICES CENTER BASED ON REGION ID / ADDRESS DETAILS 
        Route::post('serviceStore', 'OrderController@serviceStore')->name('orders.serviceStore');
        Route::post('businessStore', 'OrderController@businessStore')->name('orders.businessStore');
        // Route::put('businessUpdate', 'OrderController@UpdateBusinessRegion')->name('orders.businessUpdate');
        Route::get('region', 'OrderController@viewBusinessRegion')->name('orders.region');
        Route::get('services-center', 'OrderController@viewServicesCenter')->name('orders.services-center');
        Route::get('get-branch-code', 'OrderController@getbranchcode')->name('orders.getbranchcode');
        Route::get('get_services_center/{regionId}', 'OrderController@getServiceCenter')->name('orders.getServiceCenter');
        Route::get('get-customer-data/{cusID}', 'OrderController@getCustomerData')->name('orders.getCustomerData');
        // GET ORDER DATA USING ORDER ID 
        Route::get('get-Order-data/{orderID}', 'OrderController@getOrderData')->name('orders.getOrderData');
        // UPDATE ORDER STATUS 
        Route::post('update-Order-status/', 'OrderController@updateStatus')->name('orders.updateStatus');
        // ADD RESIDENTIAL ORDERS
        Route::get('/get-subcategories/{categoryId}', 'OrderController@getSubcategories')->name('orders.getSubcategories');
        Route::get('/get-services/{subcategoryId}', 'OrderController@getServices')->name('orders.getServices');
        Route::get('/get-coupons/{categoryId}', 'OrderController@getCoupons')->name('orders.getCoupons');
        Route::get('/get-service-variation-type/{serviceId}', 'OrderController@getServiceVariationType')->name('orders.getServiceVariationType');
        Route::get('/get-service-variation-area/{serviceId}/{productId}', 'OrderController@getServiceVariationArea')->name('orders.getServiceVariationArea');
        Route::get('/get-service-details/{id}', 'OrderController@getServiceDetails')->name('orders.getServiceDetails');
        Route::post('storeorder', 'OrderController@storeorder')->name('orders.store');
        Route::get('editorder/{id}', 'OrderController@editorder')->name('orders.editorder');
        Route::put('updateorder/{id}', 'OrderController@updateorder')->name('orders.updateorder');
        Route::get('/order-details/{id}', 'OrderController@orderdetails')->name('payments.orderdetails');
        Route::post('/update', 'OrderController@update')->name('orders.update');
        Route::post('/delete', 'OrderController@delete')->name('orders.delete');
        Route::get('/search', 'OrderController@search')->name('orders.search');
        Route::post('/change/status', 'OrderController@changeStatus')->name('orders.changeStatus');
       
    });

    // Return Orders
    Route::group(['prefix' => 'returnorders'], function () {
        Route::get('/', 'ReturnOrderController@index')->name('returnorders');
        Route::get('/order-details/{id}', 'ReturnOrderController@orderdetails')->name('returnorders.orderdetails');
        Route::get('/search', 'ReturnOrderController@search')->name('returnorders.search');
        Route::post('/change/status', 'ReturnOrderController@changeStatus')->name('returnorders.changeStatus');
    });


        // Payments
    Route::group(['prefix' => 'payments'], function () {
        Route::get('/', 'PaymentController@index')->name('payments');
        Route::post('/change/status', 'PaymentController@changeStatus')->name('payments.changeStatus');
        Route::get('/manage-payment/{id}', 'PaymentController@managepayment')->name('payments.managepayment');
        Route::post('/update', 'PaymentController@update')->name('payments.update');
    });

    // Settings
    Route::group(['prefix' => 'settings'], function () {
        Route::get('/', 'SettingsController@index')->name('settings');
        Route::post('/update', 'SettingsController@update')->name('settings.update');
    });

    // Return policy
    Route::group(['prefix' => 'return-policy'], function () {
        Route::get('/', 'ReturnPolicyController@index')->name('return-policy');
        Route::post('/update', 'ReturnPolicyController@update')->name('return-policy.update');
    });

    // Payout
    Route::group(['prefix' => 'payout'], function () {
        Route::get('/', 'PayoutController@index')->name('payout');
        Route::post('/update', 'PayoutController@update')->name('payout.update');
    });

    // Help
    Route::group(['prefix' => 'help'], function () {
        Route::get('/', 'HelpController@index')->name('help');
        Route::get('/search', 'HelpController@search')->name('help.search');
    });


// About
    Route::group(['prefix' => 'about'], function () {
        Route::get('/', 'AboutController@index')->name('about');
        Route::post('/update', 'AboutController@update')->name('about.update');
    });

    // privacy-policy
    Route::group(['prefix' => 'privacy-policy'], function () {
        Route::get('/', 'PrivacyPolicyController@index')->name('privacy-policy');
        Route::post('/update', 'PrivacyPolicyController@update')->name('privacy-policy.update');
    });

    // terms-conditions
    Route::group(['prefix' => 'terms-conditions'], function () {
        Route::get('/', 'TermsConditionsController@index')->name('terms-conditions');
        Route::post('/update', 'TermsConditionsController@update')->name('terms-conditions.update');
    });



    // Coupons
    Route::group(['prefix' => 'coupons'], function () {
        Route::get('/', 'CouponsController@index')->name('coupons');
        Route::get('/add', 'CouponsController@add')->name('coupons.add');
        Route::get('/show/{id}', 'CouponsController@show')->name('coupons.show');
        Route::get('/list', 'CouponsController@list')->name('coupons.list');
        Route::get('/search', 'CouponsController@search')->name('coupons.search');
        Route::post('/store', 'CouponsController@store')->name('coupons.store');
        Route::post('/update', 'CouponsController@update')->name('coupons.update');
        Route::post('/delete', 'CouponsController@destroy')->name('coupons.delete');
        Route::post('/change/status', 'CouponsController@changeStatus')->name('coupons.changeStatus');
    });


    // Category
    Route::group(['prefix' => 'category'], function () {
        Route::get('/', 'CategoryController@index')->name('category');
        Route::get('/add', 'CategoryController@add')->name('category.add');
        Route::get('/show/{id}', 'CategoryController@show')->name('category.show');
        Route::get('/list', 'CategoryController@list')->name('category.list');
        Route::get('/search', 'CategoryController@search')->name('category.search');
        Route::post('/store', 'CategoryController@store')->name('category.store');
        Route::post('/update', 'CategoryController@update')->name('category.update');
        Route::post('/delete', 'CategoryController@destroy')->name('category.delete');
        Route::post('/change/status', 'CategoryController@changeStatus')->name('category.changeStatus');
    });

    // Subcategory
    Route::group(['prefix' => 'subcategory'], function () {
        Route::get('/', 'SubCategoryController@index')->name('subcategory');
        Route::get('/add', 'SubCategoryController@add')->name('subcategory.add');
        Route::get('/show/{id}', 'SubCategoryController@show')->name('subcategory.show');
        Route::get('/list', 'SubCategoryController@list')->name('subcategory.list');
        Route::get('/search', 'SubCategoryController@search')->name('subcategory.search');
        Route::post('/store', 'SubCategoryController@store')->name('subcategory.store');
        Route::post('/update', 'SubCategoryController@update')->name('subcategory.update');
        Route::post('/delete', 'SubCategoryController@destroy')->name('subcategory.delete');
        Route::post('/change/status', 'SubCategoryController@changeStatus')->name('subcategory.changeStatus');

        // Assign Questions
        Route::get('/getQuestions', 'SubCategoryController@getQuestions')->name('subcategory.getQuestions');
        Route::post('/submitQuestions/{id}', 'SubCategoryController@submitQuestions')->name('subcategory.submitQuestions');
    });

    // InnerSubcategory
    Route::group(['prefix' => 'innersubcategory'], function () {
        Route::get('/', 'InnerSubCategoryController@index')->name('innersubcategory');
        Route::get('/add', 'InnerSubCategoryController@add')->name('innersubcategory.add');
        Route::get('/show/{id}', 'InnerSubCategoryController@show')->name('innersubcategory.show');
        Route::get('/list', 'InnerSubCategoryController@list')->name('innersubcategory.list');
        Route::get('/search', 'InnerSubCategoryController@search')->name('innersubcategory.search');
        Route::post('/store', 'InnerSubCategoryController@store')->name('innersubcategory.store');
        Route::post('/update', 'InnerSubCategoryController@update')->name('innersubcategory.update');
        Route::post('/delete', 'InnerSubCategoryController@destroy')->name('innersubcategory.delete');
        Route::post('/change/status', 'InnerSubCategoryController@changeStatus')->name('innersubcategory.changeStatus');
        Route::post('/change/subcat', 'InnerSubCategoryController@subcat')->name('innersubcategory.subcat');
    });

    // Color
    Route::group(['prefix' => 'color'], function () {
        Route::get('/', 'ColorController@index')->name('color');
        Route::get('/add', 'ColorController@add')->name('color.add');
        Route::get('/show/{id}', 'ColorController@show')->name('color.show');
        Route::get('/list', 'ColorController@list')->name('color.list');
        Route::post('/store', 'ColorController@store')->name('color.store');
        Route::post('/update', 'ColorController@update')->name('color.update');
        Route::post('/delete', 'ColorController@destroy')->name('color.delete');
        Route::post('/change/status', 'ColorController@changeStatus')->name('color.changeStatus');
    });

    // Attribute
    Route::group(['prefix' => 'attribute'], function () {
        Route::get('/', 'AttributeController@index')->name('attribute');
        Route::get('/add', 'AttributeController@add')->name('attribute.add');
        Route::get('/show/{id}', 'AttributeController@show')->name('attribute.show');
        Route::get('/list', 'AttributeController@list')->name('attribute.list');
        Route::get('/search', 'AttributeController@search')->name('attribute.search');
        Route::post('/store', 'AttributeController@store')->name('attribute.store');
        Route::post('/update', 'AttributeController@update')->name('attribute.update');
        Route::post('/delete', 'AttributeController@destroy')->name('attribute.delete');
        Route::post('/change/status', 'AttributeController@changeStatus')->name('attribute.changeStatus');
    });

    // Brand
    Route::group(['prefix' => 'brand'], function () {
        Route::get('/', 'BrandController@index')->name('brand');
        Route::get('/add', 'BrandController@add')->name('brand.add');
        Route::get('/show/{id}', 'BrandController@show')->name('brand.show');
        Route::get('/list', 'BrandController@list')->name('brand.list');
        Route::get('/search', 'BrandController@search')->name('brand.search');
        Route::post('/store', 'BrandController@store')->name('brand.store');
        Route::post('/update', 'BrandController@update')->name('brand.update');
        Route::post('/delete', 'BrandController@destroy')->name('brand.delete');
        Route::post('/change/status', 'BrandController@changeStatus')->name('brand.changeStatus');
    });

    // Slider
    Route::group(['prefix' => 'slider'], function () {
        Route::get('/', 'SliderController@index')->name('slider');
        Route::get('/add', 'SliderController@add')->name('slider.add');
        Route::get('/show/{id}', 'SliderController@show')->name('slider.show');
        Route::get('/list', 'SliderController@list')->name('slider.list');
        Route::post('/store', 'SliderController@store')->name('slider.store');
        Route::post('/update', 'SliderController@update')->name('slider.update');
        Route::post('/delete', 'SliderController@destroy')->name('slider.delete');
        Route::post('/change/status', 'SliderController@changeStatus')->name('slider.changeStatus');
    });


    // Users
    Route::group(['prefix' => 'customers'], function () {
        Route::get('/', 'CustomerController@index')->name('customers');
        Route::get('/user-profile', 'CustomerController@vendorprofile')->name('user-profile');
        Route::post('/update', 'CustomerController@update')->name('users.update');
        Route::get('/search', 'CustomerController@search')->name('users.search');
        Route::post('/change/status', 'CustomerController@changeStatus')->name('users.changeStatus');
        Route::get('/user-details/{id}', 'CustomerController@vendordetails')->name('users.vendordetails');
        Route::post('/delete', 'CustomerController@destroy')->name('users.delete');

        // Users Bulk Upload
        Route::get('/bulkupload', 'CustomerController@bulkupload')->name('bulkupload');
        Route::post('/store_bulkupload', 'CustomerController@store_bulkupload')->name('store_bulkupload');
    });


    // Products
    Route::group(['prefix' => 'product'], function () {
        Route::get('/', 'ProductController@index')->name('product');
        Route::get('/add', 'ProductController@add')->name('products.add');
        Route::get('/show/{id}', 'ProductController@show')->name('products.show');
        Route::get('/list', 'ProductController@list')->name('products.list');
        Route::get('/search', 'ProductController@search')->name('products.search');
        Route::post('/store', 'ProductController@store')->name('products.store');
        Route::post('/update', 'ProductController@update')->name('products.update');
        Route::post('/delete', 'ProductController@destroy')->name('products.delete');
        Route::post('/change/status', 'ProductController@changeStatus')->name('products.changeStatus');
        Route::post('/change/subcat', 'ProductController@subcat')->name('products.subcat');
        Route::post('/change/innersubcat', 'ProductController@innersubcat')->name('products.innersubcat');
        Route::post('/showimage', 'ProductController@showimage')->name('products.showimage');
        Route::post('/updateimage', 'ProductController@updateimage')->name('products.updateimage');
        Route::post('/destroyimage', 'ProductController@destroyimage')->name('products.destroyimage');
        Route::post('/storeimages', 'ProductController@storeimages')->name('products.storeimages');
    });

        // Banner
    Route::group(['prefix' => 'banner'], function () {
        Route::get('/', 'BannerController@index')->name('banner');
        Route::get('/add', 'BannerController@add')->name('banner.add');
        Route::get('/show/{id}', 'BannerController@show')->name('banner.show');
        Route::get('/list', 'BannerController@list')->name('banner.list');
        Route::post('/store', 'BannerController@store')->name('banner.store');
        Route::post('/update', 'BannerController@update')->name('banner.update');
        Route::post('/delete', 'BannerController@destroy')->name('banner.delete');
        Route::post('/change/status', 'BannerController@changeStatus')->name('banner.changeStatus');
    });

    // Variation
    Route::group(['prefix' => 'variation'], function () {
        Route::post('/delete', 'VariationController@destroy')->name('variation.delete');
    });

//  thoughtful-curations


    Route::group(['prefix'=> 'thoughtful-curations'], function () {
        Route::get('/', 'ThoughtfulCurationController@index')->name('thoughtful-curations');
        Route::get('/add', 'ThoughtfulCurationController@create')->name('thoughtful-curations.add');
        Route::post('/store', 'ThoughtfulCurationController@store')->name('thoughtful-curations.store');
        Route::get('/edit{id}', 'ThoughtfulCurationController@edit')->name('thoughtful-curations.edit');
        Route::post('/update/{id}', 'ThoughtfulCurationController@update')->name('thoughtful-curations.update'); 
        Route::delete('/thoughtful-curations/{id}/delete', 'ThoughtfulCurationController@destroy')->name('thoughtful-curations.delete');


        
        
    });

    // COMPALINT MANAGEMENT 
    Route::group(['prefix'=> 'complaint'], function () {
        Route::get('/', 'ComplaintController@index')->name('complaint');
        Route::get('/add', 'ComplaintController@create')->name('complaint.add');
        Route::post('/store', 'ComplaintController@store')->name('complaint.store'); 
        Route::get('/edit/{id}', 'ComplaintController@edit')->name('complaint.edit');
        Route::get('/view/{id}', 'ComplaintController@view')->name('complaint.view');
        Route::post('/update/{id}', 'ComplaintController@update')->name('complaint.update');
        Route::post('/delete', 'ComplaintController@destroy')->name('complaint.delete'); 
        Route::get('get-Order-data/{orderID}', 'ComplaintController@getOrderData')->name('complaint.getOrderData');
    });

    //MANAGE businessregistration
    Route::group(['prefix'=> 'businessregistration'], function () {
        Route::get('/', 'BusinessRegistrationController@index')->name('businessregistration');
        Route::get('/add', 'BusinessRegistrationController@create')->name('businessregistration.add');
        Route::get('/edit/{id}', 'BusinessRegistrationController@edit')->name('businessregistration.edit');
        Route::post('/update/{id}', 'BusinessRegistrationController@update')->name('businessregistration.update');
        Route::post('/delete', 'BusinessRegistrationController@destroy')->name('BusinessRegistrationController.delete'); 
    });

    // INSPECTIONS MANAGEMENT  
    Route::group(['prefix'=> 'inspections'], function () {
        Route::get('/', 'InspectionsController@index')->name('inspections');
        Route::get('/add', 'InspectionsController@create')->name('inspections.add');
        Route::post('/store', 'InspectionsController@store')->name('inspections.store');
    });

    // MANAGE APP HEADER 
    Route::group(['prefix'=> 'appheader'], function () {
        Route::get('/', 'AppHeaderController@index')->name('appheader');
        Route::post('/change/status', 'AppHeaderController@changeStatus')->name('appheader.changeStatus');
        Route::post('/update/{id}', 'AppHeaderController@update')->name('appheader.update');
    });

    // SEARCH STATE
    Route::get('/get-states', function (\Illuminate\Http\Request $request) {
        $zone = $request->query('zone');
        $states = \App\Models\Business_region::where('zone', 'LIKE', "%$zone%")->pluck('state');
        return response()->json($states);
    });

      // MANAGE BLOGS 
      Route::group(['prefix'=> 'blogs'], function () {
        Route::get('/', 'BlogsController@index')->name('blogs');
        Route::get('/add', 'BlogsController@create')->name('blogs.add');
        Route::post('/store', 'BlogsController@store')->name('blogs.store');
        Route::get('/edit/{id}', 'BlogsController@edit')->name('blogs.edit');
        Route::post('/update/{id}', 'BlogsController@update')->name('blogs.update');
        Route::post('/change/status', 'BlogsController@changeStatus')->name('blogs.changeStatus');
        Route::post('/delete', 'BlogsController@destroy')->name('blogs.delete');

    // MANAGE BLOG CATEGORY
        Route::get('/blogcategoryindex', 'BlogsController@blogCategoryIndex')->name('blogs.blogcategoryindex');
        Route::get('/blogcategoryadd', 'BlogsController@blogCategoryCreate')->name('blogs.blogcategoryadd');
        Route::post('/blogcategorystore', 'BlogsController@blogCategoryStore')->name('blogs.blogcategorystore');
        Route::get('/blogcategoryedit/{id}', 'BlogsController@blogCategoryEdit')->name('blogs.blogcategoryedit');
        Route::post('/blogcategoryupdate/{id}', 'BlogsController@blogCategoryUpdate')->name('blogs.blogcategoryupdate');
        Route::post('/blogcategorychange/status', 'BlogsController@changeStatus')->name('blogs.blogcategorychange');
        Route::post('/blogcategorydelete', 'BlogsController@blogCategoryDestroy')->name('blogs.blogcategorydelete');
    });

    // ADD PINCODE
    Route::group(['prefix'=> 'addpincode'], function () {
        Route::get('/', 'AddPincodeController@index')->name('addpincode');
        Route::get('/add', 'AddPincodeController@create')->name('addpincode.add');
        Route::post('/store', 'AddPincodeController@store')->name('addpincode.store');
        Route::get('/edit/{id}', 'AddPincodeController@edit')->name('addpincode.edit');
        Route::post('/update/{id}', 'AddPincodeController@update')->name('addpincode.update');
        Route::post('/change/status', 'AddPincodeController@changeStatus')->name('addpincode.changeStatus');
        Route::post('/delete{id}', 'AddPincodeController@destroy')->name('addpincode.delete');
    });

    // MANAGE LANDING PAGE TEMPLATE
    Route::group(['prefix'=> 'landingpage'], function () {
        Route::get('/', 'LandingPageController@index')->name('landingpage');
        Route::get('/add', 'LandingPageController@create')->name('landingpage.add');
        Route::post('/store', 'LandingPageController@store')->name('landingpage.store');
        Route::get('/edit/{id}', 'LandingPageController@edit')->name('landingpage.edit');
        Route::post('/update/{id}', 'LandingPageController@update')->name('landingpage.update');
        Route::post('/change/status', 'LandingPageController@changeStatus')->name('landingpage.changeStatus');
        Route::post('/delete', 'LandingPageController@destroy')->name('landingpage.delete');
    });


    // SEO PAGE
    Route::group(['prefix'=> 'seopages'], function () {
        Route::get('/', 'SeoPagesController@index')->name('seopages');
        Route::get('/add', 'SeoPagesController@create')->name('seopages.add');
        Route::post('/store', 'SeoPagesController@store')->name('seopages.store');
        Route::get('/edit/{id}', 'SeoPagesController@edit')->name('seopages.edit');
        Route::post('/update/{id}', 'SeoPagesController@update')->name('seopages.update');
        Route::post('/change/status', 'SeoPagesController@changeStatus')->name('seopages.changeStatus');
        Route::post('/delete', 'SeoPagesController@destroy')->name('seopages.delete');
    });

    // MANAGE HOME PAGE SECTIONS
    Route::group(['prefix'=> 'homepagesections'], function () {
        Route::get('/', 'HomePageSectionsController@index')->name('homepagesections');
        Route::get('/addhero', 'HomePageSectionsController@createHero')->name('homepagesections.addhero');
        Route::post('/storehero', 'HomePageSectionsController@storeHero')->name('homepagesections.storehero');
        Route::get('/edithero/{id}', 'HomePageSectionsController@editHero')->name('homepagesections.edithero');
        Route::post('/updatehero/{id}', 'HomePageSectionsController@updateHero')->name('homepagesections.updatehero');
        Route::post('/changestatushero/status', 'HomePageSectionsController@changeStatusHero')->name('homepagesections.changestatushero');
        Route::post('/deletehero', 'HomePageSectionsController@destroyHero')->name('homepagesections.deletehero');

        Route::get('/viewOffer', 'HomePageSectionsController@viewOffer')->name('homepagesections.viewOffer');
        Route::get('/addOffer', 'HomePageSectionsController@addOffer')->name('homepagesections.addOffer');
        Route::post('/storeOffer', 'HomePageSectionsController@storeOffer')->name('homepagesections.storeOffer');
        Route::get('/editOffer/{id}', 'HomePageSectionsController@editOffer')->name('homepagesections.editOffer');
        Route::post('/updateOffer/{id}', 'HomePageSectionsController@updateOffer')->name('homepagesections.updateOffer');
        
    });
    
});
