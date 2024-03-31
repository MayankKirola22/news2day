import { collection, doc, getDoc, getDocs, limit, orderBy, query, where, addDoc, setDoc, deleteDoc } from "firebase/firestore";
import { firestore } from "./Firebase";

//                  Fetch Functions

export async function getOne(db,id){
    const docRef = doc(firestore,db,id);
    const querySnapshot = await getDoc(docRef);
    return {...querySnapshot.data(),id:querySnapshot.id};
}
export async function getAll(db,userid,field,order){
    const q=query(collection(firestore,db),where("Author","==",userid),orderBy(field,order));
    const querySnapshot = await getDocs(q);
    let result=[]
    querySnapshot.forEach((doc) => {
        result.push({...doc.data(),id:doc.id})
    })
    return result;
}
export async function getMax(db,userid,field){
    const q=query(collection(firestore,db),where("Author","==",userid),orderBy(field,"desc"),limit(1));
    const querySnapshot = await getDocs(q);
    let result=[]
    querySnapshot.forEach((doc) => {
        result.push({...doc.data(),id:doc.id})
    })
    return result[0];
}
export async function getMin(db,userid,field){
    const q=query(collection(firestore,db),where("Author","==",userid),orderBy(field,"asc"),limit(1));
    const querySnapshot = await getDocs(q);
    let result=[]
    querySnapshot.forEach((doc) => {
        result.push({...doc.data(),id:doc.id})
    })
    return result[0];
}

//              Post Functions

export async function addOne(db,doc){
    let docref = await addDoc(collection(firestore,db),doc);
    return docref.id;
}

//               Delete Function

export async function deleteOne(db,id){
    await deleteDoc(doc(firestore,db,id));
}

//               Modify Function

export async function updateOne(db,article,id,setFormVisible){
    delete article.id;
    await setDoc(doc(firestore,db,id),article).then(() => setFormVisible(false))
}