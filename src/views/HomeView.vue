<script setup>
import auth from "@/stores/auth";
import { RouterLink } from "vue-router";

const useAuth = auth();
</script>

<template>
  <div class="container mx-auto">
    <div class="flex flex-row justify-center items-center">
      <div class="w-full">
        <p class="text-xl font-bold text-indigo-600">
          Selamat datang di website
        </p>
        <h1 class="text-5xl font-bold">SPKGO</h1>
        <p class="text-xl font-bold">Sistem Pakar kecanduan Game Online</p>

        <p class="my-8">
          Klik diagnosa untuk menuju ke diagnosa kecanduan game online
        </p>

        <RouterLink
          v-show="!!useAuth.token"
          class="btn btn-primary text-white rounded-lg"
          to="/prediksi"
        >
          Diagnosa
        </RouterLink>
      </div>
      <img class="w-1/2" src="/bg-game.png" alt="" />
    </div>

    <div class="flex justify-center items-center my-5">
      <div class="card bg-warning text-primary-content w-96">
        <div class="card-body">
          <h2 class="card-title">Tentang Website SPKGO ini</h2>
          <p class="text-justify my-5">
            SPKGO adalah singkatan dari Sistem Pakar Kecanduan Game Online.
            Website ini dirancang untuk membantu mendiagnosa kecanduan bermain
            game melalui serangkaian pertanyaan yang dapat membantu
            mengidentifikasi tanda-tanda kecanduan. Anda dapat menggunakan
            sistem ini untuk memahami lebih lanjut tentang perilaku bermain game
            Anda
          </p>

          <div class="join join-vertical">
            <div class="collapse collapse-arrow join-item border-base-300">
              <input type="radio" name="my-accordion-4" />
              <div class="collapse-title text-xl font-medium">
                Bagaimana cara kerja sistem ini?
              </div>
              <div class="collapse-content">
                <p class="text-justify">
                  Sistem ini mengajukan serangkaian pertanyaan yang dirancang
                  oleh para ahli untuk mengevaluasi kebiasaan bermain game Anda.
                  Berdasarkan jawaban Anda, sistem akan memberikan indikasi
                  apakah Anda mungkin mengalami kecanduan game.
                </p>
              </div>
            </div>
            <div class="collapse collapse-arrow join-item border-base-300">
              <input type="radio" name="my-accordion-4" />
              <div class="collapse-title text-xl font-medium">
                Apa itu kecanduan bermain game?
              </div>
              <div class="collapse-content">
                <p class="text-justify">
                  Kecanduan bermain game adalah kondisi dimana seseorang tidak
                  dapat mengontrol kebiasaan bermain game mereka, sehingga
                  berdampak negatif pada kehidupan sehari-hari, termasuk
                  kesehatan fisik, mental, pekerjaan atau kehidupan sosial.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
