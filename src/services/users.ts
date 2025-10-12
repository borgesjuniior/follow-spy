import axios from '../lib/axios';
import { AxiosResponse } from 'axios';
import {
  FriendshipsDestroyResponse,
  Params,
  UserResponseData,
} from '../@types';
import { getCookie } from '../utils/get-cookie';

export async function findAll({
  friendshipType,
  max_id,
}: Params): Promise<AxiosResponse<UserResponseData>> {
  const ds_user_id = getCookie('ds_user_id');

  if (!ds_user_id) {
    throw new Error('User ID not found in cookies.');
  }

  const url = `/api/v1/friendships/${ds_user_id}/${friendshipType}/?count=12${
    max_id ? `&max_id=${max_id}` : ''
  }`;

  return axios.get<UserResponseData>(url);
}

export async function unfollowUser(
  userId: string
): Promise<AxiosResponse<FriendshipsDestroyResponse>> {
  const url = `/api/v1/friendships/destroy/${userId}/`;
  return axios.post<FriendshipsDestroyResponse>(url);
}
