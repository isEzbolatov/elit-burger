export const products = [
 {id:'beef',name:'Чизбургер говяжий',category:'Бургеры',price:13000,image:'cheeseburger-v3.webp',note:'Любимая классика с сыром'},
 {id:'black',name:'Блекбургер',category:'Бургеры',price:20000,image:'blackburger-v3.webp',note:'Тот самый, в чёрной булочке'},
 {id:'phila',name:'Филадельфия',category:'Роллы',price:25000,image:'philadelphia-v3.webp',note:'Нежный вкус для вашего вечера'},
 {id:'fries',name:'Картофель фри',category:'Закуски',price:12000,image:'fries-v3.webp',note:'Золотистый и хрустящий'},
 {id:'pizza',name:'Пепперони',category:'Пицца',price:25000,image:'pizza-v3.webp',note:'Базовый вариант по меню'},
 {id:'shawarma',name:'Шаурма',category:'Шаурма',price:15000,image:'shawarma-v3.webp',note:'Всё любимое в лаваше'},
 {id:'nuggets',name:'Наггетсы · 6 шт.',category:'Закуски',price:12000,image:'nuggets-v3.webp',note:'Хрустящий повод дополнить заказ'},
 {id:'caesar',name:'Цезарь с курицей',category:'Салаты',price:25000,image:'salad-v3.webp',note:'Когда хочется чего-то лёгкого'}
];
/** @param {unknown} input @returns {Record<string, number>} */
export function sanitizeCart(input) {
 /** @type {Record<string, number>} */
 const result = {};
 if (!input || typeof input !== 'object' || Array.isArray(input)) return result;
 for (const p of products) { const q = Reflect.get(input,p.id); if (Number.isInteger(q) && q > 0 && q <= 20) Object.assign(result,{[p.id]:q}); }
 return result;
}
/** @param {Record<string,number>} cart @param {string} mode */
export function totals(cart,mode='delivery') {
 const safe=sanitizeCart(cart);
 const subtotal=products.reduce((sum,p)=>sum+p.price*(safe[p.id]||0),0);
 const count=Object.values(safe).reduce((sum,q)=>sum+q,0);
 const delivery=subtotal>0 && mode==='delivery' && subtotal<60000 ? 15000 : 0;
 return {subtotal,count,delivery,total:subtotal+delivery};
}
/** @param {string} phone */
export function validPhone(phone) { return /^[78]\d{10}$/.test(phone.replace(/\D/g,'')); }
/** @param {number} cents */
export function money(cents) { return new Intl.NumberFormat('ru-RU',{style:'currency',currency:'RUB',maximumFractionDigits:0}).format(cents/100); }
