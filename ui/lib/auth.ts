import { GoogleAuthProvider } from '@firebase/auth';
import { auth } from './firebase';

export { auth } from './firebase';

export const googleAuthProvider = new GoogleAuthProvider();
