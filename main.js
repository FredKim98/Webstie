Vue.component('Book_details', {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template: `
    <ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>
  `
})

Vue.component('Book', {
  props: {
    Membership: {
      type: Boolean,
      required: true
    }
  },
  template: `
   <div class="Book">
        
      <div class="Book_image">
        <img :src="image" />
      </div>

      <div class="Book_info">
          <h1>Bookstore</h1>
          <h1>{{ Book }}</h1>
          <p v-if="inStock">In Stock</p>
          <p v-else>Out of Stock</p>
          <p>Price: {{ Price }}</p>

          <Book_details :details="details"></Book_details>

          <div class="color-box"
               v-for="(variant, index) in variants" 
               :key="variant.variantId"
               :style="{ backgroundColor: variant.variantType }"
               @mouseover="updateBook(index)">
          </div> 
          
          <button v-on:click="addToCart" 
          >
          Add to cart
          </button>

          <div class="cart">
            <p> Cart({{ cart }})</p>
          </div>        
       </div>  
    </div>
   `,

  data() {
    return {
        Book: 'The Witcher',
        brand: 'Vue Mastery',
        selectedVariant: 0,
        details: ['Writer: Andrzej Sapkowski', 'Genre: Action adventure', 'Published date: 7-JUN-2007'],
        variants: [
          {
            variantId: 1,
            variantType: 'Book',
            variantImage:  'https://i.ebayimg.com/images/g/iwwAAOSw6~Bij8s0/s-l500.jpg',
            variantQuantity: 12     
          },
          {
            variantId: 2,
            variantType: 'Bundle',
            variantImage: 'https://i.ebayimg.com/images/g/5mcAAOSwTYRiRoul/s-l500.jpg',
            variantQuantity: 0     
          }
        ],
        cart: 0
    }
  },
    methods: {
      addToCart: function() {
          this.cart += 1
      },
      updateBook: function(index) {  
          this.selectedVariant = index
      }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.Book 
        },
        image(){
            return this.variants[this.selectedVariant].variantImage
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },
        Price() {
          if (this.Membership) {
            return "8.00"
          }
            return 12.00
        }
    }
})


var app = new Vue({
    el: '#app',
    data: {
      Membership: true
    }
})




