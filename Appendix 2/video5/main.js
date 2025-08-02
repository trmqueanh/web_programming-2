const app = Vue.createApp({
    data() {
        return {
            product: 'Socks',
            image: './assets/images/socks_blue.jpg',
            description: 'Tran Mai Que Anh',
            inStock: true,
            //task
            details: ['50% cotton', '30% wool', '20% polyester'],
            // challenge
            sizes: ['S', 'M', 'L', 'XL'],
            // challenge
            variants: [
              { id: 2234, color: 'green' },
              { id: 2235, color: 'blue' },
              
            ]
        }
    }
})
//Tran Mai Que Anh