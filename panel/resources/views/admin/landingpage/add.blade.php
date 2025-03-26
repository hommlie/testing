@extends('layouts.admin')

@section('content')
<div class="container">
    <div class="card">
        <div class="card-header">
            <h4>Add Landing Page</h4>
        </div>
        <div class="card-body">
            <form action="{{ route('admin.landingpage.store') }}" method="POST" enctype="multipart/form-data">
                @csrf

                <!-- TITLE & SUBTITLE -->
                <div class="row">
                    <div class="col-md-6">
                        <label class="form-label">Title</label>
                        <input type="text" name="title" class="form-control" placeholder="Enter title" required>
                        @error('title') <span class="text-danger">{{ $message }}</span> @enderror
                    </div>

                    <div class="col-md-6">
                        <label class="form-label">Subtitle</label>
                        <input type="text" name="sub_title" class="form-control" placeholder="Enter subtitle" required>
                        @error('sub_title') <span class="text-danger">{{ $message }}</span> @enderror
                    </div>
                </div>

                <!-- HERO IMAGE & BANNER -->
                <div class="row mt-3">
                    <div class="col-md-6">
                        <label class="form-label">Hero Image</label>
                        <input type="file" name="hero_image" class="form-control" required>
                        @error('hero_image') <span class="text-danger">{{ $message }}</span> @enderror
                    </div>

                    <div class="col-md-6">
                        <label class="form-label">Banner</label>
                        <input type="file" name="banner" class="form-control" required>
                        @error('banner') <span class="text-danger">{{ $message }}</span> @enderror
                    </div>
                </div>

                <!-- WHY CHOOSE SECTION -->
                <div class="row mt-3">
                    <div class="col-md-6">
                        <label class="form-label">Why Choose Title</label>
                        <input type="text" name="why_choose_title" class="form-control" placeholder="Enter why choose title" required>
                        @error('why_choose_title') <span class="text-danger">{{ $message }}</span> @enderror
                    </div>

                    <div class="col-md-6">
                        <label class="form-label">Why Choose Subtitle</label>
                        <input type="text" name="why_choose_subtitle" class="form-control" placeholder="Enter why choose subtitle" required>
                        @error('why_choose_subtitle') <span class="text-danger">{{ $message }}</span> @enderror
                    </div>
                </div>

                <!-- WHY CHOOSE BANNER & CATEGORY -->
                <div class="row mt-3">
                    <div class="col-md-6">
                        <label class="form-label">Why Choose Banner</label>
                        <input type="file" name="why_choose_banner" class="form-control" required>
                        @error('why_choose_banner') <span class="text-danger">{{ $message }}</span> @enderror
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Category</label>
                        <select name="cat_id" class="form-control" required>
                            <option value="">Select Category</option>
                            @foreach($categories as $category)
                                <option value="{{ $category->id }}">{{ $category->category_name }}</option>
                            @endforeach
                        </select>
                        @error('cat_id') <span class="text-danger">{{ $message }}</span> @enderror
                    </div>
                </div>

                <!-- SLUG & ALT TAG -->
                <div class="row mt-3">
                    <div class="col-md-6">
                        <label class="form-label">Slug</label>
                        <input type="text" name="slug" class="form-control" placeholder="Enter slug" required>
                        @error('slug') <span class="text-danger">{{ $message }}</span> @enderror
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Alt Tag</label>
                        <input type="text" name="alt_tag" class="form-control" placeholder="Enter alt tag" required>
                        @error('alt_tag') <span class="text-danger">{{ $message }}</span> @enderror
                    </div>
                </div>

                <!-- IMAGE TITLE & META TITLE -->
                <div class="row mt-3">
                    <div class="col-md-6">
                        <label class="form-label">Image Title</label>
                        <input type="text" name="image_title" class="form-control" placeholder="Enter image title" required>
                        @error('image_title') <span class="text-danger">{{ $message }}</span> @enderror
                    </div>

                    <div class="col-md-6">
                        <label class="form-label">Meta Title</label>
                        <input type="text" name="meta_title" class="form-control" placeholder="Enter meta title" required>
                        @error('meta_title') <span class="text-danger">{{ $message }}</span> @enderror
                    </div>
                </div>

                <!-- META DESCRIPTION -->
                <div class="row mt-3">
                    <div class="col-md-12">
                        <label class="form-label">Meta Description</label>
                        <textarea name="meta_description" class="form-control" rows="3" placeholder="Enter meta description" required ></textarea>
                        @error('meta_description') <span class="text-danger">{{ $message }}</span> @enderror
                    </div>
                </div>

                <!-- WHY CHOOSE CONTENT -->
                <div class="row mt-3 card">
                    <div class="col-md-12"><br>
                        <label class="form-label">Why Choose Content</label>
                        <div id="whyChooseContainer">
                            <div class="mt-2 p-3 why-choose-card">
                                <div class="row" style="border: solid 1px white; box-shadow: 0 4px 8px rgba(178, 236, 178, 0.5); border-radius: 5px;">
                                    <div class="col-md-12">
                                        <label class="form-label">Title</label>
                                        <input type="text" name="why_choose_content[0][title]" class="form-control" placeholder="Enter title" required>
                                        @error('why_choose_content.0.title') <span class="text-danger">{{ $message }}</span> @enderror
                                    </div>
                                    <div class="col-md-12 mt-2">
                                        <label class="form-label">Description</label>
                                        <textarea name="why_choose_content[0][description]" class="form-control" rows="1" placeholder="Enter description" required></textarea>
                                        @error('why_choose_content.0.description') <span class="text-danger">{{ $message }}</span> @enderror
                                    </div>
                                    <div class="col-md-12 text-end mt-2">
                                        <button type="button" class="btn btn-danger remove-card float-right">-</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <span id="error-message" class="text-danger" style="display: none;">At least one Why Choose Content is required.</span>
                        <button type="button" class="btn btn-success mt-2 float-right" id="addWhyChoose">+</button>
                    </div>
                    <br>
                </div>

                <!-- SUBMIT & CANCEL BUTTONS -->
                <div class="row mt-3">
                    <div class="col-md-12 text-end">
                        <button type="submit" class="btn btn-primary">Save</button>
                        <a href="{{ route('admin.landingpage') }}" class="btn btn-secondary">Cancel</a>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection


<script>
document.addEventListener("DOMContentLoaded", function () {
    let whyChooseContainer = document.getElementById("whyChooseContainer");
    let addWhyChooseButton = document.getElementById("addWhyChoose");
    let errorMessage = document.getElementById("error-message");

    addWhyChooseButton.addEventListener("click", function () {
        let index = document.querySelectorAll(".why-choose-card").length;

        let newCard = document.createElement("div");
        newCard.classList.add("card", "mt-2", "p-3", "why-choose-card");
        newCard.innerHTML = `
            <div class="row" style="border: solid 1px white; box-shadow: 0 4px 8px rgba(178, 236, 178, 0.5); border-radius: 5px;">
                <div class="col-md-12">
                    <label class="form-label">Title</label>
                    <input type="text" name="why_choose_content[\${index}][title]" class="form-control" placeholder="Enter title" required>
                </div>
                <div class="col-md-12 mt-2">
                    <label class="form-label">Description</label>
                    <textarea name="why_choose_content[\${index}][description]" class="form-control" rows="1" placeholder="Enter description" required></textarea>
                </div>
                <div class="col-md-12 text-end mt-2">
                    <button type="button" class="btn btn-danger remove-card float-right">-</button>
                </div>
            </div>
        `;
        whyChooseContainer.appendChild(newCard);
        errorMessage.style.display = "none";
    });

    whyChooseContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-card")) {
            let cards = document.querySelectorAll(".why-choose-card");
            if (cards.length > 1) {
                event.target.closest(".why-choose-card").remove();
            } else {
                errorMessage.style.display = "block";
            }
        }
    });
});
</script>
