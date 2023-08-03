import app from '../../../../firebaseConfig';
import {
  getFirestore,
  collection,
  getDocs,
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase/firestore';

const db = getFirestore(app);
// Firebaseからデータを取得する関数
export async function getDataFromFirebase(
  collectionName: string,
): Promise<DocumentData[]> {
  const col = collection(db, collectionName); // db instance is added here
  const querySnapshot = await getDocs(col);
  return querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) =>
    doc.data(),
  );
}
