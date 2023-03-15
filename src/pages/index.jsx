import fs from 'fs';
import path from 'path';

function HomePage(props) {
  const  { products } = props

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          {product.title}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'dummy-backend.json');
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: {
     products: data.products
    }
  }
}

export default HomePage;
