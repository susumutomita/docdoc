import app from '../../../firebaseConfig';
import {
  getFirestore,
  collection,
  getDocs,
  DocumentData,
  QueryDocumentSnapshot,
  getDoc,
  setDoc,
  doc,
  DocumentSnapshot,
  DocumentReference,
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

  async createDataInFirebase(
    collectionName: string,
    data: DocumentData,
  ): Promise<DocumentData> {
    const col = collection(db, collectionName);
    const docRef: DocumentReference<DocumentData> = doc(col);
    await setDoc(docRef, data);
    const docSnapshot: DocumentSnapshot<DocumentData> = await getDoc(docRef);
    return docSnapshot.data()!;
  }
}
