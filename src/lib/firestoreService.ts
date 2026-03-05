import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export type DeviceType = "ios" | "android" | "both";

export interface TesterSignup {
  email: string;
  device: DeviceType;
  createdAt: ReturnType<typeof serverTimestamp>;
}

/**
 * Saves a tester signup to the `tester_signups` Firestore collection.
 * Returns the new document ID on success.
 */
export async function saveTesterSignup(
  email: string,
  device: DeviceType
): Promise<string> {
  const docRef = await addDoc(collection(db, "tester_signups"), {
    email: email.trim().toLowerCase(),
    device,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}
