class SecureAuth {
    static isAuthorized = (auth) => {
        console.log("SecureAuth");
        if (!auth.uid)
            return false;
        return true;
    }
}

export default SecureAuth;