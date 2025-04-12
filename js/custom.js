// handle clear button click
document.getElementById('clear-btn').addEventListener('click', () => {
  // Clear the input field
  document.getElementById('location').value = '';

  // Clear the output
  document.getElementById('output').innerHTML = '';

  // Hide the loading animation
  document.getElementById('loading').style.display = 'none';
});