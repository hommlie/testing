    @extends('layouts.admin')

    @section('content')
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h4>Edit Landing Page</h4>
            </div>
            <div class="card-body">
                <!-- FORM START -->
                <form action="{{ route('admin.landingpage.update', $landingpage->id) }}" method="POST" enctype="multipart/form-data">
                    @csrf
                

                    <!-- TITLE & SUBTITLE -->
                    <div class="row">
                        <div class="col-md-6">
                            <label class="form-label">Title</label>
                            <input type="text" name="title" value="{{ $landingpage->title }}" class="form-control" required>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Subtitle</label>
                            <input type="text" name="sub_title" value="{{ $landingpage->sub_title }}" class="form-control" required>
                        </div>
                    </div>

                    <!-- HERO IMAGE & BANNER -->
                    <div class="row mt-3">
                        <div class="col-md-6">
                            <label class="form-label">Hero Image</label>
                            <input type="file" name="hero_image" class="form-control">
                            @if($landingpage->hero_image)
                                <img src="{{ asset('/storage/app/public/images/landing/'.$landingpage->hero_image) }}" alt="Hero Image" width="100">
                            @endif
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Banner</label>
                            <input type="file" name="banner" class="form-control">
                            @if($landingpage->banner)
                                <img src="{{ asset('/storage/app/public/images/landing/'.$landingpage->banner) }}" alt="Banner" width="100">
                            @endif
                        </div>
                    </div>

                    <!-- WHY CHOOSE SECTION -->
                    <div class="row mt-3">
                        <div class="col-md-6">
                            <label class="form-label">Why Choose Title</label>
                            <input type="text" name="why_choose_title" value="{{ $landingpage->why_choose_title }}" class="form-control" required>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Why Choose Subtitle</label>
                            <input type="text" name="why_choose_subtitle" value="{{ $landingpage->why_choose_subtitle }}" class="form-control" required>
                        </div>
                    </div>

                    <!-- WHY CHOOSE BANNER & CONTENT -->
                    <div class="row mt-3">
                        <div class="col-md-6">
                            <label class="form-label">Why Choose Banner</label>
                            <input type="file" name="why_choose_banner" class="form-control">
                            @if($landingpage->why_choose_banner)
                                <img src="{{ asset('/storage/app/public/images/landing/'.$landingpage->why_choose_banner) }}" alt="Why Choose Banner" width="100">
                            @endif
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Category</label>
                            <select name="cat_id" class="form-control" required>
                                @foreach($categories as $category)
                                    <option value="{{ $category->id }}" {{ $landingpage->cat_id == $category->id ? 'selected' : '' }}>
                                        {{ $category->category_name }}
                                    </option>
                                @endforeach
                            </select>
                        </div>
                    </div>

                    <!-- CATEGORY & SLUG -->
                    <div class="row mt-3">
                        <div class="col-md-6">
                            <label class="form-label">Slug</label>
                            <input type="text" name="slug" value="{{ $landingpage->slug }}" class="form-control" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Alt Tag</label>
                            <input type="text" name="alt_tag" value="{{ $landingpage->alt_tag }}" class="form-control" required>
                        </div>
                    </div>
                    <!-- IMAGE TITLE & META TITLE -->
                    <div class="row mt-3">
                        <div class="col-md-6">
                            <label class="form-label">Image Title</label>
                            <input type="text" name="image_title" value="{{ $landingpage->image_title }}" class="form-control" required>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Meta Title</label>
                            <input type="text" name="meta_title" value="{{ $landingpage->meta_title }}" class="form-control" required>
                        </div>
                    </div>

                    <!-- META DESCRIPTION -->
                    <div class="row mt-3">
                        <div class="col-md-12">
                            <label class="form-label">Meta Description</label>
                            <textarea name="meta_description" class="form-control" rows="3" required>{{ $landingpage->meta_description }}</textarea>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-12 mt-3">
                            <label class="form-label">Why Choose Content</label>
                            <div id="whyChooseContainer">
                                @php
                                    $whyChooseData = json_decode($landingpage->why_choose_content, true);
                                @endphp

                                @if(!empty($whyChooseData))
                                    @foreach($whyChooseData as $key => $item)
                                        <div class="card mt-2 why-choose-card p-3" style="border: solid 1px white; box-shadow: 0 4px 8px rgba(178, 236, 178, 0.5); border-radius: 5px;">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <label class="form-label">Title</label>
                                                    <input type="text" name="why_choose_content[{{ $key }}][title]" value="{{ $item['title'] }}" class="form-control" required>
                                                </div>
                                                <div class="col-md-12 mt-2">
                                                    <label class="form-label">Description</label>
                                                    <textarea name="why_choose_content[{{ $key }}][description]" class="form-control" rows="1" required>{{ $item['description'] }}</textarea>
                                                </div>
                                                <div class="col-md-12 text-end mt-2">
                                                    <button type="button" class="btn btn-danger remove-card float-right">-</button>
                                                </div>
                                            </div>
                                        </div>
                                    @endforeach
                                @endif
                                <span id="whyChooseError" class="text-danger"></span>
                            </div>
                            <button type="button" class="btn btn-success mt-2 float-right" id="addWhyChoose">+</button>
                        </div>
                        <br>
                    </div>
                    <!-- SUBMIT & CANCEL BUTTONS -->
                    <div class="row mt-3">
                        <div class="col-md-12 text-end">
                            <button type="submit" class="btn btn-primary">Update</button>
                            <a href="{{ route('admin.landingpage') }}" class="btn btn-secondary">Cancel</a>
                        </div>
                    </div>

                </form>
                <!-- FORM END -->
            </div>
        </div>
    </div>
    @endsection
<script>
document.addEventListener("DOMContentLoaded", function () {
    let whyChooseContainer = document.getElementById("whyChooseContainer");
    let addWhyChooseButton = document.getElementById("addWhyChoose");
    let errorMessage = document.getElementById("whyChooseError");
    let form = document.querySelector("form");

    addWhyChooseButton.addEventListener("click", function () {
        let index = document.querySelectorAll(".why-choose-card").length;

        let newCard = document.createElement("div");
        newCard.classList.add("card", "mt-2", "p-3", "why-choose-card");
        newCard.innerHTML = `
            <div class="row" style="border: solid 1px white; box-shadow: 0 4px 8px rgba(178, 236, 178, 0.5); border-radius: 5px;">
                <div class="col-md-12">
                    <label class="form-label">Title</label>
                    <input type="text" name="why_choose_content[${index}][title]" class="form-control" required>
                </div>
                <div class="col-md-12 mt-2">
                    <label class="form-label">Description</label>
                    <textarea name="why_choose_content[${index}][description]" class="form-control" rows="1" required></textarea>
                </div>
                <div class="col-md-12 text-end mt-2">
                    <button type="button" class="btn btn-danger remove-card float-right">-</button>
                </div>
            </div>
        `;

        whyChooseContainer.appendChild(newCard);
    });

    whyChooseContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-card")) {
            let cards = document.querySelectorAll(".why-choose-card");
            if (cards.length > 1) {
                event.target.closest(".why-choose-card").remove();
            } else {
                errorMessage.innerText = "At least one 'Why Choose Content' field is required.";
            }
        }
    });

    form.addEventListener("submit", function (event) {
        let whyChooseCards = document.querySelectorAll(".why-choose-card");
        if (whyChooseCards.length === 0) {
            event.preventDefault(); // Prevent form submission
            errorMessage.innerText = "At least one 'Why Choose Content' field is required.";
        }
    });
});
</script>
