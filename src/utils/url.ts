function openNewTabWithParams(url:string, params:string = "") {
    // Create a URL object with the base URL
    const urlObj = new URL(url);
    
    // // Add each parameter to the URL search params
    // Object.keys(params).forEach((key) => {
    //   urlObj.searchParams.append(key, params[key]);
    // });
  
    // Open the new tab with the full URL including parameters
    window.open(urlObj.toString(), '_blank');
  }
  
  // Usage example:
//   openNewTabWithParams('https://example.com', {
//     param1: 'value1',
//     param2: 'value2'
//   });

export { openNewTabWithParams };