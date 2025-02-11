
import { CategoryChart } from '@/components/catComp/CategoryChart';
import { getAllCategories, getProdCategoryData } from '@/action/category';
const defaultColors = ['#0088FE', '#00C49F',  '#FF8042', '#8884d8', '#a4de6c','#FFBB28'];
export default async function Category() {
  const { data,totalProducts } = await getProdCategoryData();


  const chartData = data ? data.map((item, index) => ({
    name: item.name,
    value: item.value,
    num: item.num,

    fill: defaultColors[index % defaultColors.length], // Optional: Assign colors
  })) : [];

  return (
    <main className="container mx-auto p-4">
      {/* <h1 className="text-2xl font-bold mb-4">Product Category Breakdown</h1> */}
      <CategoryChart data={chartData} />
    </main>
  );
}
