<script lang="ts" setup>
import { Header, Item } from 'vue3-easy-data-table';

const productList = [
  {
    name: "Milk",
    price: 20,
    quantity: 3
  },
  {
    name: "Sugar",
    price: 10,
    quantity: 10
  },
  {
    name: "Milo",
    price: 90,
    quantity: 3
  },
];

const newProductList = productList.map((e) => 
  ({
    name: e.name,
    price: "₱" + e.price + ".00",
    quantity: e.quantity + " left"
  })
);

const headers: Header[] = [
  { text: "Product Name", value: "name" },
  { text: "Price", value: "price" },
  { text: "Quantity", value: "quantity", sortable: true }
]

const items: Item[] = newProductList;

</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <p class="text-3xl text-white">Inventory</p>
    <EasyDataTable
      class="text-black fill-black bg-white"
      border-color="#064e3b"
      header-background-color="#34d399"
      body-font-size=16
      :headers="headers" 
      :items="items"
    />
  </div>
</template>