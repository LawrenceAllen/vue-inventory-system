<script lang="ts" setup>
import { ref } from 'vue';
import CustomText from '../../common/custom-text.vue';
import QuantityModal from './quantity-modal.vue';

const touchStartX = ref(0)
const touchEndX = ref(0)
const showConfirmModal = ref(false)

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

const hideModal = () => {
  showConfirmModal.value = false
}

const checkDirection = () => {
  if (touchEndX.value > touchStartX.value) {
    showConfirmModal.value = true
  }
}

const getTouchStart = e => {
  touchStartX.value = e.changedTouches[0].screenX
}

const getTouchEnd = e => {
  touchEndX.value = e.changedTouches[0].screenX
  checkDirection()
}

</script>

<template>
  <div class="bg-emerald-500 p-4 rounded" :id="productID" @touchstart="e => getTouchStart(e)"
    @touchend="e => getTouchEnd(e)">
    <CustomText :value="productName" :isPrimary="true" />
    <CustomText :value="'Price: ' + '₱' + productPrice" :isPrimary="false" />
    <CustomText :value="'Quantity: ' + productQuantity + ' left'" :isPrimary="false" />
  </div>
  <QuantityModal :showModal="showConfirmModal" @cancelHandler="hideModal" :productID="productID"
    :productQuantity="productQuantity" />
</template>