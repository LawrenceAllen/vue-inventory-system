<script lang="ts" setup>
import { ref } from 'vue';
import { productsColRef } from '../../../firebase-config';
import { doc, updateDoc } from 'firebase/firestore';
import CustomText from '../../common/custom-text.vue';
import CustomButton from '../../common/custom-button.vue';

const touchStartX = ref(0)
const touchEndX = ref(0)
const showQuantityButtons = ref(false)

interface props {
  productID: string
  productName: string
  productPrice: number
  productQuantity: number
  productOrder: number
}

const props = withDefaults(defineProps<props>(), {
  productID: '',
  productName: '',
  productPrice: 0,
  productQuantity: 0,
  productOrder: 0
});

const checkDirection = () => {
  if (touchEndX.value > touchStartX.value) {
    showQuantityButtons.value = true
  }
}

const getTouchStart = e => {
  touchStartX.value = e.changedTouches[0].screenX
}

const getTouchEnd = e => {
  touchEndX.value = e.changedTouches[0].screenX
  checkDirection()
}

const decreaseQuantity = () => {
  const productDocRef = doc(productsColRef, props.productID)
  updateDoc(productDocRef, { quantity: props.productQuantity - 1 })
}

const cancelQuantityDecrease = () => {
  showQuantityButtons.value = false
}

</script>

<template>
  <div class="flex flex-col gap-2">
    <div 
      class="bg-emerald-500 p-4 rounded w-full" 
      :id="productID"
      @touchstart="e => getTouchStart(e)" 
      @touchend="e => getTouchEnd(e)"
    >
      <CustomText :value="productName" :isPrimary="true" />
      <CustomText :value="'Price: ' + '₱' + productPrice" :isPrimary="false" />
      <CustomText :value="'Quantity: ' + productQuantity + ' left'" :isPrimary="false" />
    </div>
    <div v-if="showQuantityButtons" class="flex flex-col gap-2">
      <CustomButton class="text-black h-12" :buttonType="'else'" :value="'Decrease Quantity'" @click="decreaseQuantity"/>
      <CustomButton class="text-emerald-900 h-10" :buttonType="'cancel'" :value="'Cancel'" @click="cancelQuantityDecrease"/>
    </div>
  </div>

</template>