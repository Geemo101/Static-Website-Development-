// ===== Mobile Navigation Toggle =====
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

if (navToggle && mainNav) {
    navToggle.addEventListener('click', function() {
        mainNav.classList.toggle('open');
        const icon = this.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });
}

// ===== Close mobile nav on link click =====
document.querySelectorAll('.main-nav a').forEach(link => {
    link.addEventListener('click', () => {
        if (mainNav && mainNav.classList.contains('open')) {
            mainNav.classList.remove('open');
            const icon = navToggle?.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
});

// ===== Ride Booking Simulation (PickMe Style) =====
document.addEventListener('DOMContentLoaded', function() {
    const rideOptions = document.querySelectorAll('.ride-option');
    const bookBtn = document.getElementById('bookRideBtn');
    const driverMock = document.getElementById('driverMock');

    // Select ride type
    rideOptions.forEach(option => {
        option.addEventListener('click', function() {
            rideOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Book Ride
    if (bookBtn) {
        bookBtn.addEventListener('click', function() {
            const selected = document.querySelector('.ride-option.selected');
            if (!selected) {
                alert('Please select a ride type (TukTuk, Car, or Van).');
                return;
            }
            const rideName = selected.querySelector('h4').innerText;
            const fare = selected.querySelector('.fare').innerText;

            // Show driver mock
            if (driverMock) {
                driverMock.classList.add('active');
                const driverName = driverMock.querySelector('.info h4');
                const driverInfo = driverMock.querySelector('.info p');
                driverName.innerText = `🚗 ${rideName} driver is nearby!`;
                driverInfo.innerText = `Estimated fare: ${fare} • Arriving in 3 mins`;
                bookBtn.innerText = 'Booking Confirmed! ✅';
                bookBtn.disabled = true;
                bookBtn.style.opacity = '0.7';
            }
        });
    }
});

// ===== Contact Form Validation =====
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !subject || !message) {
            formFeedback.className = 'form-feedback error';
            formFeedback.textContent = '⚠️ Please fill in all fields.';
            return;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            formFeedback.className = 'form-feedback error';
            formFeedback.textContent = '⚠️ Please enter a valid email.';
            return;
        }
        formFeedback.className = 'form-feedback success';
        formFeedback.textContent = '✅ Message sent successfully! (Demo)';
        contactForm.reset();
        setTimeout(() => {
            formFeedback.className = 'form-feedback';
            formFeedback.textContent = '';
        }, 5000);
    });
}

// ===== Scroll effect for header (sticky + blur) =====
(function() {
    const header = document.getElementById('siteHeader');
    if (!header) return;

    let lastScroll = 0;
    const SCROLL_THRESHOLD = 40;

    function handleScroll() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        if (currentScroll > SCROLL_THRESHOLD) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    }

    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // run once on load
    handleScroll();
})();

console.log('🚗 Vahana.lk — Sri Lanka\'s Vehicle Marketplace');

// ===== Category filter for Rent page =====
document.addEventListener('DOMContentLoaded', function() {
    const filterSelect = document.getElementById('categoryFilter');
    if (!filterSelect) return;

    const grids = document.querySelectorAll('.rental-grid[data-category]');
    const headings = document.querySelectorAll('.category-heading');

    function filterCategories(value) {
        grids.forEach((grid, index) => {
            const category = grid.getAttribute('data-category');
            const heading = headings[index];
            if (value === 'all' || value === category) {
                grid.classList.remove('hidden-grid');
                if (heading) heading.style.display = 'block';
            } else {
                grid.classList.add('hidden-grid');
                if (heading) heading.style.display = 'none';
            }
        });
    }

    filterSelect.addEventListener('change', function() {
        filterCategories(this.value);
    });

    // Show all by default
    filterCategories('all');
});

// ===== EMI Calculator (Buy page) =====
document.addEventListener('DOMContentLoaded', function() {
    const emiModal = document.getElementById('emiModal');
    if (!emiModal) return;

    const fmt = n => Math.round(n).toLocaleString('en-IN');
    const priceSlider = document.getElementById('emiPrice');
    const downSlider = document.getElementById('emiDown');
    const tenureSlider = document.getElementById('emiTenure');
    const rateSlider = document.getElementById('emiRate');
    const emiVehicleName = document.getElementById('emiVehicleName');

    function calculateEMI() {
        const price = parseFloat(priceSlider.value);
        const downPct = parseFloat(downSlider.value);
        const years = parseFloat(tenureSlider.value);
        const annualRate = parseFloat(rateSlider.value);
        const loanAmt = price - (price * downPct / 100);
        const monthlyRate = annualRate / 12 / 100;
        const n = years * 12;
        const emi = loanAmt * monthlyRate * Math.pow(1 + monthlyRate, n) / (Math.pow(1 + monthlyRate, n) - 1);
        const totalPayable = emi * n;
        const totalInterest = totalPayable - loanAmt;

        document.getElementById('emiPriceVal').textContent = fmt(price);
        document.getElementById('emiDownVal').textContent = downPct + '%';
        document.getElementById('emiTenureVal').textContent = years + ' years';
        document.getElementById('emiRateVal').textContent = annualRate + '%';
        document.getElementById('emiMonthly').textContent = fmt(emi);
        document.getElementById('emiLoanAmt').textContent = 'Rs. ' + fmt(loanAmt);
        document.getElementById('emiInterest').textContent = 'Rs. ' + fmt(totalInterest);
        document.getElementById('emiTotal').textContent = 'Rs. ' + fmt(totalPayable);

        const affordEl = document.getElementById('emiAfford');
        affordEl.style.display = 'flex';
        affordEl.className = 'emi-affordability ok';
        affordEl.innerHTML = `<i class="fas fa-circle-info"></i> Recommended monthly income: Rs. ${fmt(emi / 0.4)}`;

        const vsRentEl = document.getElementById('emiVsRent');
        const days = Math.round(emi / 6000);
        vsRentEl.innerHTML = `<i class="fas fa-lightbulb"></i> Equivalent to renting for about <strong>${days} days</strong>/month.`;
    }

    [priceSlider, downSlider, tenureSlider, rateSlider].forEach(s => s.addEventListener('input', calculateEMI));

    document.querySelectorAll('.emi-trigger').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.vehicle-card');
            emiVehicleName.textContent = (card.dataset.name || 'Vehicle') + ' — EMI Calculator';
            priceSlider.value = card.dataset.price || 4250000;
            downSlider.value = 20;
            tenureSlider.value = 5;
            rateSlider.value = 12;
            calculateEMI();
            emiModal.classList.add('active');
        });
    });

    document.getElementById('emiModalClose').addEventListener('click', () => emiModal.classList.remove('active'));
    emiModal.addEventListener('click', e => {
        if (e.target === emiModal) emiModal.classList.remove('active');
    });
});