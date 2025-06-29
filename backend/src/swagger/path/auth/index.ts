import { loginPath } from "./login";
import { profilePath } from "./profile";
import { passwordPath } from "./password";
import { logoutPath } from "./logout";

export const authPath = {
        "/auth/login": loginPath,
        "/auth/profile": profilePath,
        "/auth/password": passwordPath,
        "/auth/logout": logoutPath,
};
