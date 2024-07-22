<script setup>
import auth from "@/stores/auth";
import moment from "moment";
import { onMounted, ref } from "vue";
import jsPDF from "jspdf";

const useAuth = auth();
const result = ref([]);

const saveResultAsPDF = (id) => {
  const selectedResult = result.value.find((item) => item.id === id);
  if (!selectedResult) return;

  const doc = new jsPDF({
    unit: "in",
    format: "a4",
    orientation: "portrait",
  });

  const addText = (text, x, y, size = 12, bold = false, centered = false) => {
    if (bold) {
      doc.setFont(undefined, "bold");
    } else {
      doc.setFont(undefined, "normal");
    }
    doc.setFontSize(size);
    const pageWidth = doc.internal.pageSize.getWidth();

    if (centered) {
      const textWidth = doc.getTextWidth(text);
      x = (pageWidth - textWidth) / 2;
    }

    const textLines = doc.splitTextToSize(text, pageWidth - 1); // 1 inch margin
    textLines.forEach((line, index) => {
      const newY = y + index * size * 0.4;
      // doc.text(line, x, y + index * size * 0.4); // Adjust line height
      if (newY > doc.internal.pageSize.getHeight() - 1) {
        doc.addPage();
        y = 1;
      }
      doc.text(line, x, newY); // Adjust line height
    });
    return y + textLines.length * size * 0.4;
  };

  let yOffset = 1;

  addText("Hasil Konsultasi", 1, yOffset, 24, true, true);
  yOffset += 0.5;

  doc.setLineWidth(0.01);
  const pageWidth = doc.internal.pageSize.getWidth();
  doc.line(1, yOffset, pageWidth - 1, yOffset); // Adjusting x1, y1, x2, y2
  yOffset += 0.5;

  addText(
    `Tanggal Konsultasi: ${moment(selectedResult.tanggal).format(
      "DD-MM-YYYY HH:mm"
    )}`,
    1,
    yOffset
  );
  yOffset += 0.2;

  addText(`Nama User: ${selectedResult.username}`, 1, yOffset);
  yOffset += 0.2;

  addText(`Skor: ${selectedResult.skor.toFixed(2)}`, 1, yOffset);
  yOffset += 0.2;

  addText(`Kode Kecanduan: ${selectedResult.kode_kecanduan}`, 1, yOffset);
  yOffset += 0.2;

  addText(
    `Perilaku Kecanduan: ${selectedResult.perilaku_kecanduan}`,
    1,
    yOffset
  );
  yOffset += 0.2;

  doc.text(`Solusi: ${selectedResult.solusi}`, 1, yOffset, {
    maxWidth: 5,
  });
  yOffset += 0.8;

  addText("Kode Gejala", 1, yOffset, 20, true);
  yOffset += 0.5;

  const kodeGejalaArray = selectedResult.kode_gejala.split(",");
  addText(`Kode Gejala: ${kodeGejalaArray.join(", ")}`, 1, yOffset);
  // addText(kodeGejalaArray.join("\n"), 1, yOffset);
  yOffset += 0.5;
  // kodeGejalaArray.forEach((kode, index) => {
  //   addText(`${index + 1}. ${kode.trim()}`, 1, yOffset);
  //   yOffset += 0.5;
  // });

  addText("Nama Gejala", 1, yOffset, 20, true);
  yOffset += 0.2;

  const namaGejalaArray = selectedResult.nama_gejala.split(",");
  namaGejalaArray.forEach((gejala, index) => {
    addText(`${index + 1}. ${gejala.trim()}`, 1, yOffset);
    yOffset += 0.2;
  });

  doc.save(`Konsultasi_${selectedResult.username}.pdf`);
};

onMounted(async () => {
  const response = await fetch("http://127.0.0.1:3000/hasil", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${useAuth.token}`,
    },
  });
  const responseData = await response.json();
  result.value = responseData.data;
});
</script>

<template>
  <div class="container mx-auto px-4">
    <h1 class="text-3xl font-bold mb-6">Result</h1>

    <div class="overflow-x-auto">
      <table class="table w-full">
        <thead>
          <tr>
            <th>Username</th>
            <th>Tanggal</th>
            <th>Skor</th>
            <th>Kecanduan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr class="hover" v-for="data in result" :key="data.kode_gejala">
            <td>{{ data.username }}</td>
            <td>{{ moment(data.tanggal).format("DD/MM/YYYY HH:mm") }}</td>
            <td>{{ data.skor.toFixed(2) }}</td>
            <td>{{ data.kode_kecanduan }} - {{ data.perilaku_kecanduan }}</td>

            <td>
              <div class="flex space-x-2">
                <button
                  class="btn btn-success mr-3"
                  @click="() => saveResultAsPDF(data.id)"
                >
                  Cetak
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
