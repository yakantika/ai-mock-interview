import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

const initFirebaseAdmin = () => {
    const apps = getApps();

    if(!apps.length){
        // DEBUG: Print env values (do not share output publicly)
        console.log("PROJECT_ID:", process.env.FIREBASE_PROJECT_ID);
        console.log("CLIENT_EMAIL:", process.env.FIREBASE_CLIENT_EMAIL);
        console.log("PRIVATE_KEY LENGTH:", process.env.FIREBASE_PRIVATE_KEY?.length);
        console.log("PRIVATE_KEY START:", process.env.FIREBASE_PRIVATE_KEY?.slice(0, 30));
        console.log("PRIVATE_KEY END:", process.env.FIREBASE_PRIVATE_KEY?.slice(-30));
        initializeApp({
            credential: cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n")
            })
        })
    }

    return {
        auth: getAuth(),
        db: getFirestore()
    }
}

const { auth, db } = initFirebaseAdmin();
export { auth, db };