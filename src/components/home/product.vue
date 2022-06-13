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
  productActualPrice: number
  productRetailPrice: number
  productQuantity: number
  productOrder: number
}

const props = withDefaults(defineProps<props>(), {
  productID: '',
  productName: '',
  productActualPrice: 0,
  productRetailPrice: 0,
  productQuantity: 0,
  productOrder: 0
});

const touchStartX = ref(0)
const touchEndX = ref(0)
const decreaseQuantityButton = ref(false)
const sideButtons = ref(false)
const editFields = ref(false)
const quantityFields = ref(false)
const warningQuantitySingle = ref(false)
const warningQuantityMultiple = ref(false)
const newProductName = ref(props.productName)
const newActualPrice = ref(props.productActualPrice)
const newRetailPrice = ref(props.productRetailPrice)
const newQuantity = ref(props.productQuantity)
const multipleQuantity = ref(0)

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
  const currentTime = new Date().toLocaleTimeString('en-US', {hour: "numeric", minute: "numeric"})
  const currentDate = new Date().toLocaleDateString('en-US', {month: "long", day: "numeric", year: "numeric"})
  if (multipleQuantity.value === 0) {
    const productDocRef = doc(productsColRef, props.productID)
    updateDoc(productDocRef, { quantity: props.productQuantity - 1 })
    addDoc(soldColRef, {
      name: props.productName,
      date_sold: currentDate,
      time_sold: currentTime,
      sold_at: props.productRetailPrice
    })
    closeButtons()
    warningQuantitySingle.value = false
  } else {
    const productDocRef = doc(productsColRef, props.productID)
    updateDoc(productDocRef, { quantity: props.productQuantity - multipleQuantity.value })
    for (let i = 0; i < multipleQuantity.value; i++) {
      addDoc(soldColRef, {
        name: props.productName,
        date_sold: currentDate,
        time_sold: currentTime,
        sold_at: props.productRetailPrice
      })
    }
    warningQuantityMultiple.value = false
    multipleQuantity.value = 0
  }
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

const getNewActualPrice = e => {
  newActualPrice.value = Number(e.target.value)
}

const getNewRetailPrice = e => {
  newRetailPrice.value = Number(e.target.value)
}

const getNewQuantity = e => {
  newQuantity.value = Number(e.target.value)
}

const updateProduct = e => {
  e.preventDefault()
  const productDocRef = doc(productsColRef, props.productID)
  updateDoc(productDocRef, {
    name: newProductName.value,
    actual_price: newActualPrice.value,
    retail_price: newRetailPrice.value,
    quantity: newQuantity.value,
  })
  closeEditFields()
}

const deleteProduct = e => {
  e.preventDefault()
  const productDocRef = doc(productsColRef, props.productID)
  deleteDoc(productDocRef)
}

const showQuantityFields = () => {
  quantityFields.value = true
}

const closeQuantityFields = () => {
  decreaseQuantityButton.value = true
  quantityFields.value = false
  multipleQuantity.value = 0
}

const showWarningQuantitySingle = () => {
  closeButtons()
  warningQuantitySingle.value = true
}

const closeWarningQuantitySingle = () => {
  warningQuantitySingle.value = false
}

const getMultipleQuantity = e => {
  multipleQuantity.value = e.target.value
}

const showWarningQuantityMultiple = () => {
  closeButtons()
  quantityFields.value = false
  warningQuantityMultiple.value = true
}

const closeWarningQuantityMultiple = () => {
  showQuantityFields()
  warningQuantityMultiple.value = false
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
        :value="newActualPrice" 
        :label="'Actual Price'" 
        :type="'number'" 
        :placeholder="''"
        :onChange="getNewActualPrice" 
      />
      <InputSet 
        :isPrimary="true" 
        :value="newRetailPrice" 
        :label="'Retail Price'" 
        :type="'number'" 
        :placeholder="''"
        :onChange="getNewRetailPrice" 
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
        <CustomText :value="'Actual Price: ' + '₱' + props.productActualPrice" :isPrimary="false" />
        <CustomText :value="'Retail Price: ' + '₱' + props.productRetailPrice" :isPrimary="false" />
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
    <div v-if="warningQuantitySingle">
      <CustomText class="text-white text-xl text-center mb-2" :value="'Are you sure?'" :isPrimary="true" />
      <div class="flex justify-between items-center gap-2 w-full">
        <CustomButton 
          class="text-emerald-900 h-10 rounded" 
          :buttonType="'else'" 
          :value="'No'"
          @click="closeWarningQuantitySingle"
        />
        <CustomButton
          class="text-black h-10 rounded" 
          :buttonType="'cancel'" 
          :value="'Yes'" 
          @click="decreaseQuantity"
        />
      </div>
    </div>
    <div v-if="!quantityFields" class="flex flex-col justify-center items-center gap-2">
      <CustomText v-if="decreaseQuantityButton" class="text-white text-xl text-center" :value="'Decrease Quantity'" :isPrimary="true" />
      <CustomButton
        v-if="decreaseQuantityButton" 
        class="text-black h-10 rounded" 
        :buttonType="'else'" 
        :value="'Single item'"
        @click="showWarningQuantitySingle" 
      />
      <CustomButton
        v-if="decreaseQuantityButton" 
        class="text-black h-10 rounded" 
        :buttonType="'else'" 
        :value="'Multiple items'"
        @click="showQuantityFields" 
      />
    </div>
    <div v-if="warningQuantityMultiple">
      <CustomText class="text-white text-xl text-center mb-2" :value="'Are you sure?'" :isPrimary="true" />
      <div class="flex justify-between items-center gap-2 w-full">
        <CustomButton 
          class="text-emerald-900 h-10 rounded" 
          :buttonType="'else'" 
          :value="'No'"
          @click="closeWarningQuantityMultiple"
        />
        <CustomButton
          class="text-black h-10 rounded" 
          :buttonType="'cancel'" 
          :value="'Yes'" 
          @click="decreaseQuantity"
        />
      </div>
    </div>
    <div v-if="quantityFields" class="flex flex-col justify-center items-center gap-2">
      <CustomText class="text-white text-xl text-center" :value="'Enter number of items'" :isPrimary="true" />
      <InputSet
        :isPrimary="true" 
        :value="multipleQuantity"
        :label="''" 
        :type="'number'" 
        :placeholder="''"
        :onChange="getMultipleQuantity" 
      />
      <div class="flex justify-between items-center gap-2 w-full">
        <CustomButton 
          class="text-emerald-900 h-10 rounded" 
          :buttonType="'else'" 
          :value="'Cancel'"
          @click="closeQuantityFields"
        />
        <CustomButton
          v-if="multipleQuantity !== 0" 
          class="text-black h-10 rounded" 
          :buttonType="'cancel'" 
          :value="'Save'" 
          @click="showWarningQuantityMultiple"
        />
        <CustomButton
          v-else
          class="text-black h-10 rounded" 
          :buttonType="'cancel'" 
          :value="'Save'" 
        />
      </div>
    </div>
  </div>

</template>