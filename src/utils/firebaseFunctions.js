import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  addDoc,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);
const db = firestore;

// Actualizar datos del cliente en Firestore
export const updateUser = async (values, user) => {
  // Actualizar datos del cliente en Firestore
  const userRef = collection(firestore, "users");
  const q = query(userRef, where("email", "==", user.email));
  const querySnapshot = await getDocs(q);
  const userDoc = querySnapshot.docs[0];
  const userId = userDoc.id;
  await updateDoc(doc(userRef, userId), {
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    phone: values.phone,
    function: values.function,
    department: values.department,
    site: values.site,
    attendsSince: values.attendsSince,
    birthday: values.birthday,
    document: values.document,
    profile: values.profile,
    role: values.role,
    training: values.training,
    level: values.level,
    mentor: values.mentor,
    gender: values.gender,
    baptized: values.baptized === "true" ? true : false,
    maritalStatus: values.maritalStatus,
  });
};

// Subir imagen a la carpeta Avatar
export const uploadAvatar = async (file, user) => {
  const storageRef = ref(storage, "user-image/" + `${file.name}-${uuidv4()}`);
  console.log(storageRef);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  await updateAvatar(url, user);
  // Retornar la URL de la imagen
  return url;
};

// Actualizar avatar del cliente en Firestore
export const updateAvatar = async (url, user) => {
  const userRef = collection(firestore, "users");
  const q = query(userRef, where("email", "==", user.email));
  const querySnapshot = await getDocs(q);
  const userDoc = querySnapshot.docs[0];
  const userId = userDoc.id;
  await updateDoc(doc(userRef, userId), {
    avatar: url,
  });
};

// Crear Avatar seleccionado en el Storage de Firebase
export const createAvatar = async (file) => {
  const storageRef = ref(storage, "images/" + `${file.name}-${uuidv4()}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  // Retornar la URL de la imagen
  console.log(url);
  return url;
};

// Crear nuevo usuario en Firestore
export const createUser = async (values) => {
  try {
    // Inicializar Firebase Auth
    const auth = getAuth();

    // Crear el perfil de autenticación con email y password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      values.email,
      "123456"
    );

    // Validar que el email no exista en la base de datos de Firestore
    const userRef = collection(firestore, "users");
    const q = query(userRef, where("email", "==", values.email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length > 0) {
      console.error("El email ya está registrado en Firestore");
      throw new Error("El email ya está registrado en Firestore");
    }

    // Obtener el UID del usuario autenticado
    const uid = userCredential.user.uid;

    // Crear nuevo usuario en Firestore con el UID
    await addDoc(userRef, {
      uid: uid,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      address: values.address,
      attendsSince: values.attendsSince,
      birthday: values.birthday,
      role: values.role,
      department: values.department,
      function: values.function,
      site: values.site,
      training: values.training,
      level: values.level,
      baptized: values.baptized === "true" ? true : false,
      mentor: values.mentor,
      document: values.document,
      maritalStatus: values.maritalStatus,
      avatar: values.avatar,
      neighborhood: values.neighborhood,
    });

    return values;
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    throw error;
  }
};

// Listar todos los usuarios en Firestore
export const listUsers = async () => {
  const userRef = collection(firestore, "users");
  const querySnapshot = await getDocs(userRef);
  const users = querySnapshot.docs.map((doc) => doc.data());
  return users;
};

// Change Password for user in Firebase Auth
export const changePassword = async (newPassword) => {
  const auth = getAuth();
  const user = auth.currentUser;
  await user.updatePassword(newPassword);
};

// Escuchar notificaciones en tiempo real para la organización del usuario
export const listenToNotifications = (organizationName, callback) => {
  const orgsRef = collection(db, "organizations");
  const q = query(orgsRef, where("name", "==", organizationName));

  return onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((docSnapshot) => {
      if (docSnapshot.exists()) {
        const notifications = docSnapshot.data().notifications || [];
        callback(notifications);
      }
    });
  });
};

// Marcar notificación como leída
export const markAsRead = async (organizationName, notificationId) => {
  const orgsRef = collection(db, "organizations");
  const q = query(orgsRef, where("name", "==", organizationName));
  const querySnapshot = await getDocs(q);
  const docSnapshot = querySnapshot.docs[0];
  const notifications = docSnapshot.data().notifications || [];
  const index = notifications.findIndex((notif) => notif.id === notificationId);
  notifications[index].isRead = true;
  notifications[index].type = "read_message";
  await updateDoc(doc(orgsRef, docSnapshot.id), {
    notifications: notifications,
  });
};

// Archivar notificación
export const markAsArchive = async (organizationName, notificationId) => {
  const orgsRef = collection(db, "organizations");
  const q = query(orgsRef, where("name", "==", organizationName));
  const querySnapshot = await getDocs(q);
  const docSnapshot = querySnapshot.docs[0];
  const notifications = docSnapshot.data().notifications || [];
  const index = notifications.findIndex((notif) => notif.id === notificationId);
  notifications[index].isArchived = true;
  notifications[index].type = "archived_message";
  await updateDoc(doc(orgsRef, docSnapshot.id), {
    notifications: notifications,
  });
};

//envio de email
export const sendEmail = async (to, subject, html) => {
  // console.log("Enviando email:", subject);

  const mailRef = collection(db, "mail");

  // Genera un ID único para cada correo
  // const uniqueId = Date.now().toString(36) + Math.random().toString(36).substr(2);

  const emailContent = {
    to: to,
    message: {
      subject: `${subject}`,
      text: "info.",
      html: `
        ${html} 
      `,
    },
  };
  await addDoc(mailRef, emailContent);
};

// Llamar la collection organizations de Firestore con id nckCUr0CEm9yShDFolKh y el campo sendLabsMobile
export const getSendLabsMobile = async () => {
  const orgDocRef = doc(db, "organizations", "nckCUr0CEm9yShDFolKh");
  const orgDocSnap = await getDoc(orgDocRef);
  const sendLabsMobiledb = orgDocSnap.data().sendLabsMobile;

  // console.log(sendLabsMobiledb);
  return sendLabsMobiledb;
};
