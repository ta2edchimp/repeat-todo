if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js').then(function(registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ',    registration.scope);
  }).catch(function(err) {
    // registration failed :(
    console.error('ServiceWorker registration failed: ', err);
  });
} else {
  console.log('You can not have nice things :-(')
}
