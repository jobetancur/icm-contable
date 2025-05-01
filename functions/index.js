import functions from "firebase-functions";
import admin from "firebase-admin";

admin.initializeApp();
const firestore = admin.firestore();

export const createUserFromAdmin = functions.https.onCall(async (data, context) => {
  // Verificar si el usuario está autenticado
  console.log("Contexto de autenticación:", context.auth);
  
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Debes iniciar sesión");
  }

  try {
    const {
      email,
      firstName,
      lastName,
      phone,
      address,
      attendsSince,
      birthday,
      role,
      department,
      function: userFunction,
      site,
      training,
      level,
      baptized,
      mentor,
      document,
      maritalStatus,
      avatar,
      neighborhood,
    } = data;

    // Crear usuario en Auth
    const userRecord = await admin.auth().createUser({
      email,
      password: "123456", // Puedes cambiar la contraseña por defecto
    });

    const uid = userRecord.uid;

    // Guardar en Firestore
    await firestore.collection("users").add({
      uid,
      email,
      firstName,
      lastName,
      phone,
      address,
      attendsSince,
      birthday,
      role,
      department,
      function: userFunction,
      site,
      training,
      level,
      baptized: baptized === "true" || baptized === true,
      mentor,
      document,
      maritalStatus,
      avatar,
      neighborhood,
    });

    return { success: true, uid };
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw new functions.https.HttpsError("internal", error.message);
  }
});

