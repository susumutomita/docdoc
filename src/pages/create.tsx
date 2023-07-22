// pages/create.tsx

import { useState } from 'react'
import { useRouter } from 'next/router'
import db from '../firebaseConfig' // Firebaseの設定をインポートします

const CreatePost = () => {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      // Firestoreにデータを保存します
      const docRef = await db.collection('posts').add({
        title,
        content,
        createdAt: new Date().toISOString()
      })

      alert('記事が保存されました')
      router.push(`/posts/${docRef.id}`)
    } catch (error) {
      console.error('Error writing document: ', error)
    }
  }

  return (
    <div>
      <form onSubmit={submitData}>
        <h1>新規記事作成</h1>
        <input
          onChange={e => setTitle(e.target.value)}
          placeholder="タイトル"
          type="text"
          value={title}
        />
        <textarea
          onChange={e => setContent(e.target.value)}
          placeholder="本文"
          value={content}
        />
        <input type="submit" value="送信" />
      </form>
    </div>
  )
}

export default CreatePost
