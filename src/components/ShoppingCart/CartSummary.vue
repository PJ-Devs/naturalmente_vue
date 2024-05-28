<script setup lang="ts"></script>

<template>
  <section className="col-span-1">
    <div className="border-2 px-5 py-3 rounded-lg shadow-md bg-white">
      <details className="hover:cursor-pointer py-1 duration-700">
        <summary className="flex justify-between bg-inherit text-lg">
          <span className="font-light">
            <!-- Articulos -->
          </span>
          <span className="font-semibold text-color3">
            <!-- Sumatotal -->
          </span>
        </summary>
        <section className="mx-[5%]">
          <ul className="divide-y-2 divide-gray-200 py-1">
            <!-- Lista de productos -->
            <li className="flex flex-row justify-between py-0.5">
              <span className="font-semibold text-md"></span>
              <span className="font-semibold text-sm text-orange-500"> </span>
            </li>
          </ul>
        </section>
      </details>
      <div className="flex justify-between text-lg py-1">
        <span className="font-light">Coste de envio</span>
        <span className="font-semibold text-color3"> </span>
      </div>
      <div className="flex justify-between text-lg py-1">
        <span className="font-light"></span>
        <span className="font-semibold text-color3"> </span>
      </div>
      <div className="flex justify-between text-lg py-1 border-t-2 border-gray-100">
        <span className="font-light">Subtotal</span>
        <span className="font-semibold text-orange-500"> </span>
      </div>
      <button
        className="w-full flex items-center gap-2 justify-center text-md font-normal text-white bg-[--primary] hover:bg-[--secondary] rounded-md py-1 mt-5"
      >
        Realizar pedido
      </button>
    </div>
  </section>
</template>

<style scoped></style>
