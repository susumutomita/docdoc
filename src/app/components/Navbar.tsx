import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="navbar-start">
        <a className="btn btn-ghost normal-case text-xl">DocDoc</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link href="/dashboard">ダッシュボード</Link>
          </li>
          <li>
            <Link href="/groups">グループから探す</Link>
          </li>
          <li>
            <Link href="/tags">タグから探す</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn">ログアウト</a>
      </div>
    </div>
  );
};

export default Navbar;
