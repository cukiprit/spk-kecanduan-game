<script setup>
import { ref, onMounted } from "vue";

const questions = ref([]);
const evaluationCriteria = ref(null);
const responses = ref({});
const evaluation = ref(null);

const fetchQuestion = async () => {
  try {
    const response = await fetch("http://localhost:3000/questions", {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache",
        pragma: "no-cache",
      },
    });
    const result = await response.json();
    questions.value = result;
    console.log("Fetch Question");
    console.log(result);
  } catch (err) {
    console.error(`Error fetching questions: ${err.message}`);
  }
};

const fetchEvaluationCriteria = async () => {
  try {
    const response = await fetch("http://localhost:3000/evaluation", {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache",
        pragma: "no-cache",
      },
    });
    const result = await response.json();
    evaluationCriteria.value = result;
    console.log("Fetch Evaluation");
    console.log(result);
  } catch (err) {
    console.error(`Error fetching criteria: ${err.message}`);
  }
};

onMounted(() => {
  fetchQuestion();
  fetchEvaluationCriteria();
});

const evaluateResponses = () => {
  let score = 0;
  questions.value.forEach((question) => {
    const answer = responses.value[question.id];
    score += question.rules[answer.toLowerCase()];
  });

  const criteria = evaluationCriteria.value.criteria;
  let riskLevel;
  if (score <= 4) {
    riskLevel = "low_risk";
  } else if (score <= 9) {
    riskLevel = "moderate_risk";
  } else if (score <= 14) {
    riskLevel = "high_risk";
  } else {
    riskLevel = "severe_risk";
  }

  evaluation.value = {
    score: score,
    riskLevel: riskLevel,
    advice: evaluationCriteria.value.advice[riskLevel],
  };
};
</script>

<template>
  <div class="container mx-auto">
    <h1 class="text-3xl font-bold mt-5">Game Addiction Assesments</h1>

    <form class="my-10" @submit.prevent="evaluateResponses">
      <div v-for="question in questions" :key="question.id">
        <p>{{ question.question }}</p>
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">Yes</span>
            <input
              type="radio"
              :name="'question-' + question.id"
              value="yes"
              v-model="responses[question.id]"
              class="radio checked:bg-blue-500"
            />
          </label>
        </div>
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">No</span>
            <input
              type="radio"
              :name="'question-' + question.id"
              value="no"
              v-model="responses[question.id]"
              class="radio checked:bg-red-500"
            />
          </label>
        </div>
      </div>
      <button class="btn btn-primary px-5 my-5" type="submit">Submit</button>
    </form>
    <div class="mb-10" v-if="evaluation">
      <h2 class="font-bold text-center my-5 text-2xl">Evaluation Result</h2>
      <p class="text-center text-xl">Score: {{ evaluation.score }}</p>
      <p class="text-center text-xl">Risk Level: {{ evaluation.riskLevel }}</p>
      <p class="text-center text-xl">Advice: {{ evaluation.advice }}</p>
    </div>
  </div>
</template>
