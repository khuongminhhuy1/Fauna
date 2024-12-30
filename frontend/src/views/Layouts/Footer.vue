<template lang="">
  <footer class="footer bg-gray-900 text-white p-10 mt-12">
    <div
      class="footer-content grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10"
    >
      <!-- Logo Section -->
      <aside class="flex justify-center sm:justify-start">
        <img src="/images/vertical-logo.png" alt="Faumart logo" class="w-[200px]" />
      </aside>

      <!-- Services Section -->
      <nav>
        <h6 class="footer-title text-lg font-semibold">Services</h6>
        <ul>
          <li><a class="link link-hover" href="#">Branding</a></li>
          <li><a class="link link-hover" href="#">Design</a></li>
          <li><a class="link link-hover" href="#">Marketing</a></li>
          <li><a class="link link-hover" href="#">Advertisement</a></li>
        </ul>
      </nav>

      <!-- Company Section -->
      <nav>
        <h6 class="footer-title text-lg font-semibold">Company</h6>
        <ul>
          <li><a class="link link-hover" href="#">About us</a></li>
          <li><a class="link link-hover" href="#">Contact</a></li>
          <li><a class="link link-hover" href="#">Jobs</a></li>
          <li><a class="link link-hover" href="#">Press kit</a></li>
        </ul>
      </nav>

      <!-- Legal Section -->
      <nav>
        <h6 class="footer-title text-lg font-semibold">Legal</h6>
        <ul>
          <li><a class="link link-hover" href="#">Terms of use</a></li>
          <li><a class="link link-hover" href="#">Privacy policy</a></li>
          <li><a class="link link-hover" href="#">Cookie policy</a></li>
        </ul>
      </nav>
    </div>

    <!-- Optional: Social Media Section -->
    <div class="flex justify-center gap-4 mt-6">
      <a href="#" class="text-white hover:text-teal-500">Facebook</a>
      <a href="#" class="text-white hover:text-teal-500">Instagram</a>
      <a href="#" class="text-white hover:text-teal-500">Twitter</a>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'MainFooter',
}
</script>
