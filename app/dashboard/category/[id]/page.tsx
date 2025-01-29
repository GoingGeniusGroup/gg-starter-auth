import CategoryDetail from '@/components/catComp/CategoryDetail';
import React from 'react'
interface categoryProps {
    params: {
      id: string;
    };
  }
const ViewCategory : React.FC<categoryProps>= ({params}) => {

    const {id}=params
  return (
    <div>
<CategoryDetail categoryId={id}/>

    </div>
  )
}

export default ViewCategory