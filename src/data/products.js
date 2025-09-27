 const products = [
  {
    id: 1,
    title: 'Minimalist T-Shirt',
    imgURL: 'https://westminstereffects.com/cdn/shop/files/unisex-classic-tee-black-front-66eafc7c7ffaf.jpg?v=1726676103&width=1946',
    description: 'A classic, comfortable, and versatile cotton t-shirt for everyday wear.',
    price: 25.00,
    stock: 40,
    category: 'clothing'
  },
  {
    id: 2,
    title: 'Vintage Leather Wallet',
    imgURL: '/imgs/vintage-leather-wallet.jpg',
    description: 'Handcrafted leather wallet with multiple card slots and a coin pocket. ',
    price: 45.50,
    stock: 20,
    category: 'accessories'
  },
  {
    id: 3,
    title: 'Noise-Canceling Headphones',
    imgURL: 'https://placehold.co/600x400/E57373/FFF?text=Noise-Canceling+Headphones',
    description: 'Immersive sound and superior noise cancellation for an unparalleled listening experience.',
    price: 199.99,
    stock: 15,
    category: 'electronics'
  },
  {
    id: 4,
    title: 'Stainless Steel Water Bottle',
    imgURL: 'https://placehold.co/600x400/81C784/FFF?text=Stainless+Steel+Water+Bottle',
    description: 'Keeps drinks cold for 24 hours and hot for 12. Leak-proof and durable.',
    price: 30.00,
    stock: 75,
    category: 'kitchen'
  },
  {
    id: 5,
    title: 'Ergonomic Office Chair',
    imgURL: 'https://placehold.co/600x400/64B5F6/FFF?text=Ergonomic+Office+Chair',
    description: 'Fully adjustable chair designed for maximum comfort and back support during long work hours.',
    price: 250.00,
    stock: 10,
    category: 'home'
  },
  {
    id: 6,
    title: 'Smartwatch',
    imgURL: 'https://placehold.co/600x400/FFD54F/FFF?text=Smartwatch',
    description: 'Track your fitness, receive notifications, and make calls right from your wrist.',
    price: 150.00,
    stock: 30,
    category: 'electronics'
  },
  {
    id: 7,
    title: 'Hand-Poured Soy Candle',
    imgURL: 'https://placehold.co/600x400/9575CD/FFF?text=Hand-Poured+Soy+Candle',
    description: 'Infused with essential oils, this candle provides a long-lasting and soothing aroma.',
    price: 18.00,
    stock: 40,
    category: 'home'
  },
  {
    id: 8,
    title: 'Portable Bluetooth Speaker',
    imgURL: 'https://placehold.co/600x400/4DB6AC/FFF?text=Portable+Bluetooth+Speaker',
    description: 'Compact and powerful speaker with a long battery life, perfect for outdoor adventures.',
    price: 75.00,
    stock: 25,
    category: 'electronics'
  },
  {
    id: 9,
    title: 'Graphic Novel',
    imgURL: 'https://placehold.co/600x400/FF8A65/FFF?text=Graphic+Novel',
    description: 'An award-winning story told through stunning illustrations. A must-read for comic fans.',
    price: 22.00,
    stock: 60,
    category: 'books'
  },
  {
    id: 10,
    title: 'Yoga Mat',
    imgURL: 'https://placehold.co/600x400/A1887F/FFF?text=Yoga+Mat',
    description: 'Non-slip surface provides excellent grip for all types of yoga and fitness routines.',
    price: 35.00,
    stock: 35,
    category: 'sports'
  },
  {
    id: 11,
    title: 'Espresso Machine',
    imgURL: 'https://placehold.co/600x400/F06292/FFF?text=Espresso+Machine',
    description: 'Brew cafe-quality espresso and lattes from the comfort of your kitchen.',
    price: 350.00,
    stock: 5,
    category: 'kitchen'
  },
  {
    id: 12,
    title: 'Running Shoes',
    imgURL: 'https://placehold.co/600x400/7986CB/FFF?text=Running+Shoes',
    description: 'Lightweight and cushioned shoes designed for optimal performance and comfort during runs.',
    price: 90.00,
    stock: 25,
    category: 'clothing'
  },
  {
    id: 13,
    title: 'Digital Camera',
    imgURL: 'https://placehold.co/600x400/4DD0E1/FFF?text=Digital+Camera',
    description: 'Capture life\'s moments in high-resolution with this easy-to-use digital camera.',
    price: 450.00,
    stock: 8,
    category: 'electronics'
  },
  {
    id: 14,
    title: 'Backpack',
    imgURL: 'https://placehold.co/600x400/AED581/FFF?text=Backpack',
    description: 'Durable and spacious backpack with multiple compartments for school, work, or travel.',
    price: 60.00,
    stock: 45,
    category: 'accessories'
  },
  {
    id: 15,
    title: 'Gardening Tool Set',
    imgURL: 'https://placehold.co/600x400/FFB74D/FFF?text=Gardening+Tool+Set',
    description: 'Everything you need to tend to your garden, including a trowel, spade, and gloves.',
    price: 28.00,
    stock: 20,
    category: 'home'
  },
  {
    id: 16,
    title: 'Cookbook',
    imgURL: 'https://placehold.co/600x400/BA68C8/FFF?text=Cookbook',
    description: 'A collection of delicious and easy-to-follow recipes for every occasion.',
    price: 15.00,
    stock: 70,
    category: 'books'
  },
  {
    id: 17,
    title: 'Basketball',
    imgURL: 'https://placehold.co/600x400/78909C/FFF?text=Basketball',
    description: 'Official size and weight basketball for indoor and outdoor play. Perfect for all skill levels.',
    price: 25.00,
    stock: 55,
    category: 'sports'
  },
  {
    id: 18,
    title: 'Hoodie',
    imgURL: 'https://placehold.co/600x400/DCE775/FFF?text=Hoodie',
    description: 'A warm and comfortable fleece hoodie with a classic design. ',
    price: 55.00,
    stock: 30,
    category: 'clothing'
  },
  {
    id: 19,
    title: 'Smart Scale',
    imgURL: 'https://placehold.co/600x400/BCAAA4/FFF?text=Smart+Scale',
    description: 'Measures body weight, BMI, and other metrics, syncing data to your phone.',
    price: 49.99,
    stock: 12,
    category: 'electronics'
  },
  {
    id: 20,
    title: 'Wall Art Print',
    imgURL: 'https://placehold.co/600x400/B0BEC5/FFF?text=Wall+Art+Print',
    description: 'High-quality print on canvas to add a modern touch to any room.',
    price: 80.00,
    stock: 18,
    category: 'home'
  }
];

export default products;