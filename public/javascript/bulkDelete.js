// const bulkDeleteButton = document.getElementById('bulk-delete-button');
// const recordCheckboxes = document.querySelectorAll('.record-checkbox');

// // Add an event listener to the bulk delete button
// bulkDeleteButton.addEventListener('click', handleBulkDelete);

// // Function to handle bulk delete
// function handleBulkDelete() {
//     if (confirm('Are you sure you want to delete the selected records?')) {
//         const selectedRecordIds = [];

//         // Collect the selected record IDs
//         recordCheckboxes.forEach(checkbox => {
//             if (checkbox.checked) {
//                 // Extract the record// Get references to elements
//                 const bulkDeleteButton = document.getElementById('bulk-delete-button');
//                 const recordCheckboxes = document.querySelectorAll('.record-checkbox');

//                 // Add an event listener to the bulk delete button
//                 bulkDeleteButton.addEventListener('click', handleBulkDelete);

//                 // Function to handle bulk delete
//                 function handleBulkDelete() {
//                     if (confirm('Are you sure you want to delete the selected records?')) {
//                         const selectedRecordIds = [];

//                         // Collect the selected record IDs
//                         recordCheckboxes.forEach(checkbox => {
//                             if (checkbox.checked) {
//                                 // Extract the record ID from the checkbox ID
//                                 const recordId = checkbox.id.replace('record-checkbox-', '');
//                                 selectedRecordIds.push(recordId);
//                             }
//                         });

//                         // Send a request to the server to delete the selected records
//                         fetch('/records/bulk-delete', {
//                             method: 'POST',
//                             headers: {
//                                 'Content-Type': 'application/json',
//                             },
//                             body: JSON.stringify({ recordIds: selectedRecordIds }),
//                         })
//                             .then(response => response.json())
//                             .then(data => {
//                                 if (data.success) {
//                                     // Refresh the page to reflect the changes
//                                     location.reload();
//                                 } else {
//                                     alert('Error deleting selected records.');
//                                 }
//                             })
//                             .catch(error => {
//                                 console.error(error);
//                                 alert('Error deleting selected records.');
//                             });
//                     }
//                 }
// //  ID from the checkbox ID
//                 const recordId = checkbox.id.replace('record-checkbox-', '');
//                 selectedRecordIds.push(recordId);
//             }
//         });

//         // Send a request to the server to delete the selected records
//         fetch('/records/bulk-delete', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ recordIds: selectedRecordIds }),
//         })
//             .then(response => response.json())
//             .then(data => {
//                 if (data.success) {
//                     // Refresh the page to reflect the changes
//                     location.reload();
//                 } else {
//                     alert('Error deleting selected records.');
//                 }
//             })
//             .catch(error => {
//                 console.error(error);
//                 alert('Error deleting selected records.');
//             });
//     }
// }


document.getElementById('bulkDeleteButton').addEventListener('click', function () {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const recordIds = Array.from(checkboxes).map(checkbox => checkbox.value);
    document.querySelector('input[name="recordIds"]').value = JSON.stringify(recordIds);
});