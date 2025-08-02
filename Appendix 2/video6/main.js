const app = Vue.createApp({
    data() {
        return {
            cart: 0,
            product: 'Socks',
            image: './assets/images/socks_blue.jpg',
            inStock: true,
            description:'Tran Mai Que Anh',
            details: ['50% cotton', '30% wool', '20% polyester'],
            //task
            variants: [
              { id: 2234, color: 'green', image: './assets/images/socks_green.jpg' },
              { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg' },
            ]
        }
    },
    //task
    methods: {
        addToCart() {
            this.cart += 1
        },
        // challenge
        removeFromCart() {
            if (this.cart >= 1) {
                this.cart -= 1
            }
        },
        // challenge
        updateImage(variantImage) {
            this.image = variantImage
        }
    }
})
//Tran Mai Que Anh