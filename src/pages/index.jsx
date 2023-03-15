import fs from 'fs';
import Link from 'next/link';
import path from 'path';

function HomePage(props) {
  const  { products } = props

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>
            {product.title}
          </Link>
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
    },
    revalidate: 10,
  }
}

export default HomePage;
