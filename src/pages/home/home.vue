<script setup>
import { ref } from 'vue';
import { onSnapshot } from 'firebase/firestore';
import { productsColRef } from '../../../firebase-config';
import InventoryList from '../../components/home/inventory-list.vue';
import AddProductForm from '../../components/home/add-product-form.vue';

const productList = ref([])

onSnapshot(productsColRef, (snap) => {
  productList.value = snap.docs.map(e => ({
    name: e.data().name,
    price: "₱" + e.data().price + ".00",
    quantity: e.data().quantity + " left", 
    id: e.id
  }))
})

</script>

<template>
  <div class="flex flex-col justify-center items-center gap-4 w-full p-6">
    <p class="text-3xl text-white">Inventory</p>
    <AddProductForm />
    <InventoryList :productList="productList"/>
  </div>
</template>