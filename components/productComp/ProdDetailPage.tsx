import React,{useState,useEffect} from 'react'
import { getProductDetail } from '@/action/product';
interface prodProps{
  productId:string;
}
const ProdDetailPage = ({productId}:prodProps) => {
  const [prodInfo,setProdInfo]=useState<any>(null)   
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
                  async function fetchData() {
                      setLoading(true)
  
                      try {
                          const response = await getProductDetail(productId);
                          if (response.success && response.data) {
                              console.log(response.data); 
                          
                              setProdInfo(response.data)
                          } else {
                              console.error("Failed to fetch  data");
                          }
                      } catch (error) {
                          console.error("Failed to fetch data", error);
                      } finally{
                          setLoading(false)
                      }
                      
                  }
                  fetchData();
              }, [productId]);
              if(loading){
                return(
                  <div>
                    loading data...
                  </div>
                )
              }
  return (
    <div>ProdDetailPage</div>
  )
}

export default ProdDetailPage