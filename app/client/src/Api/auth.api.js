import axios from "axios";
import { BASE_URL } from "./api.config";

const API_URL = BASE_URL + "auth/";

class AuthAPI {
  login(username, password, role) {
    return axios
      .post(API_URL + "signin", {
        username,
        password,
        role,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(firstname, lastname, username, phoneno, password, role) {
    return axios.post(API_URL + "signup", {
      firstname,
      lastname,
      username,
      phoneno,
      password,
      role,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  verify(ID, v_code) {
    return axios
      .post(API_URL + "verify-account", {
        ID,
        v_code,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  resendVerificationCode(userID) {
    return axios.post(API_URL + "resend-vcode", {
      userID,
    });
  }

  updateInfo(userId, data) {
    return axios.put(API_URL + "update-info", {
      userId,
      data,
    });
  }

  changePassword(userId, currentPassword, newPassword) {
    return axios.post(API_URL + "change-password", {
      userId,
      currentPassword,
      newPassword,
    });
  }
  getPasswordResetAuthCode(phoneno) {
    return axios.post(API_URL + "reset-password-auth", {
      phoneno,
    });
  }

  resetPassword(userId, auth_code, newPassword) {
    return axios.post(API_URL + "reset-password", {
      userId,
      auth_code,
      newPassword,
    });
  }
  getAccountBalance(userid) {
    return axios.get(API_URL + "acc_balance", {
      headers: {
        userid,
      },
    });
  }
}

export default new AuthAPI();
