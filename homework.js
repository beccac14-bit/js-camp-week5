// ========================================
// 第五週作業：電商資料處理系統
// ========================================

// ========== 提供的資料結構 ==========

// 產品資料
const products = [
  { id: 'prod-1', title: '經典白T', category: '衣服', origin_price: 500, price: 399, images: 'https://example.com/t1.jpg' },
  { id: 'prod-2', title: '牛仔褲', category: '褲子', origin_price: 1200, price: 899, images: 'https://example.com/p1.jpg' },
  { id: 'prod-3', title: '帆布鞋', category: '鞋子', origin_price: 1800, price: 1299, images: 'https://example.com/s1.jpg' },
  { id: 'prod-4', title: '棒球帽', category: '配件', origin_price: 350, price: 299, images: 'https://example.com/h1.jpg' },
  { id: 'prod-5', title: '運動外套', category: '衣服', origin_price: 2000, price: 1599, images: 'https://example.com/j1.jpg' }
];

// 購物車資料
const carts = [
  { id: 'cart-1', product: products[0], quantity: 2 },
  { id: 'cart-2', product: products[2], quantity: 1 },
  { id: 'cart-3', product: products[4], quantity: 1 }
];

// 訂單資料
const orders = [
  {
    id: 'order-1',
    createdAt: 1704067200, // Unix timestamp
    paid: false,
    total: 2097,
    user: { name: '王小明', tel: '0912345678', email: 'ming@example.com', address: '台北市信義區', payment: 'ATM' },
    products: [
      { ...products[0], quantity: 2 },
      { ...products[2], quantity: 1 }
    ]
  },
  {
    id: 'order-2',
    createdAt: 1704153600,
    paid: true,
    total: 899,
    user: { name: '李小華', tel: '0923456789', email: 'hua@example.com', address: '台中市西區', payment: 'Credit Card' },
    products: [
      { ...products[1], quantity: 1 }
    ]
  }
];

// ========================================
// 任務一：產品查詢模組 (基礎)
// ========================================

/**
 * 1. 根據 ID 查詢產品
 * @param {Array} products - 產品陣列
 * @param {string} productId - 產品 ID
 * @returns {Object|null} - 回傳產品物件，找不到回傳 null
 */
function getProductById(products, productId) {
  // 請實作此函式
  return products.find(function(obj){ // 使用 .find 查找對應產品 ID
  return obj.id === productId // return 對應產品 ID 的物件 obj
  }) || null   
  // return 函式結果 || null
  // 函式 .find 本來就要寫一個 return 不然答案沒辦法傳回給函式
  // A || B，運用短路邏輯，前者若為 falsy（如：undefined）則直接回傳右邊的 null

};

// 測試：
console.log(getProductById(products,'prod-1'));
console.log(getProductById(products,'prod-10'));

/**
 * 2. 根據分類篩選產品
 * @param {Array} products - 產品陣列
 * @param {string} category - 分類名稱
 * @returns {Array} - 回傳符合分類的產品陣列，若 category 為 '全部' 則回傳全部產品
 */
function getProductsByCategory(products, category) {
  // 請實作此函式
  if(category ==="全部"){
    return products;
  }

  return products.filter(obj => obj.category === category);

}


// 測試：
console.log(getProductsByCategory(products, "衣服"))
console.log(getProductsByCategory(products, "褲子"))
console.log(getProductsByCategory(products, "全部"))
console.log(getProductsByCategory(products, "??")) // .filter 沒有對應到的分類會回傳空陣列 []



/**
 * 3. 計算產品折扣率
 * @param {Object} product - 產品物件
 * @returns {string} - 回傳折扣百分比，例如 '8折' 或 '79折'
 * 計算方式：Math.round((price / origin_price) * 100) / 10
 */
function getDiscountRate(product) {
  // 請實作此函式
  // 寫法一：可以保留 79 折，運用 Math.floor 把小數點後的東西都拿掉
  // 399 / 500 * 100 = 79.8 => Math.floor 拿掉小數點後 => 79 ＋ "折"
  return Math.floor((product.price / product.origin_price) * 100)  + "折" 

  // 寫法一之二：如果 /10 算出 7.9，可以透過 toString 轉字串後，用 replace 把.拿掉
  const discountResult = 7.9 
  return discountResult.toString().replace('.', '') + '折'; // 就會變成 字串 "79折"
  
  // 寫法二：四捨五入（只要大於 0.5）就進位，所以 79.8 折（0.8>0.5）會變成 8 折
  // return  Math.round((product.price / product.origin_price) * 100) / 10 + "折" 

}



// 測試
console.log(getDiscountRate(products[0])); // 399 / 500 = 0.798 => 79.8 =取整數=> 79 =除10=> 7.9 => "7.9折"

/**
 * 4. 取得所有產品分類（不重複）
 * @param {Array} products - 產品陣列
 * @returns {Array} - 回傳分類陣列，例如 ['衣服', '褲子', '鞋子', '配件']
 */
function getAllCategories(products) {
  // 請實作此函式
 let everyCategory = products.map(function(obj){ // 取得所有分類組成一個新陣列 
  return obj.category; //產品陣列裡的分類
 }); 
 // 測試：(5) ['衣服', '褲子', '鞋子', '配件', '衣服']
 // console.log(everyCategory); 
  const newCategory = [...new Set(everyCategory)]; //用 new Set(陣列) 篩選出不重複物件，接著 ... 把它轉成陣列格式
 // 測試：(4) ['衣服', '褲子', '鞋子', '配件']
 // console.log(newCategory);
  return newCategory; 
  // 這邊也可以直接接 [...new Set(everyCategory)]，不用再另外給一個變數接住
};

// 測試：(4) ['衣服', '褲子', '鞋子', '配件']
console.log(getAllCategories(products));

// ========================================
// 任務二：購物車計算模組 (中階)
// ========================================

/**
 * 1. 計算購物車原價總金額
 * @param {Array} carts - 購物車陣列
 * @returns {number} - 回傳數字（原價 × 數量 的總和）
 */
function calculateCartOriginalTotal(carts) {
  // 請實作此函式
  return carts.reduce( function ( acc, currentItem ){ // 記得要寫 return
    return acc + (currentItem.product["origin_price"] * currentItem.quantity) // 記得要寫 return
  }, 0)
}
// 測試：值拿取正確
  console.log("1. 找到產品原價" + carts[0].product["origin_price"]) //500
  console.log("2. 找到產品數量" + carts[0].quantity) //2
  console.log("3. 兩者相乘總和" + carts[0].product["origin_price"]*carts[0].quantity) //1000
// 把地址替換成 reduce 參數
// carts[0].product["origin_price"] * carts[0].quantity
// carts[0]、carts[1] = currentItem 當前讀取的 item aka 整個物件 {id...price...}
// currentItem.product["origin_price"] * currentItem.quantity

// 測試
console.log(calculateCartOriginalTotal(carts)); // 500*2 + 1800*1 + 2000*1 = 4800

/**
 * 2. 計算購物車售價總金額
 * @param {Array} carts - 購物車陣列
 * @returns {number} - 回傳數字（售價 × 數量 的總和）
 */
function calculateCartTotal(carts) {
  // 請實作此函式
  return carts.reduce( function ( acc, currentItem ){ // 記得要寫 return
    return acc + (currentItem.product.price * currentItem.quantity) // 記得要寫 return
  }, 0);
};

// 測試：值拿取正確
  console.log("1. 找到產品售價" + carts[0].product.price) //399
  console.log("2. 找到產品數量" + carts[0].quantity) //2
  console.log("3. 兩者相乘總和" + carts[0].product.price *carts[0].quantity) // 798

//測試
console.log(calculateCartTotal(carts)); //3696

/**
 * 3. 計算總共省下多少錢
 * @param {Array} carts - 購物車陣列
 * @returns {number} - 回傳原價總金額 - 售價總金額
 */
function calculateSavings(carts) {
  // 請實作此函式
  return calculateCartOriginalTotal(carts) - calculateCartTotal(carts);
}

//測試
console.log(calculateCartOriginalTotal(carts) - calculateCartTotal(carts)); 
//先測試兩個 function（原價 - 售價）相減的結果，4800-3696=1104
console.log(calculateSavings(carts)); //1104
// 再測試 calculateSavings 函式的結果，應該要等於 1104

/**
 * 4. 計算購物車商品總數量
 * @param {Array} carts - 購物車陣列
 * @returns {number} - 回傳所有商品的 quantity 總和
 */
function calculateCartItemCount(carts) {
  // 請實作此函式
  return carts.reduce( function ( acc, currentItem ){ // 記得要寫 return
    return acc + currentItem.quantity // 記得要寫 return
  }, 0);
}

// 測試
console.log("2. 找到產品數量" + carts[0].quantity) // 把 carts[0] 換成 currentItem 就是當前讀取的 item 的數量
console.log(calculateCartItemCount(carts)); // 2 + 1 + 1 = 4



/**
 * 5. 檢查產品是否已在購物車中
 * @param {Array} carts - 購物車陣列
 * @param {string} productId - 產品 ID
 * @returns {boolean} - 回傳 true 或 false
 */
function isProductInCart(carts, productId) {
  // 請實作此函式
  // 用 .some 來去判斷 carts 陣列裡面是否有對應到的 productId，一個有的話就回傳 true

  return carts.some(function (obj){
    return obj.product.id === productId;});
};

// 測試：地址路徑
console.log(carts[0].product.id);
// 把 carts[0] 替換成 .some function 裡的 obj
console.log(isProductInCart(carts, 'prod-1')); // true
console.log(isProductInCart(carts, 'prod-2')); // false
console.log(isProductInCart(carts, 'prod-10')); // false


// ========================================
// 任務三：購物車操作模組 (進階)
// ========================================

/**
 * 1. 新增商品到購物車
 * @param {Array} carts - 購物車陣列
 * @param {Object} product - 產品物件
 * @param {number} quantity - 數量
 * @returns {Array} - 回傳新的購物車陣列（不要修改原陣列）
 * 如果產品已存在，合併數量；如果不存在，新增一筆
 */
function addToCart(carts, product, quantity) {
  // 請實作此函式

// 判斷產品是否已存在購物車中，且在既有購物車的索引位置為何
const existedTarget = carts.findIndex(function (item){
  return product.id === item.product.id 
});
// 測試
// return ExistedTarget; 測試回傳的索引位置是否為 0

// 不存在相同產品，則新增項目
if(existedTarget === -1){ //如果查無相同的兩個產品 id，findindex 則會回傳 -1
  return [...carts, 
    // 淺拷貝原購物車陣列，並且新增一筆物件；
    // 雖然 ...carts 淺拷貝後，陣列裡[] 的物件{id, product, qty}仍是舊地址，但因為沒有對物件進行變更，所以不會動到原始資料
    {
      id : `cart-${Date.now()}`, // Date.noe() 是當下時間的唯一值
      product,
      quantity
    }
  ]
} else { //代表有兩個相同的產品 id
 return carts
  .map(function(obj, index){ // 先 .map 一份清單出來
    if(index === existedTarget){ 
      // 如果 newCarts（.map 出來的）的索引位置 和 既有 carts 購物車的索引位置 相同
      // 合併數量
      return {...obj, 
        quantity : obj.quantity /*原有數量*/ + quantity /*新加入數量*/
        }
    } else {
      // else 這裡很重要！
      // 當今天在 .map 寫 if 條件時，必須告訴清楚告訴 .map() 不同條件下，都要丟資料回去
      // 不然就會出現有符合 if 條件就按照 if 條件執行，其他沒寫條件的，就會丟回 undefined，因為你沒說
      // 所以在這邊才要寫上 return obj，就是不符合 if 條件的其他狀況，你就幫我把原資料 obj 放上去就好
        return obj;
    }
});
};


};
// 測試
console.log(products[0].id === carts[0].product.id) // true
console.log(addToCart(carts, products[0], 1)); // 3 個物件 {}
console.log(addToCart(carts, products[2], 3)); // 3 個物件 {}
console.log(addToCart(carts, products[1], 3)); // 4 個物件 {}




/**
 * 2. 更新購物車商品數量
 * @param {Array} carts - 購物車陣列
 * @param {string} cartId - 購物車項目 ID
 * @param {number} newQuantity - 新數量
 * @returns {Array} - 回傳新的購物車陣列，如果 newQuantity <= 0，移除該商品
 */
function updateCartItemQuantity(carts, cartId, newQuantity) {
  // 請實作此函式
// 如果 newQuantity <= 0，就把除了那個之外的產品過濾出來變成一個新的陣列
if(newQuantity <= 0){ 
    return carts
    .filter(function(obj){
      return obj.id !== cartId; // 回傳「不包含這個 id」的新陣列
    })
  };
  
// 如果 newQuantity > 0，就拷貝出來並且更新購物車數量
return carts
.map(function(obj){
  if(cartId === obj.id){
      return {...obj, quantity: newQuantity}
  } else {
      return obj;
  }
});
  
};
console.log(updateCartItemQuantity(carts, 'cart-1', 10));
// 筆記：如果我先寫 .map 拉出來，它結果都會是相同數量的陣列，沒辦法在裡面直接刪除某個物件
// 所以建議的方式是先過濾 filter「數量 <= 0」，而不是先 .map 所有陣列

/**
 * 3. 從購物車移除商品
 * @param {Array} carts - 購物車陣列
 * @param {string} cartId - 購物車項目 ID
 * @returns {Array} - 回傳移除後的新購物車陣列
 */
function removeFromCart(carts, cartId) {
  // 請實作此函式
  return carts
  .filter(function(obj){ // 運用 filter 的特性，要的留下不要的丟掉
   return obj.id !== cartId // 把除了輸入的 Id 之外的人通通過濾出來
  })
};

console.log(removeFromCart(carts, 'cart-1'));

/**
 * 4. 清空購物車
 * @returns {Array} - 回傳空陣列
 */
function clearCart() {
  // 請實作此函式
  return [];
}
// 測試
console.log(carts);
console.log(clearCart());
console.log(carts);

// 筆記：
/*
如果你只寫一行 [...carts].length = 0，確實會把 [...carts] 這個陣列清空，
但因為 return 它回傳的值是最右邊的 0，而不是一個空陣列本人，所以還是不符合題目要求；
其他可能的作法是分成三行來寫，例如：
  let clearCart = [...carts];
  clearCart.length = 0;
  return clearCart; //這樣這裡就會是回傳空陣列本人
不過就會有點多此一舉，還不如直接 return []。
*/

// ========================================
// 任務四：訂單統計模組 (挑戰)
// ========================================

/**
 * 1. 計算訂單總營收
 * @param {Array} orders - 訂單陣列
 * @returns {number} - 只計算已付款 (paid: true) 的訂單
 */
function calculateTotalRevenue(orders) {
  // 請實作此函式
  return orders
  .filter(function(obj){
    return obj.paid === true
  })
  .reduce(function(acc, curObj){
    return acc + curObj.total;
  }, 0)
}
// 測試
console.log(calculateTotalRevenue(orders));

/**
 * 2. 篩選訂單狀態
 * @param {Array} orders - 訂單陣列
 * @param {boolean} isPaid - true 回傳已付款訂單，false 回傳未付款訂單
 * @returns {Array} - 回傳篩選後的訂單陣列
 */
function filterOrdersByStatus(orders, isPaid) {
  // 請實作此函式
   return orders
   .filter(function(obj){
      if(isPaid === true){
        return obj.paid === true;
      } else {
        return obj.paid === false;
      }
    });

// 修改後寫法：因為 isPaid 會是填入 true/false，所以只要用一行去寫就可以囉！
  return orders.filter(obj => obj.paid === isPaid);
}




// 測試
console.log(filterOrdersByStatus(orders,false));


/**
 * 3. 產生訂單統計報表
 * @param {Array} orders - 訂單陣列
 * @returns {Object} - 回傳格式：
 * {
 *   totalOrders: 2,
 *   paidOrders: 1,
 *   unpaidOrders: 1,
 *   totalRevenue: 899,
 *   averageOrderValue: 1498  // 所有訂單平均金額
 * }
 */
function generateOrderReport(orders) {
  // 請實作此函式
  const paidOrdersF = filterOrdersByStatus(orders,true);
  const unpaidOrdersF = filterOrdersByStatus(orders,false);
  const totalRevenueF = calculateTotalRevenue(orders);
  const totalOrderValueF = calculateTotalOrderValue(orders);
  function calculateTotalOrderValue(orders) { // 因為沒有計算總營收的函示所以這裡再寫一個
  return orders
  .reduce(function(acc, curObj){
    return acc + curObj.total;
  }, 0)
};
  return {
    totalOrders: orders.length,
    paidOrders: paidOrdersF.length ,
    unpaidOrders: unpaidOrdersF.length,
    totalRevenue: totalRevenueF,
    averageOrderValue: Math.round(totalOrderValueF / orders.length), //Math.round() 四捨五入
  };
}

// 測試
console.log(generateOrderReport(orders));

/**
 * 4. 依付款方式統計
 * @param {Array} orders - 訂單陣列
 * @returns {Object} - 回傳格式：
 * {
 *   'ATM': [order1],
 *   'Credit Card': [order2]
 * }
 */

// 寫法一：用 filter ＋ 設定兩個變數
function groupOrdersByPayment(orders) {
  
let filterATM = orders.filter(function(obj){ 
  // 篩選出付款方式 ATM，並用變數接住
  return obj.user.payment === 'ATM';
});
let filterCreditCard = orders.filter(function(obj){
  // 篩選出付款方式 CreditCard，並用變數接住
  return obj.user.payment === 'Credit Card';
});

return {
  'ATM': filterATM, // 直接帶 ATM 或 CreditCard 變數
  'Credit Card': filterCreditCard
};

}

// 寫法二：運用神奇的 reduce 來累加

// function groupOrdersByPayment(orders) {
//   return orders.reduce( (resultGroup, order) => {
//   const payment = order.user.payment;
//     // 如果 {} 裡面沒有 payment 屬性，則初始化為空陣列
//     // 例如 { "ATM": [], }
//   if(!groups[payment]){
//     groups[payment] = payment
//   };
//       // 接著就把該筆資料 push 進去 payment : [] 陣列裡
//       // 例如 { "ATM": [order1], }
//   groups[payment].push(order);

//   return groups;

// },{});
// }

// 測試
// console.log(filterATM);
// console.log(orders[0].user.payment);

// ========================================
// 測試區域（可自行修改測試）
// ========================================

// 任務一測試
console.log('=== 任務一測試 ===');
console.log('getProductById:', getProductById(products, 'prod-1'));
console.log('getProductsByCategory:', getProductsByCategory(products, '衣服'));
console.log('getDiscountRate:', getDiscountRate(products[0]));
console.log('getAllCategories:', getAllCategories(products));

// 任務二測試
console.log('\n=== 任務二測試 ===');
console.log('calculateCartOriginalTotal:', calculateCartOriginalTotal(carts));
console.log('calculateCartTotal:', calculateCartTotal(carts));
console.log('calculateSavings:', calculateSavings(carts));
console.log('calculateCartItemCount:', calculateCartItemCount(carts));
console.log('isProductInCart:', isProductInCart(carts, 'prod-1'));

// 任務三測試
console.log('\n=== 任務三測試 ===');
console.log('addToCart:', addToCart(carts, products[1], 2));
console.log('updateCartItemQuantity:', updateCartItemQuantity(carts, 'cart-1', 5));
console.log('removeFromCart:', removeFromCart(carts, 'cart-1'));
console.log('clearCart:', clearCart());

// 任務四測試
console.log('\n=== 任務四測試 ===');
console.log('calculateTotalRevenue:', calculateTotalRevenue(orders));
console.log('filterOrdersByStatus:', filterOrdersByStatus(orders, true));
console.log('generateOrderReport:', generateOrderReport(orders));
console.log('groupOrdersByPayment:', groupOrdersByPayment(orders));

// ========================================
// 匯出函式供測試使用
// ========================================
module.exports = {
  getProductById,
  getProductsByCategory,
  getDiscountRate,
  getAllCategories,
  calculateCartOriginalTotal,
  calculateCartTotal,
  calculateSavings,
  calculateCartItemCount,
  isProductInCart,
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
  calculateTotalRevenue,
  filterOrdersByStatus,
  generateOrderReport,
  groupOrdersByPayment
};
