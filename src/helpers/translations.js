export function translateError(error) {
    switch (error) {
        case "Unable to log in with provided credentials.":
            return("نام کاربری یا رمز عبور اشتباه است.")
        default:
            break;
    }
}