"use client";

import { useState } from "react";
import Button from "../Shared/Button";
import { useMiniApp } from "@telegram-apps/sdk-react";
import { AuthContainer } from "./style";
import Input from "../Shared/Input";

/**
 * User to allow access to their phone number
 * Subsequently authorization with TOTP
 * Afterwards sign in
 * Retrieve their list of contacts in telegram Ids
 */
const Auth = () => {
  const miniApp = useMiniApp();

  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [hash, setHash] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [ids, setIds] = useState<number[]>([]);

  const handleAuthorization = async () => {
    const contact = await miniApp.requestContact();
    if (contact && contact.contact.phoneNumber) {
      const _number = contact.contact.phoneNumber;
      setPhoneNumber(_number);
      await handleAuthCode(_number);
    }
  };

  const handleAuthCode = async (phoneNumber: string) => {
    const response = await fetch(
      `/api/telegram/auth?phoneNumber=${phoneNumber}`
    );
    const responseObj = await response.json();
    setHash(responseObj.phone_code_hash);
  };

  const handleSignIn = async () => {
    const response = await fetch("/api/telegram/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone_number: phoneNumber,
        phone_code_hash: hash,
        phone_code: code,
      }),
    });
  };

  const handleCodeChange = (e: any) => {
    setCode(e.target.value);
  };

  const handleFetchContacts = async () => {
    const response = await fetch("/api/telegram/contact");
    const responseObj = await response.json();
    console.log("responseObj", responseObj);
    setIds(responseObj.contact_ids);
  };

  return (
    <AuthContainer>
      <Button label="Get Auth Code" onClick={handleAuthorization} />

      <Input
        value={code}
        onChange={handleCodeChange}
        type="text"
        placeholder="Auth Code"
      />
      <Button label="Sign In" onClick={handleSignIn} />

      <Button label="Import Contacts" onClick={handleFetchContacts} />
      {(ids || []).map((_id) => (
        <p>{_id}</p>
      ))}
    </AuthContainer>
  );
};

export default Auth;
