import { ResponseObject } from "../interfaces/common.interfaces";
import { ISignup } from "../interfaces/user.interface";
import User from "../models/user.model";

class AuthServices {
  /**
   * Standard response object
   */
  private response: ResponseObject;

  /**
   * Signup service
   * @param data ISignup
   * @returns Standard Response Object
   */
  async signup(data: ISignup) {
    await User.create(data);

    this.response = {
      
      success: true,
      message: "user created successfully",
    };

    return this.response;
  }
}

const AuthService = new AuthServices();

export default AuthService;
