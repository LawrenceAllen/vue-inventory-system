<script setup>
import { ref } from 'vue';
import { onSnapshot } from 'firebase/firestore';
import { productsColRef } from '../../../firebase-config';
import InventoryList from '../../components/home/inventory-list.vue';
import AddProductForm from '../../components/home/add-product-form.vue';
import CustomButton from '../../common/custom-button.vue';

const emits = defineEmits(["clickHandler"])

const clickHandler = () => {
  emits("clickHandler")
}

const productList = ref([])
const showAddProductForm = ref(false)

onSnapshot(productsColRef, (snap) => {
  productList.value = snap.docs.map(e => ({...e.data(), id: e.id}))
})

const setShowAddProductForm = () => {
  if (showAddProductForm.value) {
    showAddProductForm.value = false
  } else {
    showAddProductForm.value = true
  }
}

</script>

<template>
  <div class="flex flex-col justify-center items-center gap-2 w-full">
    <div class="flex justify-between items-center gap-4 w-full">
      <div class="flex justify-between items-center gap-1" @click="clickHandler">
        <p class="text-2xl text-white">Inventory</p>
        <v-icon 
          name="hi-solid-switch-horizontal" 
          class="text-emerald-400"  
          scale="1.5"
        />
      </div>
      <CustomButton 
        v-if="!showAddProductForm" 
        class="h-10 w-max px-4 rounded"  
        :buttonType="'else'" 
        :value="'Add Product'" 
        @onClick="setShowAddProductForm"
      />
    </div>
    <AddProductForm 
      :showComponent="showAddProductForm" 
      :productList="productList" 
      @cancelHandler="setShowAddProductForm"
    />
    <InventoryList :productList="productList"/>
  </div>
</template>