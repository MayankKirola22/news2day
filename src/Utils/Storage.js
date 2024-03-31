import { storage } from "./Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

export function UploadFile(setUploadStatus,setFormDetails,file,formDetails,setDisabled){
    if(file===null || file===undefined)
        setUploadStatus("File not selected")
    else{
        setUploadStatus("Uploading File...")
        let filetype;
        if (/%.png|.jpeg/.test(file.name)||/%.jpeg|.png/.test(file.name)||/%.png|.jpg/.test(file.name)||/%.|.jpg/.test(file.name))
            filetype="Image";
        else
            filetype="Video";
        const fileRef = ref(storage,`temp/${file.name + v4()}`);
        uploadBytes(fileRef,file).then((res)=>{
            getDownloadURL(res.ref).then((url)=>{
                setFormDetails({...formDetails,FileLink:url,FileType:filetype});
                setUploadStatus("File uploaded Successfully");
                if(formDetails.Title!=="" && formDetails.Content!=="" && formDetails.Category !=="")
                    setDisabled(false);
            })
        }).catch((err)=>alert(err));
    }
}
