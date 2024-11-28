import { X, BadgeCheck } from 'lucide-react';
import { User } from '../../@types';
import { Dispatch, useState } from 'react';
import { unfollowUser } from '../../services/users';
import Spinner from '../Spinner';

import './styles.css';

interface ICard {
  user: User;
  index: number;
  setUnFollowers: Dispatch<React.SetStateAction<User[]>>;
}

function Card({ user, setUnFollowers }: ICard) {
  const [loading, setLoading] = useState(false);

  async function handleRemoveUser(userId: string) {
    setLoading(true);

    try {
      const response = await unfollowUser(userId);

      if (response.status === 200) {
        setUnFollowers((prevState) =>
          prevState.filter((item) => item.id !== userId)
        );
        return;
      }
    } catch (error) {
      console.error('An error has occurred', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-zinc-900 flex items-center justify-between p-4 rounded-lg hover-transition">
      <div className="w-10 flex items-center space-x-4">
        <img
          className="rounded-full"
          src={user.profile_pic_url}
          alt="User Icon"
        />
        <div className="flex items-center space-x-1 text-slate-100 font-semibold text-xl hover:text-slate-300 transition-colors duration-150">
          <a
            href={`https://www.instagram.com/${user.username}/`}
            target="_blank"
          >
            {user.username}
          </a>{' '}
          {user.is_verified && <BadgeCheck stroke="#0f172a" fill="#0866ff" />}
        </div>
      </div>
      <div className="flex space-x-1">
        {loading ? (
          <div className="w-8 h-7">
            <Spinner size="12" />
          </div>
        ) : (
          <div className="w-8 flex items-center">
            <button onClick={() => handleRemoveUser(user.id)} title="Unfollow">
              <X width={28} height={28} color="#ef4444" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
