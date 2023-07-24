// pages/index.tsx

import Link from 'next/link'
import './index.css';

const HomePage = () => {
  return (
    <div>
      <h1>ホームページ</h1>
      <Link href="/create">新規記事作成</Link> {/* <a> タグを削除 */}
    </div>
  )
}

export default HomePage
