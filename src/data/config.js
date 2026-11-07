export const restaurantConfig = {
  // Brand Basics (Easily change for any future restaurant client)
  brand: {
    name: "Mr. Burdog",
    tagline: {
      en: "Brazilian-Style Burgers & Hot Dogs",
      pt: "Hambúrgueres & Cachorros-Quentes Brasileiros",
    },
    subtagline: {
      en: "The Authentic Brazilian Burger & Hot Dog in Florida!",
      pt: "O Autêntico Hambúrguer & Cachorro-Quente Brasileiro na Flórida!",
    },
    logo: "/images/logo.png",
    badge: {
      en: "FLORIDA'S #1 BRAZILIAN BURGER JOINT",
      pt: "O #1 BURGER BRASILEIRO NA FLÓRIDA",
    },
    rating: 4.9,
    reviewsCount: "1,450+",
  },

  // Color Palette & Visual Theme
  theme: {
    primary: "#FF6600",
    primaryHover: "#FF771A",
    background: "#0d0d0d",
    cardBg: "#141414",
    surface: "#1c1c1c",
    border: "#262626",
    textLight: "#ffffff",
    textMuted: "#9ca3af",
  },

  // Navigation Links
  navLinks: [
    { id: "home", label: { en: "Home", pt: "Início" }, href: "#hero" },
    { id: "menu", label: { en: "Menu", pt: "Cardápio" }, href: "#menu" },
    { id: "favorites", label: { en: "Favorites", pt: "Destaques" }, href: "#favorites" },
    { id: "locations", label: { en: "Locations", pt: "Unidades" }, href: "#locations" },
    { id: "story", label: { en: "About Us", pt: "Sobre Nós" }, href: "#story" },
    { id: "reviews", label: { en: "Reviews", pt: "Avaliações" }, href: "#reviews" },
    { id: "contact", label: { en: "Contact", pt: "Contato" }, href: "#contact" },
  ],

  // Hero Section
  hero: {
    titlePrefix: {
      en: "THE AUTHENTIC",
      pt: "O AUTÊNTICO",
    },
    titleHighlight: {
      en: "BRAZILIAN BURGER & HOT DOG",
      pt: "BURGER & HOT DOG BRASILEIRO",
    },
    titleSuffix: {
      en: "IN FLORIDA!",
      pt: "NA FLÓRIDA!",
    },
    subtitle: {
      en: "Craving the unmistakable crunch of batata palha, gooey melted cheese, grilled picanha, and legendary Brazilian pressed hot dogs? Welcome to flavor heaven.",
      pt: "Com saudades da crocância da batata palha, queijo derretido, picanha na chapa e o lendário cachorro-quente prensado? Bem-vindo ao paraíso do sabor.",
    },
    ctaPrimary: {
      en: "View Menu",
      pt: "Ver Cardápio",
    },
    ctaSecondary: {
      en: "Order Now",
      pt: "Pedir Agora",
    },
    heroImage: "/images/burger-flagged.jpg",
    heroBurgerDetail: "/images/mockup-hero-burger.jpg",
    quickCategories: [
      { id: "burgers", label: { en: "Burgers", pt: "Burgers" }, icon: "Utensils" },
      { id: "hotdogs", label: { en: "Hot Dogs", pt: "Hot Dogs" }, icon: "Flame" },
      { id: "snacks", label: { en: "Snacks", pt: "Petiscos" }, icon: "Sparkles" },
      { id: "drinks", label: { en: "Drinks", pt: "Bebidas" }, icon: "Coffee" },
    ],
  },

  // Combo Banner Section
  comboBanner: {
    badge: {
      en: "MAKE IT A MEAL!",
      pt: "FAÇA UM COMBO!",
    },
    subtitle: {
      en: "Add Fries & Drink to your Burger or Hot Dog!",
      pt: "Adicione Batata Frita & Bebida ao seu Burger ou Hot Dog!",
    },
    pricePrefix: {
      en: "COMBOS FROM",
      pt: "COMBOS A PARTIR DE",
    },
    price: "$14.99",
    image: "/images/mockup-combo-art.jpg",
    secondaryImage: "/images/combo-skillet.jpg",
    cta: {
      en: "Upgrade to Combo",
      pt: "Quero Meu Combo",
    },
  },

  // Menu Categories
  categories: [
    {
      id: "burgers",
      name: { en: "Burgers", pt: "Hambúrgueres" },
      count: "8 items",
      image: "/images/burger-classic.jpg",
      description: {
        en: "Handcrafted artisan patties with authentic Brazilian toppings.",
        pt: "Hambúrgueres artesanais com ingredientes típicos brasileiros.",
      },
    },
    {
      id: "hotdogs",
      name: { en: "Hot Dogs", pt: "Cachorros-Quentes" },
      count: "6 items",
      image: "/images/hotdog-brazilian.jpg",
      description: {
        en: "Giant Brazilian pressed dogs loaded with corn, cheese & crisps.",
        pt: "Cachorros-quentes prensados gigantes recheados com milho e queijo.",
      },
    },
    {
      id: "snacks",
      name: { en: "Snacks & Appetizers", pt: "Petiscos & Porções" },
      count: "10 items",
      image: "/images/skewers-chicken.jpg",
      description: {
        en: "Bacon-wrapped skewers, golden pastéis, and crunchy wings.",
        pt: "Espetinhos com bacon, pastéis de feira e asinhas crocantes.",
      },
    },
    {
      id: "sides",
      name: { en: "Sides", pt: "Acompanhamentos" },
      count: "5 items",
      image: "/images/appetizer-pastels.jpg",
      description: {
        en: "Golden crinkle fries, coxinhas, and crispy snacks.",
        pt: "Fritas douradas, coxinhas crocantes e salgados de boteco.",
      },
    },
    {
      id: "drinks",
      name: { en: "Milkshakes & Drinks", pt: "Shakes & Bebidas" },
      count: "8 items",
      image: "/images/drink-milkshake.jpg",
      description: {
        en: "Fudge milkshakes, ice-cold Guaraná Antarctica & Coca-Cola.",
        pt: "Milkshakes cremosos, Guaraná Antarctica gelado e Coca-Cola.",
      },
    },
    {
      id: "desserts",
      name: { en: "Traditional Plates", pt: "Pratos Feitos" },
      count: "4 items",
      image: "/images/plate-stroganoff-chicken.jpg",
      description: {
        en: "Signature chicken & beef stroganoff with white rice & batata palha.",
        pt: "O clássico strogonoff brasileiro com arroz soltinho e batata palha.",
      },
    },
  ],

  // Featured Products (Our Favorites & Full Menu Selection)
  featuredProducts: [
    {
      id: "classic-burger",
      category: "burgers",
      title: "Mr. Burdog Classic",
      description: {
        en: "Beef patty, melted cheddar cheese, crisp lettuce, ripe tomato and our famous homemade green herb sauce.",
        pt: "Hambúrguer de carne bovina, queijo cheddar derretido, alface, tomate e nosso molho especial verde.",
      },
      price: "$14.99",
      numericPrice: 14.99,
      image: "/images/burger-classic.jpg",
      badge: "Top Seller",
      calories: "720 kcal",
      ingredients: ["Angus Beef", "Cheddar Cheese", "Secret Green Sauce", "Brioche Bun", "Lettuce & Tomato"],
    },
    {
      id: "bacon-burdog",
      category: "burgers",
      title: "Bacon Burdog",
      description: {
        en: "Juicy beef patty, stacks of crispy hardwood bacon, caramelized onions, melted cheddar cheese, and signature house BBQ mayo.",
        pt: "Hambúrguer suculento, fatias crocantes de bacon defumado, cebola caramelizada, cheddar e maionese artesanal.",
      },
      price: "$16.99",
      numericPrice: 16.99,
      image: "/images/burger-bacon.jpg",
      badge: "Customer Favorite",
      calories: "890 kcal",
      ingredients: ["Angus Beef", "Hardwood Smoked Bacon", "Caramelized Onions", "Cheddar", "House Mayo"],
    },
    {
      id: "picanha-burger",
      category: "burgers",
      title: "Picanha Burger",
      description: {
        en: "Brazilian-style ground picanha steak, seared queijo coalho cheese, authentic chimichurri vinaigrette, fresh lettuce and tomato.",
        pt: "Hambúrguer de pura picanha brasileira, queijo coalho tostado na chapa, chimichurri artesanal, alface e tomate.",
      },
      price: "$17.99",
      numericPrice: 17.99,
      image: "/images/burger-picanha.jpg",
      badge: "Premium Cut",
      calories: "810 kcal",
      ingredients: ["Prime Picanha Cut", "Queijo Coalho", "Chimichurri Vinaigrette", "Artisan Bun"],
    },
    {
      id: "steak-sandwich",
      category: "burgers",
      title: "Queijo Coalho Steak Sandwich",
      description: {
        en: "Tender grilled steak medallions topped with a thick slab of golden grilled queijo coalho cheese, crisp greens and herb garlic aioli on artisan roll.",
        pt: "Tiras de bife macio grelhado com uma fatia generosa de queijo coalho tostado, folhas verdes e maionese de alho em pão artesanal crocante.",
      },
      price: "$18.49",
      numericPrice: 18.49,
      image: "/images/sandwich-coalho.jpg",
      badge: "Chef Special",
      calories: "840 kcal",
      ingredients: ["Grilled Steak", "Queijo Coalho", "Garlic Herb Aioli", "Artisan Crusty Bread"],
    },
    {
      id: "brazilian-hotdog",
      category: "hotdogs",
      title: "Brazilian Hot Dog",
      description: {
        en: "Savory dog, seasoned shredded chicken, sweet corn, melted mozzarella cheese, garlic mayonnaise, and crunchy batata palha.",
        pt: "Salsicha especial, frango desfiado temperado, milho doce, queijo derretido, maionese temperada e batata palha.",
      },
      price: "$12.99",
      numericPrice: 12.99,
      image: "/images/hotdog-brazilian.jpg",
      badge: "Authentic Street Food",
      calories: "650 kcal",
      ingredients: ["Special Dog", "Seasoned Shredded Chicken", "Sweet Corn", "Mozzarella", "Batata Palha"],
    },
    {
      id: "hotdog-long",
      category: "hotdogs",
      title: "Double Long Pressed Dog",
      description: {
        en: "Footlong pressed Brazilian hot dog stuffed with double sausage, seasoned chicken, corn, peas, melted catupiry-style cheese, toasted on the flat-top.",
        pt: "Cachorro-quente prensado gigante com duas salsichas, frango desfiado, milho, ervilha, queijo cremoso derretido e casquinha tostada.",
      },
      price: "$15.99",
      numericPrice: 15.99,
      image: "/images/hotdog-long.jpg",
      badge: "Giant Portion",
      calories: "920 kcal",
      ingredients: ["Double Sausage", "Shredded Chicken", "Catupiry-style Cheese", "Sweet Corn", "Crispy Batata Palha"],
    },
    {
      id: "chicken-skewers",
      category: "snacks",
      title: "Chicken Skewers (Medalhão)",
      description: {
        en: "Grilled tender chicken breast wrapped in smoky bacon, served with toasted Brazilian farofa and fresh house vinaigrette sauce.",
        pt: "Medalhões de frango grelhados envoltos em bacon defumado, servidos com farofa crocante e vinagrete caseiro.",
      },
      price: "$13.99",
      numericPrice: 13.99,
      image: "/images/skewers-chicken.jpg",
      badge: "Top Snack",
      calories: "580 kcal",
      ingredients: ["Tender Chicken", "Hardwood Bacon", "Toasted Farofa", "Brazilian Vinaigrette"],
    },
    {
      id: "skewers-mixed",
      category: "snacks",
      title: "Sizzling Espetinho Platter",
      description: {
        en: "Trio of Brazilian skewers featuring bacon chicken, sirloin steak, and smoked calabresa sausage served on a hot sizzling griddle.",
        pt: "Trio de espetinhos na chapa quente: medalhão de frango com bacon, alcatra e calabresa defumada com farofa temperada.",
      },
      price: "$19.99",
      numericPrice: 19.99,
      image: "/images/skewers-sizzling.jpg",
      badge: "Shareable",
      calories: "780 kcal",
      ingredients: ["Sirloin Beef", "Calabresa", "Bacon Chicken", "Farofa", "House Sauces"],
    },
    {
      id: "coxinhas-basket",
      category: "sides",
      title: "Golden Coxinhas Platter",
      description: {
        en: "Traditional teardrop croquettes filled with creamy seasoned shredded chicken, deep-fried to golden crispy perfection.",
        pt: "Coxinhas de frango com massa macia e casquinha super crocante, servidas com maionese especial Mr. Burdog.",
      },
      price: "$11.99",
      numericPrice: 11.99,
      image: "/images/appetizer-coxinhas.jpg",
      badge: "Traditional",
      calories: "520 kcal",
      ingredients: ["Shredded Chicken", "Creamy Seasoning", "Crispy Batter", "Special Herb Dip"],
    },
    {
      id: "pastels-basket",
      category: "sides",
      title: "Brazilian Pastéis de Feira",
      description: {
        en: "Three oversized crispy fried pastries stuffed with seasoned ground beef and melted cheese, served hot with house vinaigrette.",
        pt: "Três pastéis de feira sequinhos e crocantes recheados com carne moída temperada e queijo derretido.",
      },
      price: "$10.99",
      numericPrice: 10.99,
      image: "/images/appetizer-pastels.jpg",
      badge: "Street Legend",
      calories: "490 kcal",
      ingredients: ["Flaky Pastry Dough", "Seasoned Beef", "Melted Cheese", "Vinaigrette"],
    },
    {
      id: "choc-milkshake",
      category: "drinks",
      title: "Fudge Chocolate Milkshake",
      description: {
        en: "Ultra-thick milkshake blended with premium chocolate ice cream, swirled with rich dark fudge syrup and topped with whipped cream.",
        pt: "Milkshake super cremoso de chocolate nobre com calda artesanal de fudge e chantilly.",
      },
      price: "$8.99",
      numericPrice: 8.99,
      image: "/images/drink-milkshake.jpg",
      badge: "Sweet Treat",
      calories: "540 kcal",
      ingredients: ["Chocolate Ice Cream", "Dark Fudge Swirl", "Whole Milk", "Whipped Cream"],
    },
    {
      id: "chicken-stroganoff",
      category: "desserts",
      title: "Authentic Chicken Stroganoff",
      description: {
        en: "Tender chicken strips simmered in our rich, savory tomato-cream sauce with fresh mushrooms, served with jasmine rice and crispy batata palha.",
        pt: "Cubos de frango macios em molho cremoso tradicional com cogumelos, servido com arroz branco soltinho e muita batata palha.",
      },
      price: "$16.99",
      numericPrice: 16.99,
      image: "/images/plate-stroganoff-chicken.jpg",
      badge: "Brazilian Comfort",
      calories: "750 kcal",
      ingredients: ["Chicken Breast", "Brazilian Stroganoff Sauce", "Jasmine Rice", "Batata Palha"],
    },
    {
      id: "beef-stroganoff",
      category: "desserts",
      title: "Prime Beef Stroganoff Platter",
      description: {
        en: "Tender beef tenderloin cuts in a velvety cognac-infused cream sauce, accompanied by white rice, side house salad, and crunchy batata palha.",
        pt: "Filé bovino macio em molho aveludado de strogonoff, servido com arroz branco, salada da casa e batata palha crocante.",
      },
      price: "$18.99",
      numericPrice: 18.99,
      image: "/images/plate-stroganoff-beef.jpg",
      badge: "Chef Signature",
      calories: "820 kcal",
      ingredients: ["Prime Beef Strips", "Cognac Cream Sauce", "Steamed Rice", "Batata Palha", "Fresh Salad"],
    },
  ],

  // Our Locations
  locations: [
    {
      id: "orlando",
      city: "Orlando",
      state: "FL",
      address: "5427 International Dr, Orlando, FL 32819",
      phone: "(407) 590-7534",
      hours: {
        en: "Mon - Sun: 11:00 AM - 11:00 PM",
        pt: "Seg - Dom: 11:00 às 23:00",
      },
      image: "/images/store-orlando.jpg",
      mapUrl: "https://maps.google.com/?q=5427+International+Dr,+Orlando,+FL+32819",
      badge: "Flagship Restaurant",
      status: "Open Daily",
    },
    {
      id: "pompano",
      city: "Pompano Beach",
      state: "FL",
      address: "1200 E Sample Rd, Pompano Beach, FL 33064",
      phone: "(954) 880-9210",
      hours: {
        en: "Tue - Sun: 12:00 PM - 10:00 PM",
        pt: "Ter - Dom: 12:00 às 22:00",
      },
      image: "/images/store-pompano.jpg",
      mapUrl: "https://maps.google.com/?q=Pompano+Beach,+FL+33064",
      badge: "New Location",
      status: "Serving South Florida",
    },
  ],

  // Our Story
  story: {
    badge: {
      en: "OUR STORY",
      pt: "NOSSA HISTÓRIA",
    },
    headline: {
      en: "Born in Brazil. Made with Passion.",
      pt: "Nascido no Brasil. Feito com Paixão.",
    },
    lead: {
      en: "Every great burger has a story. Ours began in Brazil in 2017.",
      pt: "Todo grande hambúrguer tem uma história. A nossa começou no Brasil em 2017.",
    },
    paragraphs: [
      {
        en: "Mr. Burdog was born from a burning dream: to bring the unbeatable energy, vibrant culture, and explosive flavors of Brazilian street comfort food to the United States.",
        pt: "O Mr. Burdog nasceu de um sonho autêntico: levar a energia incomparável, a cultura vibrante e os sabores marcantes do street food brasileiro para o mundo.",
      },
      {
        en: "From day one, we refused to take shortcuts. We hand-grind our beef, source real Brazilian queijo coalho, make our famous green sauce from scratch every morning, and grill every bun with pure dedication.",
        pt: "Desde o primeiro dia, nunca abrimos mão da qualidade. Moemos nossas carnes artesanalmente, usamos queijo coalho legítimo, preparamos o famoso molho verde fresco todas as manhãs e tostamos cada pão com muito carinho.",
      },
      {
        en: "Today, with buzzing stores in Orlando and Pompano Beach, Mr. Burdog is more than a restaurant — it's a taste of home for Brazilians and an unforgettable culinary discovery for everyone in Florida.",
        pt: "Hoje, com unidades em Orlando e Pompano Beach, o Mr. Burdog é mais do que um restaurante: é o gostinho de casa para a comunidade e uma descoberta inesquecível para todos na Flórida.",
      },
    ],
    timeline: [
      {
        year: "2017",
        title: { en: "Brazil Roots", pt: "Origem no Brasil" },
        desc: {
          en: "The dream starts with authentic street burger and hot dog recipes in São Paulo.",
          pt: "O sonho começa com receitas secretas de hambúrguer e lanches de rua.",
        },
      },
      {
        year: "2018",
        title: { en: "USA Arrival", pt: "Chegada aos EUA" },
        desc: {
          en: "Relocating to the Sunshine State, bringing original flavors to Florida.",
          pt: "Mudança para a Flórida trazendo os temperos e o molho verde original.",
        },
      },
      {
        year: "2020",
        title: { en: "Food Truck Craze", pt: "A Fama do Food Truck" },
        desc: {
          en: "Lines wrapped around the block as our food truck became an Orlando sensation.",
          pt: "Filas de dobrar quarteirão e sucesso absoluto entre moradores e turistas.",
        },
      },
      {
        year: "2023",
        title: { en: "International Drive", pt: "Restaurante Físico" },
        desc: {
          en: "Grand opening of our flagship brick-and-mortar restaurant on I-Drive.",
          pt: "Inauguração da loja principal na prestigiada International Drive em Orlando.",
        },
      },
      {
        year: "TODAY",
        title: { en: "Florida Expansion", pt: "Pompano Beach & Futuro" },
        desc: {
          en: "Proudly serving Orlando and Pompano Beach, with new locations coming soon!",
          pt: "Expandindo para Pompano Beach e levando a paixão do sabor brasileiro adiante!",
        },
      },
    ],
    image: "/images/story-interior.jpg",
    secondaryImage: "/images/store-neon-sandwich.jpg",
  },

  // Order Online Section
  orderOnline: {
    badge: {
      en: "FAST DELIVERY & PICKUP",
      pt: "ENTREGA RÁPIDA & RETIRADA",
    },
    title: {
      en: "ORDER ONLINE NOW!",
      pt: "PEÇA ONLINE AGORA!",
    },
    subtitle: {
      en: "Hungry right now? Get hot, freshly prepared burgers and hot dogs delivered straight to your door or ready for quick pickup.",
      pt: "Bateu a fome? Receba hambúrgueres e lanches quentinhos na sua porta ou retire sem fila.",
    },
    phoneMockupImage: "/images/order-phone.jpg",
    partners: [
      {
        name: "Uber Eats",
        color: "#06C167",
        bg: "#000000",
        logoType: "ubereats",
        url: "https://www.ubereats.com",
        ctaText: { en: "Order on Uber Eats", pt: "Pedir no Uber Eats" },
      },
      {
        name: "DoorDash",
        color: "#FF3008",
        bg: "#ffffff",
        logoType: "doordash",
        url: "https://www.doordash.com",
        ctaText: { en: "Order on DoorDash", pt: "Pedir no DoorDash" },
      },
      {
        name: "Order Direct",
        color: "#FF6600",
        bg: "#1a1a1a",
        logoType: "direct",
        url: "https://wa.me/14075907534?text=Hi!%20I%20would%20like%20to%20place%20an%20order%20at%20Mr.%20Burdog",
        ctaText: { en: "Order Online (Direct)", pt: "Pedir Direto (WhatsApp)" },
      },
    ],
  },

  // Testimonials
  testimonials: [
    {
      id: "ana",
      name: "Ana P.",
      location: "Orlando, FL",
      rating: 5,
      avatar: "/images/avatar-ana.jpg",
      quote: {
        en: "Best Brazilian burger in Orlando! Amazing flavor and great service! The batata palha and green sauce take it to another level.",
        pt: "Melhor hambúrguer brasileiro em Orlando! Sabor sensacional e atendimento excelente! A batata palha e o molho verde são perfeitos.",
      },
    },
    {
      id: "marcos",
      name: "Marcos F.",
      location: "Windermere, FL",
      rating: 5,
      avatar: "/images/avatar-marcos.jpg",
      quote: {
        en: "The hot dog is incredible! Just like back in Brazil. Huge portions, perfectly pressed bread, and the cheese is so fresh.",
        pt: "O cachorro-quente é espetacular! Igualzinho ao do Brasil. Porções muito generosas, pão prensado no ponto e queijo de muita qualidade.",
      },
    },
    {
      id: "juliana",
      name: "Juliana R.",
      location: "Boca Raton, FL",
      rating: 5,
      avatar: "/images/avatar-juliana.jpg",
      quote: {
        en: "Great food, friendly staff and a cozy place. Highly recommend! The chicken skewers and bacon burdog are to die for.",
        pt: "Comida incrível, equipe muito simpática e ambiente super aconchegante. Recomendo demais! Os espetinhos e o burger com bacon são top.",
      },
    },
  ],

  // Instagram Feed Carousel
  instagram: {
    handle: "@mrburdog",
    url: "https://instagram.com/mrburdog",
    badge: {
      en: "FOLLOW OUR JOURNEY",
      pt: "SIGA NOSSO INSTAGRAM",
    },
    title: {
      en: "Crave The Feed",
      pt: "Sinta o Sabor",
    },
    images: [
      { id: 1, src: "/images/burger-flagged.jpg", likes: "1.2k", caption: "The Legendary Mr. Burdog X-Tudo 🍔🔥" },
      { id: 2, src: "/images/hotdog-long.jpg", likes: "980", caption: "Double long pressed Brazilian hot dog perfection 🌭" },
      { id: 3, src: "/images/skewers-chicken.jpg", likes: "1.5k", caption: "Bacon-wrapped skewers straight off the grill 🥓🍢" },
      { id: 4, src: "/images/appetizer-coxinhas.jpg", likes: "2.1k", caption: "Golden, crispy Brazilian coxinhas with dip 🍗" },
      { id: 5, src: "/images/drink-milkshake.jpg", likes: "850", caption: "Thick chocolate fudge milkshake indulgence 🍫🥤" },
      { id: 6, src: "/images/sandwich-coalho.jpg", likes: "1.3k", caption: "Seared queijo coalho & steak on artisan roll 🧀🥩" },
      { id: 7, src: "/images/plate-stroganoff-chicken.jpg", likes: "1.7k", caption: "Brazilian comfort in a bowl: Chicken Stroganoff 🍲" },
      { id: 8, src: "/images/retro-mascot.jpg", likes: "3.4k", caption: "Stay cool with Mr. Burdog 😎🧢" },
    ],
  },

  // Footer & Contact
  footer: {
    brandBio: {
      en: "Brazilian-Style Burgers & Hot Dogs in Florida. Handcrafted with the finest ingredients and genuine Brazilian hospitality.",
      pt: "Hambúrgueres e cachorros-quentes brasileiros na Flórida. Feitos artesanalmente com os melhores ingredientes e hospitalidade brasileira.",
    },
    hours: [
      { days: { en: "Mon - Thu", pt: "Seg - Qui" }, time: "11:00 AM – 10:00 PM" },
      { days: { en: "Fri - Sat", pt: "Sex - Sáb" }, time: "11:00 AM – 11:00 PM" },
      { days: { en: "Sunday", pt: "Domingo" }, time: "12:00 PM – 9:00 PM" },
    ],
    contactInfo: {
      phone: "(407) 590-7534",
      instagram: "@mrburdog",
      email: "contact@mrburdog.com",
    },
    socialLinks: [
      { name: "Instagram", url: "https://instagram.com/mrburdog", icon: "Instagram" },
      { name: "Facebook", url: "https://facebook.com/mrburdog", icon: "Facebook" },
      { name: "TikTok", url: "https://tiktok.com/@mrburdog", icon: "Video" },
      { name: "WhatsApp", url: "https://wa.me/14075907534", icon: "MessageCircle" },
    ],
    copyright: "© 2026 Mr. Burdog. All rights reserved.",
  },
};

