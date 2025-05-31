@extends('layouts.admin')

@section('content')
<div class="container">
    <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
            <h4 class="mb-0">Add Landing Page</h4>
            <div class="input-group" style="margin-left: auto; width: 400px;">
                <input type="text" id="search" class="form-control rounded-0" placeholder="Enter Blog ID">
                <button type="button" id="searchBtn" class="btn btn-primary rounded-0">Search</button>
                <button type="button" id="resetBtn" class="btn btn-secondary rounded-0 ml-2">Reset</button>
            </div>
        </div>
        <span id="searchError" class="text-danger" style="display:block; margin:5px 0;"></span>
        <div class="card-body">
            <form id="landingForm" action="{{ route('admin.landingpage.store') }}" method="POST" enctype="multipart/form-data">
                @csrf

                <!-- TITLE & SUBTITLE -->
                <div class="row">
                    <div class="col-md-6">
                        <label class="form-label">Title</label>
                        <input type="text" id="title" name="title" class="form-control" placeholder="Enter title" required>
                        @error('title') <span class="text-danger">{{ $message }}</span> @enderror
                    </div>

                    <div class="col-md-6">
                        <label class="form-label">Subtitle</label>
                        <input type="text" id="sub_title" name="sub_title" class="form-control" placeholder="Enter subtitle" required>
                        @error('sub_title') <span class="text-danger">{{ $message }}</span> @enderror
                    </div>
                </div>

                <!-- HERO IMAGE & BANNER -->
                <div class="row mt-3">
                    <div class="col-md-6">
                        <label class="form-label">Hero Image</label>
                        <input type="file" id="hero_image" name="hero_image" class="form-control" required>
                        @error('hero_image') <span class="text-danger">{{ $message }}</span> @enderror
                    </div>

                    <div class="col-md-6">
                        <label class="form-label">Banner</label>
                        <input type="file" id="banner" name="banner" class="form-control" required>
                        @error('banner') <span class="text-danger">{{ $message }}</span> @enderror
                    </div>
                </div>

                <!-- WHY CHOOSE SECTION -->
                <div class="row mt-3">
                    <div class="col-md-6">
                        <label class="form-label">Why Choose Title</label>
                        <input type="text" id="why_choose_title" name="why_choose_title" class="form-control" placeholder="Enter why choose title" required>
                        @error('why_choose_title') <span class="text-danger">{{ $message }}</span> @enderror
                    </div>

                    <div class="col-md-6">
                        <label class="form-label">Why Choose Subtitle</label>
                        <input type="text" id="why_choose_subtitle" name="why_choose_subtitle" class="form-control" placeholder="Enter why choose subtitle" required>
                        @error('why_choose_subtitle') <span class="text-danger">{{ $message }}</span> @enderror
                    </div>
                </div>

                <!-- WHY CHOOSE BANNER & CATEGORY -->
                <div class="row mt-3">
                    <div class="col-md-6">
                        <label class="form-label">Why Choose Banner</label>
                        <input type="file" id="why_choose_banner" name="why_choose_banner" class="form-control" required>
                        @error('why_choose_banner') <span class="text-danger">{{ $message }}</span> @enderror
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Category</label>
                        <select id="cat_id" name="cat_id" class="form-control" required>
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
                        <input type="text" id="slug" name="slug" class="form-control" placeholder="Enter slug" required>
                        @error('slug') <span class="text-danger">{{ $message }}</span> @enderror
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Alt Tag</label>
                        <input type="text" id="alt_tag" name="alt_tag" class="form-control" placeholder="Enter alt tag" required>
                        @error('alt_tag') <span class="text-danger">{{ $message }}</span> @enderror
                    </div>
                </div>

                <!-- IMAGE TITLE & META TITLE -->
                <div class="row mt-3">
                    <div class="col-md-6">
                        <label class="form-label">Image Title</label>
                        <input type="text" id="image_title" name="image_title" class="form-control" placeholder="Enter image title" required>
                        @error('image_title') <span class="text-danger">{{ $message }}</span> @enderror
                    </div>

                    <div class="col-md-6">
                        <label class="form-label">Meta Title</label>
                        <input type="text" id="meta_title" name="meta_title" class="form-control" placeholder="Enter meta title" required>
                        @error('meta_title') <span class="text-danger">{{ $message }}</span> @enderror
                    </div>
                </div>

                <!-- META DESCRIPTION -->
                <div class="row mt-3">
                    <div class="col-md-12">
                        <label class="form-label">Meta Description</label>
                        <textarea id="meta_description" name="meta_description" class="form-control" rows="3" placeholder="Enter meta description" required></textarea>
                        @error('meta_description') <span class="text-danger">{{ $message }}</span> @enderror
                    </div>
                </div>

                <!-- WHY CHOOSE CONTENT -->
                <div class="row mt-3 card">
                    <div class="col-md-12"><br>
                        <label class="form-label">Why Choose Content</label>
                        <div id="whyChooseContainer">
                            <!-- Dynamic cards go here -->
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

@section('scripts')
<script>
document.addEventListener("DOMContentLoaded", function () {
    const whyChooseContainer = document.getElementById("whyChooseContainer");
    const addWhyChooseButton = document.getElementById("addWhyChoose");
    const errorMessage = document.getElementById("error-message");

    function createWhyChooseCard(item, index) {
        const card = document.createElement("div");
        card.classList.add("card", "mt-2", "p-3", "why-choose-card");
        card.innerHTML = `
            <div class="row" style="border: solid 1px white; box-shadow: 0 4px 8px rgba(178, 236, 178, 0.5); border-radius: 5px;">
                <div class="col-md-12">
                    <label class="form-label">Title</label>
                    <input type="text" name="why_choose_content[${index}][title]" class="form-control" placeholder="Enter title" required value="${item.title}">
                </div>
                <div class="col-md-12 mt-2">
                    <label class="form-label">Description</label>
                    <textarea name="why_choose_content[${index}][description]" class="form-control" rows="1" placeholder="Enter description" required>${item.description}</textarea>
                </div>
                <div class="col-md-12 text-end mt-2">
                    <button type="button" class="btn btn-danger remove-card float-right">-</button>
                </div>
            </div>
        `;
        return card;
    }

    addWhyChooseButton.addEventListener("click", function () {
        const index = whyChooseContainer.querySelectorAll(".why-choose-card").length;
        const emptyItem = { title: "", description: "" };
        whyChooseContainer.appendChild(createWhyChooseCard(emptyItem, index));
        errorMessage.style.display = "none";
    });

    whyChooseContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-card")) {
            const cards = document.querySelectorAll(".why-choose-card");
            if (cards.length > 1) {
                event.target.closest(".why-choose-card").remove();
            } else {
                errorMessage.style.display = "block";
            }
        }
    });

    const searchInput = document.getElementById('search');
    const searchBtn = document.getElementById('searchBtn');
    const resetBtn = document.getElementById('resetBtn');
    const errorSpan = document.getElementById('searchError');

    searchInput.addEventListener('input', () => {
        searchInput.value = searchInput.value.replace(/\D+/g, '');
        errorSpan.textContent = '';
    });

    searchBtn.addEventListener('click', () => {
        const id = searchInput.value.trim();
        if (!id) {
            errorSpan.textContent = 'Please enter a numeric ID.';
            return;
        }
        const url = `{{ route('admin.landingpage.getLandingPageData', ['id' => ':id']) }}`.replace(':id', id);

        fetch(url)
            .then(res => { if (!res.ok) throw new Error(res.status); return res.json(); })
            .then(response => {
                const data = Array.isArray(response) ? response[0] : response;
                // Populate form fields
                document.getElementById('title').value = data.title || '';
                document.getElementById('sub_title').value = data.sub_title || '';
                document.getElementById('why_choose_title').value = data.why_choose_title || '';
                document.getElementById('why_choose_subtitle').value = data.why_choose_subtitle || '';
                document.getElementById('cat_id').value = data.cat_id || '';
                document.getElementById('slug').value = data.slug || '';
                document.getElementById('alt_tag').value = data.alt_tag || '';
                document.getElementById('image_title').value = data.image_title || '';
                document.getElementById('meta_title').value = data.meta_title || '';
                document.getElementById('meta_description').value = data.meta_description || '';

                // Populate Why Choose content
                let contentArr = [];
                try {
                    contentArr = JSON.parse(data.why_choose_content || '[]');
                } catch(e) {
                    console.error('Invalid JSON for why_choose_content', e);
                }
                whyChooseContainer.innerHTML = '';
                contentArr.forEach((item, idx) => {
                    whyChooseContainer.appendChild(createWhyChooseCard(item, idx));
                });
                errorSpan.textContent = '';
            })
            .catch(err => {
                console.error(err);
                errorSpan.textContent = 'Failed to load data.';
            });
    });

    resetBtn.addEventListener('click', () => {
        document.getElementById('landingForm').reset();
        whyChooseContainer.innerHTML = '';
        errorSpan.textContent = '';
        // Initialize one empty card
        whyChooseContainer.appendChild(createWhyChooseCard({ title: '', description: '' }, 0));
    });

    // Initialize with one empty card on load
    whyChooseContainer.appendChild(createWhyChooseCard({ title: '', description: '' }, 0));
});
</script>
@endsection
