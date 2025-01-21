<template>
  <!-- Modal Structure using DaisyUI -->
  <div>
    <!-- The modal toggle button, opens the modal -->
    <label for="address-modal" class="btn btn-primary">+</label>

    <!-- The Modal -->
    <input type="checkbox" id="address-modal" class="modal-toggle" v-model="isModalOpen" />
    <div class="modal">
      <div class="modal-box">
        <h2 class="text-xl font-semibold mb-4">Add New Address</h2>

        <!-- Address Form inside the Modal -->
        <form @submit.prevent="saveInformation" class="space-y-4">
          <div class="space-y-2">
            <input
              v-model="form.address"
              placeholder="Address"
              type="text"
              class="input input-bordered w-full"
              required
            />
            <input
              v-model="form.city"
              placeholder="City"
              type="text"
              class="input input-bordered w-full"
              required
            />
            <input
              v-model="form.state"
              placeholder="State"
              type="text"
              class="input input-bordered w-full"
              required
            />
            <input
              v-model="form.zipCode"
              placeholder="Zip Code"
              type="text"
              class="input input-bordered w-full"
              required
            />
            <input
              v-model="form.phone"
              placeholder="Phone"
              type="text"
              class="input input-bordered w-full"
              required
            />
            <input
              v-model="form.country"
              placeholder="Country"
              type="text"
              class="input input-bordered w-full"
              required
            />
          </div>

          <div class="flex justify-end space-x-4">
            <label for="address-modal" class="btn btn-ghost">Cancel</label>
            <button type="submit" class="btn btn-primary">Save Address</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { saveUserInformation } from '@/services/userServices'

export default {
  name: 'AddNewAddress',
  props: {
    userId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isModalOpen: false, // controls modal visibility
      form: {
        address: '',
        city: '',
        state: '',
        zipCode: '',
        phone: '',
        country: '',
      },
    }
  },
  methods: {
    async saveInformation() {
      try {
        // Directly use the imported saveUserInformation method
        await saveUserInformation(
          this.userId,
          this.form.address,
          this.form.city,
          this.form.state,
          this.form.zipCode,
          this.form.phone,
          this.form.country,
        )
        this.isModalOpen = false // close the modal after saving
        this.form = {} // clear form fields
      } catch (error) {
        console.error('Error saving address:', error)
      }
    },
  },
}
</script>
