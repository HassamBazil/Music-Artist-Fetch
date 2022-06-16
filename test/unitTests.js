
 function check (value) { // Function to replace value
    if (value.includes('?')) {
        value = value.replace("?", "%253F");
    }
    if (value.includes('/')) {
        value = value.replace("/", "%252F");
    }
    if (value.includes('*')) {
        value = value.replace("*", "%252A");
    }
    if (value.includes('\\')) {
        value = value.replace("\\", "%27C");
    }
    return value;
 } 

