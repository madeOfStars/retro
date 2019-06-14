class SecureAuth {
    static isAuthorized = (auth) => {
        if (!auth.uid)
            return false;
        return true;
    }
}

export default SecureAuth;