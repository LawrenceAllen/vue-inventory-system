<script lang="ts" setup>
import { ref } from 'vue';
import { productsColRef, soldColRef } from '../../../firebase-config';
import { doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import CustomText from '../../common/custom-text.vue';
import CustomButton from '../../common/custom-button.vue';
import InputSet from '../../common/input-set.vue';

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

const touchStartX = ref(0)
const touchEndX = ref(0)
const decreaseQuantityButton = ref(false)
const sideButtons = ref(false)
const editFields = ref(false)
const newProductName = ref(props.productName)
const newPrice = ref(props.productPrice)
const newQuantity = ref(props.productQuantity)

const checkDirection = () => {
  if ((touchStartX.value - touchEndX.value) < -250) {
    decreaseQuantityButton.value = true
    sideButtons.value = false
  } else if ((touchStartX.value - touchEndX.value) > 250) {
    decreaseQuantityButton.value = false
    sideButtons.value = true
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
  const currentDate = new Date().toLocaleDateString('en-US', {month: "long", day: "numeric", year: "numeric"})
  const productDocRef = doc(productsColRef, props.productID)
  updateDoc(productDocRef, { quantity: props.productQuantity - 1 })
  addDoc(soldColRef, {
    name: props.productName,
    date_sold: currentDate
  })
}

const closeButtons = () => {
  decreaseQuantityButton.value = false
  sideButtons.value = false
}

const showEditFields = () => {
  editFields.value = true
}

const closeEditFields = () => {
  editFields.value = false
}

const getNewProductName = e => {
  newProductName.value = e.target.value
}

const getNewPrice = e => {
  newPrice.value = Number(e.target.value)
}

const getNewQuantity = e => {
  newQuantity.value = Number(e.target.value)
}

const updateProduct = e => {
  e.preventDefault()
  const productDocRef = doc(productsColRef, props.productID)
  updateDoc(productDocRef, {
    name: newProductName.value,
    price: newPrice.value,
    quantity: newQuantity.value,
  })
  closeEditFields()
}

const deleteProduct = e => {
  e.preventDefault()
  const productDocRef = doc(productsColRef, props.productID)
  deleteDoc(productDocRef)
}

</script>

<template>
  <div class="flex flex-col gap-2">
    <form v-if="editFields" class="flex flex-col gap-4 bg-emerald-500 p-4" @submit="updateProduct">
      <InputSet 
        :isPrimary="true" 
        :value="newProductName" 
        :label="'Product Name'" 
        :type="'text'" 
        :placeholder="''"
        :onChange="getNewProductName" 
      />
      <InputSet 
        :isPrimary="true" 
        :value="newPrice" 
        :label="'Price'" 
        :type="'number'" 
        :placeholder="''"
        :onChange="getNewPrice" 
      />
      <InputSet 
        :isPrimary="true" 
        :value="newQuantity" 
        :label="'Quantity'" 
        :type="'number'" 
        :placeholder="''" 
        :onChange="getNewQuantity" 
      />
      <div class="flex justify-between items-center gap-4 w-full">
        <CustomButton 
          class="text-black h-10 rounded" 
          :buttonType="'cancel'" 
          :value="'Cancel'"
          @click="closeEditFields" 
        />
        <CustomButton 
          class="text-white h-10 rounded" 
          :buttonType="'save'" 
          :value="'Save'" 
        />
      </div>
    </form>
    <div 
      v-if="!editFields" 
      class="flex justify-between bg-emerald-500 rounded w-full" 
      :id="productID" 
      @touchstart="e => getTouchStart(e)" 
      @touchend="e => getTouchEnd(e)" 
      @click="closeButtons"
    >
      <div class="m-4">
        <CustomText :value="productName" :isPrimary="true" />
        <CustomText :value="'Price: ' + '₱' + productPrice" :isPrimary="false" />
        <CustomText :value="'Quantity: ' + productQuantity + ' left'" :isPrimary="false" />
      </div>
      <div v-if="sideButtons" class="flex flex-col justify-center bg-white w-16 rounded">
        <CustomButton 
          class="text-emerald-900 bg-emerald-300 h-full rounded-tr" 
          :buttonType="'else'" 
          :value="'Edit'" 
          @click="showEditFields"
        />
        <CustomButton 
          class="bg-red-500 text-white h-full rounded-br" 
          :buttonType="'else'" 
          :value="'Delete'" 
          @click="deleteProduct"
        />
      </div>
    </div>
    <CustomButton
      v-if="decreaseQuantityButton" 
      class="text-black h-10 rounded" 
      :buttonType="'else'" 
      :value="'Decrease Quantity'"
      @click="decreaseQuantity" 
    />
  </div>

</template>