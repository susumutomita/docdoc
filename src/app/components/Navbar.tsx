import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="navbar bg-gray-800 shadow-lg p-4">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost normal-case text-xl text-white">
          DocDoc
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link href="/dashboard" className="text-white">
              ダッシュボード
            </Link>
          </li>
          <li>
            <Link href="/groups" className="text-white">
              グループから探す
            </Link>
          </li>
          <li>
            <Link href="/tags" className="text-white">
              タグから探す
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn btn-ghost normal-case text-white">ログアウト</a>
      </div>
    </div>
  );
};

export default Navbar;
