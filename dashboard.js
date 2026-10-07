function startMockTest() {

    window.location.href = "ctet.html";

}


function startSection(section) {

    // Future में section-wise test
    // इसी function से open किया जा सकता है।

    window.location.href =
        "ctet.html?section=" + section;

}


/* =========================
   SAVE TEST STATISTICS
========================= */

function updateDashboardStats() {

    const completed =
        localStorage.getItem("ctetTestsCompleted") || 0;

    const best =
        localStorage.getItem("ctetBestScore") || 0;

    document.getElementById("testsCompleted")
        .textContent = completed;

    document.getElementById("bestScore")
        .textContent = best + "%";

}

updateDashboardStats();