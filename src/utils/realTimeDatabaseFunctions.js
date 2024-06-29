import { database } from "../config/Firebase";
import { get, push, ref, remove, set, update } from "firebase/database";

const crearDocumento = async (data, currentUserID) => {
  try {
    const documentRef = ref(database, `usuarios/${currentUserID}/documentos`);
    const newDocument = push(documentRef);

    await set(newDocument, data);

    return newDocument.key;
  } catch (error) {
    throw error;
  }
};

const obtenerUserIDs = async () => {
  try {
    const userRef = ref(database, "usuarios");
    const userList = await get(userRef);
    const userIDs = userList.val() || {};
    return userIDs;
  } catch (error) {
    throw error;
  }
};

const obtenerTodosLosDocumentos = async () => {
  try {
    const documents = [];
    const userIDs = await obtenerUserIDs();

    if (Object.keys(userIDs).length === 0) {
      // Esta vacío
      return documents;
    }

    Object.keys(userIDs).forEach((userID) => {
      const userDocuments = userIDs[userID].documentos;

      if (userDocuments) {
        Object.keys(userDocuments).forEach((documentID) => {
          documents.push({
            ...userDocuments[documentID],
            uid: userID,
            id: documentID,
          });
        });
      }
    });

    return documents;
  } catch (error) {
    throw error;
  }
};

const obtenerDocumentoPorUser = async (currentUserID) => {
  try {
    const userDocumentRef = ref(
      database,
      `usuarios/${currentUserID}/documentos`
    );

    const data = await get(userDocumentRef);
    const dataPost = data.val() || {};

    const dataPostID = Object.keys(dataPost).map((id) => ({
      id: id,
      ...dataPost[id],
    }));

    return dataPostID;
  } catch (error) {
    throw error;
  }
};

const obtenerDocumentoPorID = async (currentUserID, documentID) => {
  try {
    const userDocumentRef = ref(
      database,
      `usuarios/${currentUserID}/documentos/${documentID}`
    );

    const data = await get(userDocumentRef);
    const dataPost = data.val() || {};
    return dataPost;
  } catch (error) {
    throw error;
  }
};

const editarDocumentoPorID = async (currentUserID, documentID, newData) => {
  try {
    const userDocumentRef = ref(
      database,
      `usuarios/${currentUserID}/documentos/${documentID}`
    );

    update(userDocumentRef, newData);
  } catch (error) {
    throw error;
  }
};

const eliminarDocumentoPorID = async (currentUserID, documentID) => {
  try {
    const userDocumentRef = ref(
      database,
      `usuarios/${currentUserID}/documentos/${documentID}`
    );
    remove(userDocumentRef);
  } catch (error) {
    throw error;
  }
};

export {
  crearDocumento,
  obtenerDocumentoPorUser,
  obtenerTodosLosDocumentos,
  obtenerDocumentoPorID,
  editarDocumentoPorID,
  eliminarDocumentoPorID,
};
