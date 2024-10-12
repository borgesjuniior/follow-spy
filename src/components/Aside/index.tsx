import { UserMinus } from 'lucide-react';

function Aside() {
  return (
    <aside className="w-72 p-6">
      <nav className="space-y-6 mt-6">
        <a
          href="/"
          className="flex items-center gap-3 text-sm font-semibold text-zinc-200"
        >
          <UserMinus />
          Non-followers
        </a>
      </nav>
    </aside>
  );
}

export default Aside;
