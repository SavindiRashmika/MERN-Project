

const backendDomain = "http://localhost:8080";

const SummaryApi = {
    signUp: {
        url: `${backendDomain}/api/signup`, 
        method: "POST"
    },
    signIn: {
        url: `${backendDomain}/api/signin`, 
        method: "POST"
    },
    current_user : {
        url: `${backendDomain}/api/user-details`,
        method: "GET"
    },
    logout_user : {
        url : `${backendDomain}/api/user-logout`,
        method : "GET"
    },
    allUser : {
        url : `${backendDomain}/api/all-users`,
        method : "GET" 
    },
    updateUser : {
        url: `${backendDomain}/api/update-users`, 
        method: "POST"
    },
    uploadProduct : {
        url: `${backendDomain}/api/upload-product`, 
        method: "POST"
    },
    allProduct : {
        url : `${backendDomain}/api/get-product`,
        method : 'GET'
    },
    updateProduct : {
        url : `${backendDomain}/api/update-product`,
        method : 'POST'
    }
};

export default SummaryApi;

