let currentPage = 1;

function nextPage() {

    document
        .getElementById(`page${currentPage}`)
        .classList.remove("active");

    currentPage++;

    document
        .getElementById(`page${currentPage}`)
        .classList.add("active");
}
