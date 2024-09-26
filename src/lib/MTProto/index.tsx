import path from "path";
import MTProto from "@mtproto/core";
import ENVIRONMENT from "@/configuration/environment";
import { SignInResponse, User } from "./types";

const sessionPath = path.join(process.cwd(), "sessions", "session.json");
const sessionFilePath = path.join(sessionPath, "session.json");

class MTProtoClient {
  _mtProto?: MTProto;

  constructor() {
    this._mtProto = new MTProto({
      api_id: ENVIRONMENT.TELEGRAM_APP_ID,
      api_hash: ENVIRONMENT.TELEGRAM_API_HASH,
      storageOptions: {
        path: sessionPath,
      },
    });
  }

  async call(method: string, params: any = {}, options: any = {}) {
    try {
      return await this._mtProto?.call(method, params, options);
    } catch (error: any) {
      return error;
    }
  }

  async sendAuthCode(phone_number: string) {
    let response = await this.call("auth.sendCode", {
      phone_number,
      settings: {
        _: "codeSettings",
      },
    });

    if (
      response.error_message &&
      response.error_message.includes("PHONE_MIGRATE")
    ) {
      const migratedDc = parseInt(response.error_message.split("_").pop(), 10);
      this._mtProto?.setDefaultDc(migratedDc);
      console.log(`Data center migrated to DC ${migratedDc}. Retrying...`);

      response = await this.call("auth.sendCode", {
        phone_number,
        settings: {
          _: "codeSettings",
        },
      });
    }

    console.log("Auth Code Response", response);
    return response.phone_code_hash;
  }

  async signIn(
    phone_number: string,
    phone_code_hash: string,
    phone_code: string
  ) {
    const response: SignInResponse = await this.call("auth.signIn", {
      phone_number,
      phone_code_hash,
      phone_code,
    });
    console.log("Sign In Response", response);

    return response;
  }

  async fetchContactIds() {
    const response = await this.call("contacts.getContacts", {
      hash: 0,
    });
    if (response.error_message) return [];
    return response.users.map((user: User) => user.id);
  }
}

const mtProtoClient = new MTProtoClient();
export default mtProtoClient;
