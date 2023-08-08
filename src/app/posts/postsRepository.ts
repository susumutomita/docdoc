import app from '../../../firebaseConfig';
import {
  getFirestore,
  collection,
  getDocs,
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase/firestore';

const db = getFirestore(app);

export class PostsRepository {
  async getDataFromFirebase(collectionName: string): Promise<DocumentData[]> {
    const col = collection(db, collectionName);
    const querySnapshot = await getDocs(col);
    return querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) =>
      doc.data(),
    );
  }
}
