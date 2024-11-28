import { useCallback, useEffect, useState } from 'react';
import { FriendshipType, User } from './@types';

import Header from './components/Header';
import Aside from './components/Aside';
import Card from './components/Card';
import Spinner from './components/Spinner';
import { findAll } from './services/users';

function App() {
  const [unfollowers, setUnFollowers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  async function getUsers(friendshipType: FriendshipType) {
    const allUsers: User[] = [];
    let shouldFetch = true;
    let max_id = '';

    while (shouldFetch) {
      const response = await findAll({
        friendshipType,
        max_id,
      });

      const { next_max_id, big_list, users } = response.data;

      max_id = next_max_id;
      allUsers.push(...users);

      if (!big_list) shouldFetch = false;
    }
    return allUsers;
  }

  const getUnfollowers = useCallback(async () => {
    setIsLoading(true);

    try {
      const [following, followers] = await Promise.all([
        getUsers(FriendshipType.Following),
        getUsers(FriendshipType.Followers),
      ]);

      const unfollowers = following.filter(
        (follower) => !followers.some((f) => f.username === follower.username)
      );

      setUnFollowers(unfollowers);
    } catch (error) {
      console.error('An error has occurred', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getUnfollowers();
  }, [getUnfollowers]);

  const renderMainContent = () => {
    const { length: unfollowersCount } = unfollowers;

    if (isLoading) {
      return <Spinner />;
    } else if (unfollowersCount === 0) {
      return (
        <span className="text-xl">
          All the people you follow are following you back
        </span>
      );
    } else {
      return unfollowers.map((user, index) => (
        <Card
          key={user.id}
          index={index}
          user={user}
          setUnFollowers={setUnFollowers}
        />
      ));
    }
  };

  return (
    <div className="h-screen bg-zinc-900 text-zinc-100">
      <Header />
      <div className="flex">
        <Aside />
        <div className="flex flex-1 flex-col mx-8 space-y-4">
          <div className="flex justify-between">
            <h2 className="font-semibold text-3xl">
              Non-followers {''}
              <span className="text-slate-400">
                {isLoading ? 'loading...' : unfollowers.length}
              </span>
            </h2>
          </div>
          <main className="bg-zinc-800 border-solid border-1 border-slate-800 max-h-[774px] min-h-[774px] space-y-3 px-6 py-4 overflow-y-auto rounded">
            {isError ? (
              <span className="text-xl">
                An error occurred when trying to search for users
              </span>
            ) : (
              renderMainContent()
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
