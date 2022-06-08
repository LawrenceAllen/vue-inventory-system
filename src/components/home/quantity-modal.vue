<script lang="ts" setup>
import CustomText from '../../common/custom-text.vue'
import CustomButton from '../../common/custom-button.vue'
import { productsColRef } from '../../../firebase-config';
import { doc, updateDoc } from 'firebase/firestore';

interface props {
  showModal: boolean
  productID: string
  productQuantity: number
}

const props = withDefaults(defineProps<props>(), {
  showModal: false,
  productID: '',
  productQuantity: 0
})

const decreaseQuantity = () => {
  const productDocRef = doc(productsColRef, props.productID)
  updateDoc(productDocRef, { quantity: props.productQuantity - 1 })
}

</script>

<template>
  <div v-if="showModal" class="absolute inset-0 flex justify-center items-center bg-black bg-opacity-75 w-full h-full bg-white" @click="$emit('cancelHandler')">
    <div class="flex flex-col justify-center gap-6 bg-emerald-500 w-72 h-max p-4 rounded">
      <CustomText class="text-xl text-center" :isPrimary="true" :value="'Decrease the quantity by 1?'"/>
      <CustomButton :buttonType="'save'" :value="'Confirm'" @click="decreaseQuantity"/>
    </div>
  </div>
</template>