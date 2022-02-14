import { useState } from "react";
import axios from 'axios';


const HandleModels = () => {
    const [modelsData, setModelsData] = useState(null)
    
    const deleteModelFromDatabase = async (uid, modelIdToDelete) => {
        const url = 'model/' + uid
        try {
            const res = await axios({
                method: 'delete',
                url: url,
                data:{
                modelIdToDelete
                }
            });
            console.log(res.data)
        } 
        catch (err) 
        {
            console.log(err.response.status)
        }
    }

    const fetchModelsData = async (uid) => {
        const url = 'models-data/' + uid
        try {
            const res = await axios({
                method: 'get',
                url: url
            });
            console.log("modelsData: ", res.data)
            setModelsData(res.data['models_data'])
        } 
        catch (err) 
        {
            console.log(err.response.status)
        }
    }

    
    const deleteModelFromModelsData = (modelIdToDelete) => {
        const newModelsData = modelsData.filter(modelData => modelData['id'] !== modelIdToDelete)
        setModelsData(newModelsData)
    }

    const resetModelsData = () => {
        setModelsData(null)
    }


    return { modelsData, fetchModelsData, deleteModelFromModelsData, deleteModelFromDatabase, resetModelsData }
} 

export default HandleModels