const menuItems = [
  { name: 'لاتيه', description: 'إسبريسو متوازن مع حليب مبخر ورغوة ناعمة.', category: 'coffee', categoryName: 'قهوة', price: 18, image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80' },
  { name: 'كابتشينو', description: 'إسبريسو غني، حليب مخملي ولمسة كاكاو.', category: 'coffee', categoryName: 'قهوة', price: 17, image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80' },
  { name: 'قهوة اليوم', description: 'قهوة مقطرة مختارة، تتغير حسب الموسم.', category: 'coffee', categoryName: 'قهوة', price: 14, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80' },
  { name: 'فلات وايت', description: 'جرعتان إسبريسو مع حليب ناعم ومتجانس.', category: 'coffee', categoryName: 'قهوة', price: 17, image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80' },
  { name: 'آيس لاتيه', description: 'إسبريسو بارد مع الحليب ومكعبات الثلج.', category: 'cold', categoryName: 'بارد', price: 19, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80' },
  { name: 'كولد برو', description: 'قهوة منقوعة ببطء، بطعم ناعم ومنعش.', category: 'cold', categoryName: 'بارد', price: 20, image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80' },
  { name: 'تشيزكيك التوت', description: 'تشيزكيك كريمي مع صوص التوت الطازج.', category: 'dessert', categoryName: 'حلى', price: 22, image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80' },
  { name: 'كيكة التمر', description: 'كيكة دافئة بالتمر مع صوص الكراميل.', category: 'dessert', categoryName: 'حلى', price: 18, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80' }
];

const menuGrid = document.getElementById('menuGrid');
const searchInput = document.getElementById('menuSearch');
const resultsCount = document.getElementById('resultsCount');
const emptyState = document.getElementById('emptyState');
const categoryButtons = [...document.querySelectorAll('[data-category]')];
let selectedCategory = 'all';

function normalizeArabic(value) {
  return value.normalize('NFKC').replace(/[\u064B-\u065F\u0670\u0640]/g, '').trim().toLocaleLowerCase('ar');
}

function renderMenu() {
  const query = normalizeArabic(searchInput.value);
  const visibleItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = normalizeArabic(`${item.name} ${item.description} ${item.categoryName}`).includes(query);
    return matchesCategory && matchesSearch;
  });

  menuGrid.replaceChildren(...visibleItems.map((item) => {
    const card = document.createElement('article');
    card.className = 'menu-card';

    const imageWrap = document.createElement('div');
    imageWrap.className = 'item-image-wrap';
    const image = document.createElement('img');
    image.className = 'item-image';
    image.src = item.image;
    image.alt = item.name;
    image.loading = 'lazy';
    image.addEventListener('error', () => {
      image.classList.add('is-fallback');
      imageWrap.classList.add('has-fallback');
    }, { once: true });
    const category = document.createElement('span');
    category.className = 'item-category';
    category.textContent = item.categoryName;
    imageWrap.append(image, category);

    const content = document.createElement('div');
    content.className = 'item-content';
    const heading = document.createElement('div');
    heading.className = 'item-heading';
    const name = document.createElement('h3');
    name.textContent = item.name;
    const price = document.createElement('span');
    price.className = 'item-price';
    price.textContent = `${item.price} ر.س`;
    heading.append(name, price);
    const description = document.createElement('p');
    description.className = 'item-description';
    description.textContent = item.description;
    content.append(heading, description);
    card.append(imageWrap, content);
    return card;
  }));

  resultsCount.textContent = `عرض ${visibleItems.length} من ${menuItems.length} أصناف`;
  emptyState.hidden = visibleItems.length > 0;
  menuGrid.hidden = visibleItems.length === 0;
}

categoryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    selectedCategory = button.dataset.category;
    categoryButtons.forEach((categoryButton) => {
      const isActive = categoryButton === button;
      categoryButton.classList.toggle('is-active', isActive);
      categoryButton.setAttribute('aria-pressed', String(isActive));
    });
    renderMenu();
  });
});

searchInput.addEventListener('input', renderMenu);
document.getElementById('resetFilters').addEventListener('click', () => {
  searchInput.value = '';
  selectedCategory = 'all';
  categoryButtons.forEach((button) => {
    const isActive = button.dataset.category === 'all';
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
  renderMenu();
  searchInput.focus();
});

renderMenu();
