import axios from "axios";
import { useQuery } from "react-query";

export const getItems = async(id:any) => {
    if(id){
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { isLoading, error, data } = await useQuery("repoData", () => axios(`https://front-test.beta.aviasales.ru/tickets?searchId=${id}`)
      );
      return {
          isLoading:isLoading,
          error:error,
          data:data
      }
    }
}