export interface User {
  id: string;
  full_name: string;
  profile_pic_url: string;
  username: string;
  is_verified: boolean;
}
export enum FriendshipType {
  Following = 'following',
  Followers = 'followers',
}

export interface Params {
  friendshipType: FriendshipType;
  max_id: string;
}

export interface UserResponseData {
  big_list: boolean;
  next_max_id: string;
  users: User[];
}

export interface FriendshipsDestroyResponse {
  status: string;
}

export interface UserDetails {
  data: {
    user: User;
    status: string;
  };
}
