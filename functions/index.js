import functions from "firebase-functions";
import admin from "firebase-admin";

admin.initializeApp();
const firestore = admin.firestore();

export const createUserFromAdmin = functions.https.onCall(async (data) => {

  console.log("Datos recibidos:", data);
 
  try {
    // Crear usuario en Auth
    const userRecord = await admin.auth().createUser({
      email: data.email,
      password: "123456",
    });

    const uid = userRecord.uid;

    // Guardar en Firestore
    await firestore.collection("users").add({
      uid,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      address: data.address,
      phone: data.phone,
      profile: data.profile,
      attendsSince: data.attendsSince,
      birthday: data.birthday,
      avatar: data.avatar,
      role: data.role,
      baptized: data.baptized === "true" ? true : false,
      department: data.department,
      document: data.document,
      function: data.function,
      gender: data.gender,
      level: data.level,
      maritalStatus: data.maritalStatus,
      mentor: data.mentor,
      site: data.site,
      training: data.training,
      neighborhood: data.neighborhood,
    });

    return { success: true, uid };
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw new functions.https.HttpsError("internal", error.message);
  }
});

