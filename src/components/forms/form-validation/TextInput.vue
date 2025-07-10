<script setup lang="ts">
import { toRef } from "vue";
import { useField } from "vee-validate";

const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  value: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  successMessage: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
});
const name = toRef(props, "name");
const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name, undefined, {
  initialValue: props.value,
});
</script>
<template>
  <div
    class="TextInput"
    :class="{ 'has-error': !!errorMessage, success: meta.valid }"
  >
    <v-text-field
      :name="name"
      :id="name"
      :type="type"
      :v-model="inputValue"
      variant="outlined"
      :valid="meta.valid"
      :label="label"
      :color="meta.valid ? 'success' : ''"
      :error-messages="errorMessage"
      :placeholder="placeholder"
      @input="handleChange"
      @blur="handleBlur"
      hide-details="auto"
    />
  </div>
</template>
