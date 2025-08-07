        // Sample product data
        const products = [
            { id: 1, name: '8 inches cake', price: "₦35,000", category: "cakes", image: "./images/product3.webp" },
            { id: 2, name: "Box of 12 Frosted Cupcakes", price: "₦20,000", category: "cupcakes", image: "./images/product2.webp" },
            { id: 3, name: '10 inches Cake', price: "₦50,000", category: "cakes", image: "./images/product9.webp" },
            { id: 4, name: "Cake Slice", price: "₦4,500", category: "cakes", image: "./images/product7.webp" },
            { id: 5, name: "Foil Cake", price: "₦3000", category: "cakes", image: "./images/product13.webp"},
            { id: 6, name: "Milk Candy", price: "₦2,500", category: "desserts", image: "./images/product1.webp" },
            { id: 7, name: '6 inches Cake', price: "₦25,000", category: "cakes", image: "./images/product4.webp"},
            { id: 8, name: "Bento Cake", price: "₦6,000", category: "cakes", image: "./images/product5.webp"},
            { id: 9, name: "Cake Parfait", price: "₦4,500", category: "desserts", image: "/images/product6.webp" },
            { id: 10, name: "Cinnamon Rolls", price: "₦3,000", category: "desserts", image: "./images/product8.webp"},
            { id: 11, name: "Plain Cupcakes", price: "₦15,000", category: "cupcakes", image: "./images/product10.webp"},
            { id: 12, name: '6 inches cake', price: "₦25,00", category: "cakes", image: "./images/product14.webp"},
            { id: 13, name: '6 inches Cake', price: "₦25,000", category: "cakes", image: "./images/product12.webp" },
            { id: 14, name: "Tea Cake", price: "₦5,000", category: "desserts", image: "./images/product11.webp" }
        ];

        let currentTestimonial = 0;
        const totalTestimonials = 4;

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            displayProducts(products);
            initializeTestimonials();
        });

        // Menu toggle
        function toggleMenu() {
            const sideMenu = document.getElementById('sideMenu');
            const overlay = document.getElementById('overlay');
            
            sideMenu.classList.toggle('active');
            overlay.classList.toggle('active');
        }

        // Display products
        function displayProducts(productsToShow, isFiltered = false) {
            const productGrid = document.getElementById('productGrid');
            productGrid.innerHTML = '';
            
            if (isFiltered) {
                productGrid.classList.add('filtered');
            } else {
                productGrid.classList.remove('filtered');
            }

            productsToShow.forEach((product, index) => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.style.animationDelay = `${index * 0.1}s`;
                productCard.innerHTML = `
                    <div class="product-image" style="background-image: url('${product.image}'); background-size: cover; background-position: center;"></div>
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">${product.price}</div>
                    <a href="https://wa.me/2348169799898?text=Hi, I'm interested in ordering ${product.name} from your website!" 
                       class="whatsapp-btn" target="_blank">
                        <i class="fab fa-whatsapp"></i> Order Now
                    </a>
                `;
                productGrid.appendChild(productCard);
            });
        }

        // Filter products
        function filterProducts(category) {
            const filterButtons = document.querySelectorAll('.filter-btn');
            filterButtons.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');

            if (category === 'all') {
                displayProducts(products, false);
            } else {
                const filteredProducts = products.filter(product => product.category === category);
                displayProducts(filteredProducts, true);
            }
        }

        // Initialize testimonials
        function initializeTestimonials() {
            const dotsContainer = document.getElementById('testimonialDots');
            for (let i = 0; i < totalTestimonials; i++) {
                const dot = document.createElement('div');
                dot.className = `dot ${i === 0 ? 'active' : ''}`;
                dot.onclick = () => goToTestimonial(i);
                dotsContainer.appendChild(dot);
            }
        }

        // Testimonial navigation
        function nextTestimonial() {
            currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
            updateTestimonial();
        }

        function previousTestimonial() {
            currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
            updateTestimonial();
        }

        function goToTestimonial(index) {
            currentTestimonial = index;
            updateTestimonial();
        }

        function updateTestimonial() {
            const testimonials = document.querySelectorAll('.testimonial');
            const dots = document.querySelectorAll('.dot');

            testimonials.forEach((testimonial, index) => {
                testimonial.classList.toggle('active', index === currentTestimonial);
            });

            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentTestimonial);
            });
        }

        // FAQ toggle
        function toggleFAQ(element) {
            const answer = element.nextElementSibling;
            const icon = element.querySelector('i');
            
            answer.classList.toggle('active');
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
        }


        // Touch/swipe support for testimonials
        let startX = 0;
        let endX = 0;

        document.querySelector('.testimonial-carousel').addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
        });

        document.querySelector('.testimonial-carousel').addEventListener('touchend', function(e) {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });

        function handleSwipe() {
            const threshold = 50;
            const diff = startX - endX;

            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    nextTestimonial();
                } else {
                    previousTestimonial();
                }
            }
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close menu if open
                    if (document.getElementById('sideMenu').classList.contains('active')) {
                        toggleMenu();
                    }
                }
            });
        });