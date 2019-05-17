import {
  VuexModule,
  Module,
  MutationAction,
  Action,
  Mutation,
  getModule
} from "vuex-module-decorators";
import { Signin, GetUserInfo, Logout } from "@/api";

import store from "@/store";
import { UserInfo, SigninForm } from "@/api/models";

@Module({ dynamic: true, store, name: "user" })
class User extends VuexModule implements UserInfo {
  public token = localStorage.getItem("token") || "";
  public name = "";
  public phone = "";
  public mail = "";
  public roles: string[] = [];

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token;
  }

  @Mutation
  private SET_NAME(name: string) {
    this.name = name;
  }

  @Mutation
  private SET_PHONE(phone: string) {
    this.phone = phone;
  }

  @Mutation
  private SET_MAIL(mail: string) {
    this.mail = mail;
  }

  @Mutation
  private SET_ROLES(roles: string[]) {
    this.roles = roles;
  }

  @Action
  public async Login(signinForm: SigninForm) {
    signinForm.username = signinForm.username.trim();
    const { data } = await Signin({ signinForm });
    localStorage.setItem("token", data!.token);
    this.SET_TOKEN(data!.token);
  }

  @Action
  public ResetToken() {
    localStorage.removeItem("token");
    this.SET_TOKEN("");
    this.SET_ROLES([]);
  }

  @Action
  public async GetUserInfo() {
    if (this.token === "") {
      return;
    }
    const { data } = await GetUserInfo();
    if (!data) {
      throw Error("Verification failed, please Login again.");
    }
    const { roles, name, phone, mail } = data;
    // roles must be a non-empty array
    if (!roles || roles.length <= 0) {
      throw Error("GetUserInfo: roles must be a non-null array!");
    }
    this.SET_ROLES(roles);
    this.SET_NAME(name);
    this.SET_PHONE(phone);
    this.SET_MAIL(mail);
  }

  @Action
  public async Logout() {
    if (this.token === "") {
      throw Error("Logout: token is undefined!");
    }
    await Logout();
    localStorage.removeItem("token");
    this.SET_TOKEN("");
    this.SET_ROLES([]);
    this.SET_NAME("");
    this.SET_PHONE("");
  }
  get getToken() {
    return this.token;
  }
}

export const UserModule = getModule(User);
