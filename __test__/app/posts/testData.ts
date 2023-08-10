import { Timestamp } from 'firebase/firestore';

export function getTestPostData() {
  return {
    id: '123',
    title: 'My First Post',
    content: 'This is my first post.',
    createdAt: {
      toDate: () => new Date(),
    } as Timestamp,
    updatedAt: {
      toDate: () => new Date(),
    } as Timestamp,
  };
}
