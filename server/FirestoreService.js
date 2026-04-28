import admin from 'firebase-admin';


// Inicializamos la app si no ha sido inicializada ya
if (!admin.apps.length) {
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  })
});
}

const db = admin.firestore();

class FirestoreService {
    /**
     * Obtiene todos los documentos de una colección
     * @param {string} collection - Nombre de la colección
     */
    async getAll(collection) {
        try {
            const snapshot = await db.collection(collection).get();
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            throw new Error(`Error al obtener documentos: ${error.message}`);
        }
    }

    /**
 * Creates or updates a document with a specific ID.
 * @param {string} collectionName - The name of the collection.
 * @param {string} documentId - The custom ID you want to assign.
 * @param {object} data - The data to be stored.
 */
    async  createWithCustomId(collectionName, documentId, data) {
      try {
        const docRef = db.collection(collectionName).doc(documentId);
        
        await docRef.set({
          ...data,
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true }); // 'merge: true' prevents overwriting existing fields if the ID already exists
    
        console.log(`✅ Success: Document created in [${collectionName}] with ID: ${documentId}`);
        return { success: true, id: documentId };
      } catch (error) {
        console.error(`❌ Error creating document in [${collectionName}]:`, error.message);
        return { success: false, error: error.message };
      }
    }


    async create(collection, datos) {
      try {
        const docRef = await db.collection(collection).add({
          ...datos,
          createdAt: admin.firestore.FieldValue.serverTimestamp() // Agrega fecha automáticamente
        });

        console.log(` Éxito: Documento guardado en [${collection}] con ID: ${docRef.id}`);
        return { id: docRef.id, success: true };
      } catch (error) {
        console.error(` Error al crear en [${collection}]:`, error.message);
        return { error: error.message, success: false };
      }
    }

    /**
     * Modifica un documento por su ID
     * @param {string} collection - Nombre de la colección
     * @param {string} id - ID del documento
     * @param {object} data - Datos a actualizar
     */
    async update(collection, id, data) {
        try {
            const docRef = db.collection(collection).doc(id);
            await docRef.update(data);
            return { success: true, id };
        } catch (error) {
            throw new Error(`Error al actualizar el documento ${id}: ${error.message}`);
        }
    }

    /**
     * Elimina un documento por su ID
     * @param {string} collection - Nombre de la colección
     * @param {string} id - ID del documento
     */
    async delete(collection, id) {
        try {
            const docRef = db.collection(collection).doc(id);
            await docRef.delete();
            return { success: true, id };
        } catch (error) {
            throw new Error(`Error al eliminar el documento ${id}: ${error.message}`);
        }
    }
}

export default new FirestoreService();