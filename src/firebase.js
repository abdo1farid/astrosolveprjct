// Use the pre-initialized config at src/firebase/config.js as a fallback for local development.
// If you'd rather use environment variables, replace this file with a config that reads
// from import.meta.env as appropriate.
import { auth as preAuth } from './firebase/config';

export const auth = preAuth;
export default null;
