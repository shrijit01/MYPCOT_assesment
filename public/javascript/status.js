// // Function to filter and update records based on the selected status
function filterRecords() {
    const selectedStatus = statusFilter.value;//active or inactive
    const searchText = nameSearchInput.value.toLowerCase().trim(); // Get the search input value
    // console.log(selectedStatus);

    const recordItems = document.querySelectorAll('.record'); // Get all record elements
    // console.log(recordItems);


    recordItems.forEach(recordItem => {
        const statusText = recordItem.querySelector('.status').textContent.trim(); // Use trim()
        const nameText = recordItem.querySelector('#record-name').textContent.toLowerCase().trim(); // Get the record name
        // console.log(statusText);

        const statusMatch = selectedStatus === '' || statusText === selectedStatus;
        const nameMatch = nameText.includes(searchText); // Check if the name includes the search text
        // console.log(statusMatch);

        if(statusMatch && nameMatch){
            recordItem.style.display = "block";
        }else{
            recordItem.style.display = "none";
        }
    });
}

statusFilter.addEventListener('change', filterRecords);
nameSearchInput.addEventListener('input', filterRecords);
