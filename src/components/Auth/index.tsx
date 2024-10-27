"use client";

import { useState } from "react";
import Button from "../Shared/Button";
import { requestContact } from "@telegram-apps/sdk-react";
import { AuthContactCard, AuthContactContainer, AuthContainer } from "./style";
import Input from "../Shared/Input";
import Spinner from "../Shared/Loader/Spinner";

const TELEGRAM_API_RESOURCE = {
  SEND_AUTH: "/api/telegram/auth",
  SIGN_IN: "/api/telegram/signin",
  FETCH_CONTACTS: "/api/telegram/contact",
};

type TelegramUser = {
  id: number;
  username: string;
  firstName: string;
};

/**
 * Auth Module
 * 1. Authorize user access via TOTP
 * 2. Retrieve their list of contacts in telegram Ids
 */
const Auth = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [hash, setHash] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [users, setUsers] = useState<TelegramUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAuthorization = async () => {
    if (!requestContact.isSupported()) return;

    try {
      const contact = await requestContact();
      if (contact && contact.contact.phoneNumber) {
        const _number = contact.contact.phoneNumber;
        setPhoneNumber(_number);
        await handleAuthCode(_number);
      }
    } catch (error) {
      console.log("Auth | handleAuthorization | Error - ", error);
    }
  };

  const handleAuthCode = async (phoneNumber: string) => {
    try {
      const response = await fetch(
        `${TELEGRAM_API_RESOURCE.SEND_AUTH}?phoneNumber=${phoneNumber}`
      );
      const responseObj = await response.json();
      setHash(responseObj.phone_code_hash);
    } catch (error) {
      console.log("Auth | handleAuthCode | Error - ", error);
      setHash("");
    }
  };

  const handleSignIn = async () => {
    try {
      await fetch(TELEGRAM_API_RESOURCE.SIGN_IN, {
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
    } catch (error) {
      console.log("Auth | handleSignIn | Error - ", error);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handleFetchContacts = async () => {
    try {
      setLoading(true);
      const response = await fetch(TELEGRAM_API_RESOURCE.FETCH_CONTACTS);
      const responseObj = await response.json();
      setUsers(responseObj.users);
    } catch (error) {
      console.log("Auth | handleFetchContacts | Error - ", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
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
      <AuthContactContainer>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <p>Found {users.length} contacts</p>
            {(users || []).map((user) => (
              <AuthContactCard key={user.id}>
                <p>{user.username}</p>
                <p>{user.id}</p>
              </AuthContactCard>
            ))}
          </>
        )}
      </AuthContactContainer>
    </AuthContainer>
  );
};

export default Auth;
