import Axios from "axios";
import { uploadToStorageBuffer } from '../../utilities/utils';

// import NexoDataService from "../services/NexoDataService";


async function transferFileToS3(req, res) {
  try {
    const { id_agendamento, documentos, id_paciente, id_medico } = req.body;

    const uploadFile = Promise.all( 
      documentos.map( async(item) => {
            const buffer = await Axios.get( item.URL, { responseType: 'arraybuffer' } );

            return {
              id_agendamento,
              id_paciente, 
              id_medico,
              categoria: item.Categoria,
              documento: await uploadToStorageBuffer({
                type: item.ContentType,
                buffer: buffer.data
              })
            }
        })
    )

    // const save = await NexoDataService.saveFilesPrescription(await uploadFile);

    res.send(await uploadFile);
  } catch (error) {
    res.send(error).status(500)
  }
}

export default {
  transferFileToS3  
}