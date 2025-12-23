
import { Product, MediaItem } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Electric Blue Ram',
    category: 'fish',
    price: 24.99,
    image: 'https://lh3.googleusercontent.com/p/AF1QipMRgoD6vSqUZa_otzLnkSrZ2mjN2w-e-Fe9NDud=w800',
    description: 'A vibrant, peaceful dwarf cichlid perfect for community tanks.',
    stock: 12
  },
  {
    id: '2',
    name: 'Anubias Nana Petite',
    category: 'plants',
    price: 15.50,
    image: 'https://lh3.googleusercontent.com/p/AF1QipPbSnTvSmel1rku9qDkjKt14U-6yioQkaqyh4bJ=w800',
    description: 'Easy-to-grow foreground plant that thrives attached to wood or rocks.',
    stock: 25
  },
  {
    id: '3',
    name: 'Crystal Clear Nano Tank (10G)',
    category: 'tanks',
    price: 89.99,
    image: 'https://lh3.googleusercontent.com/p/AF1QipOR7f4hiHRm4_p7tin_6fsI-ZqdtynFImeXe27w=w800',
    description: 'High-clarity low-iron glass for a premium viewing experience.',
    stock: 5
  },
  {
    id: '4',
    name: 'Pro-Flow 500 Filter',
    category: 'equipment',
    price: 45.00,
    image: 'https://lh3.googleusercontent.com/p/AF1QipN4KA2p5KJr1vGis2ErRVtSTdZ1ulYrCZticM1E=w800',
    description: 'Quiet, efficient filtration for tanks up to 30 gallons.',
    stock: 8
  },
  {
    id: '5',
    name: 'Fancy Guppy Trio',
    category: 'fish',
    price: 18.00,
    image: 'https://lh3.googleusercontent.com/p/AF1QipMQIrDCTSnSfN8AZPT63zoEGBnqhGRw-bhR6c_z=w800',
    description: 'Stunning metallic colors and flowing fins. Includes one male and two females.',
    stock: 20
  },
  {
    id: '6',
    name: 'Bucephalandra "Kedagang"',
    category: 'plants',
    price: 22.00,
    image: 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSz0sIspbTJA2GoZLIDnYPMB0ikBkxw6g2fQiG4cy9ATTpxlsbEwkNd63bdxV0oLh9GV8S5lpuHHkUNiXi_vH-6LIwLN12Txy1RRBPgKUkxwZgLK2w-q3sbIGSmkoXCU2fHzJaXh=w800',
    description: 'A rare and beautiful aquatic plant with iridescent purple leaves.',
    stock: 10
  }
];

export const MOCK_MEDIA: MediaItem[] = [
  {
    id: 'm1',
    type: 'image',
    thumbnail: 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSz0sIspbTJA2GoZLIDnYPMB0ikBkxw6g2fQiG4cy9ATTpxlsbEwkNd63bdxV0oLh9GV8S5lpuHHkUNiXi_vH-6LIwLN12Txy1RRBPgKUkxwZgLK2w-q3sbIGSmkoXCU2fHzJaXh=w800',
    title: 'Precision Aquascaping',
    url: '#'
  },
  {
    id: 'm2',
    type: 'video',
    thumbnail: 'https://lh3.googleusercontent.com/p/AF1QipMRudaV3f6BCJFq_QtKJ8sKmB2rwF7b9VKvlGT8=w800',
    title: 'Feeding Rituals',
    url: 'https://www.youtube.com/watch?v=1F_XG1p_6I8'
  },
  {
    id: 'm3',
    type: 'image',
    thumbnail: 'https://lh3.googleusercontent.com/p/AF1QipOR7f4hiHRm4_p7tin_6fsI-ZqdtynFImeXe27w=w800',
    title: 'Crystal Clear Habitats',
    url: '#'
  },
  {
    id: 'm4',
    type: 'video',
    thumbnail: 'https://lh3.googleusercontent.com/p/AF1QipMRgoD6vSqUZa_otzLnkSrZ2mjN2w-e-Fe9NDud=w800',
    title: 'Night View Setup',
    url: 'https://www.youtube.com/watch?v=Zf_x8v8W6M0'
  },
  {
    id: 'm5',
    type: 'image',
    thumbnail: 'https://lh3.googleusercontent.com/p/AF1QipMQIrDCTSnSfN8AZPT63zoEGBnqhGRw-bhR6c_z=w800',
    title: 'Modern Aquatic Design',
    url: '#'
  },
  {
    id: 'm6',
    type: 'image',
    thumbnail: 'https://lh3.googleusercontent.com/p/AF1QipPbSnTvSmel1rku9qDkjKt14U-6yioQkaqyh4bJ=w800',
    title: 'Live Plant Gallery',
    url: '#'
  },
  {
    id: 'm7',
    type: 'video',
    thumbnail: 'https://lh3.googleusercontent.com/p/AF1QipN4KA2p5KJr1vGis2ErRVtSTdZ1ulYrCZticM1E=w800',
    title: 'Community Tank Life',
    url: 'https://www.youtube.com/watch?v=0kO9SskT_3w'
  }
];
