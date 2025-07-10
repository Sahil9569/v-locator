// utility.js
export function checkTokenAndShow404() {
    const urlToken = window.location.href.split('/').pop(); // Extract the token from the URL
    const localStorageToken = localStorage.getItem('res_token');
  
    if (urlToken !== localStorageToken) {
      // Token mismatch, redirect to the 404 page
      window.location.href = '/auth/401'; // Replace '/404' with the path to your 404 page
    }
  }
  