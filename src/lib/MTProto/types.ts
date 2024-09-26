export type User = {
  flags: number;
  self: boolean;
  contact: boolean;
  mutual_contact: boolean;
  deleted: boolean;
  bot: boolean;
  bot_chat_history: boolean;
  bot_nochats: boolean;
  verified: boolean;
  restricted: boolean;
  min: boolean;
  bot_inline_geo: boolean;
  support: boolean;
  scam: boolean;
  apply_min_photo: boolean;
  fake: boolean;
  bot_attach_menu: boolean;
  premium: boolean;
  attach_menu_enabled: boolean;
  flags2: number;
  bot_can_edit: boolean;
  id: string;
  access_hash: string;
  first_name: string;
  username: string;
  phone: string;
  photo: {
    has_video: boolean;
    personal: boolean;
    photo_id: string;
  };
  status: {
    expires: number;
  };
};

export type SignInResponse = {
  flags: number;
  setup_password_required: boolean;
  future_auth_token: any;
  user: User;
};
