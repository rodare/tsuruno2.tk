let currentImageIndex = -1; // Tracks the currently expanded image index
let galleryImages = [];     // Stores all image data (src, alt, fullSizeSrc)

// Get DOM elements
const expandedContainer = document.getElementById('expandedContainer');
const expandedImg = document.getElementById('expandedImg');
const imgText = document.getElementById('imgText');
const closeBtn = document.getElementById('closeBtn');
const leftArrow = document.getElementById('leftArrow');
const rightArrow = document.getElementById('rightArrow');

// Function to initialize gallery images and attach click listeners
function initializeGallery() {
    const thumbnailImages = document.querySelectorAll('.gallery-column img');
    thumbnailImages.forEach((imgElement, index) => {
        galleryImages.push({
            thumbnailSrc: imgElement.src,       // The path to the thumbnail image
            alt: imgElement.alt,                // The alt text
            fullSizeSrc: imgElement.dataset.fullsizeSrc // READ FROM data-fullsize-src
        });
        // Attach a click listener to the parent column to expand
        imgElement.closest('.gallery-column').addEventListener('click', () => openExpanded(index));
    });
}

// Function to open the expanded view
function openExpanded(index) {
    if (index < 0 || index >= galleryImages.length) {
        return; // Prevent out-of-bounds access
    }
    currentImageIndex = index;
    expandedImg.src = galleryImages[currentImageIndex].fullSizeSrc; // Use the fullSizeSrc from the array
    imgText.innerHTML = galleryImages[currentImageIndex].alt;
    expandedContainer.style.display = 'flex'; // Show the modal
}

// Function to close the expanded view
function closeExpanded() {
    expandedContainer.style.display = 'none'; // Hide the modal
    currentImageIndex = -1; // Reset index
}

// Function to navigate to the next/previous image
function navigateImage(direction) {
    if (currentImageIndex === -1) return; // Only navigate if an image is expanded

    let newIndex = currentImageIndex + direction; // direction will be +1 or -1

    if (newIndex >= 0 && newIndex < galleryImages.length) {
        openExpanded(newIndex);
    }
}

// --- Event Listeners ---

// Close button click
closeBtn.addEventListener('click', closeExpanded);

// Left arrow click
leftArrow.addEventListener('click', () => navigateImage(-1));

// Right arrow click
rightArrow.addEventListener('click', () => navigateImage(1));

// Keyboard navigation (left/right arrow keys & Escape)
document.addEventListener('keydown', function(event) {
    if (expandedContainer.style.display === 'flex') { // Only if modal is open
        if (event.key === 'ArrowLeft') {
            event.preventDefault(); // Prevent browser scrolling
            navigateImage(-1);
        } else if (event.key === 'ArrowRight') {
            event.preventDefault(); // Prevent browser scrolling
            navigateImage(1);
        } else if (event.key === 'Escape') {
            event.preventDefault(); // Prevent default Escape behavior
            closeExpanded();
        }
    }
});

// Initialize the gallery when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeGallery);