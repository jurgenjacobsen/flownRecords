<template>
  <div class="flex flex-col relative">
    <label :for="id" class="text-sm text-white/75 mb-1">{{ label }}</label>
    <input
      :id="id"
      type="text"
      :class="inputClass"
      :placeholder="placeholder"
      v-model="query"
      @input="handleInput"
      @focus="showDropdown = true"
      @blur="hideDropdown"
      autocomplete="off"
    />
    <div
      v-show="showDropdown"
      :class="dropdownClass"
      class="absolute top-full left-0 right-0 mt-1 z-10 overflow-hidden"
    >
      <ul>
        <li
          v-for="(item, index) in filteredItems"
          :key="item[itemKey] ?? index" @mousedown.prevent="selectItem(item)"
          :class="[itemClass, { [itemDividerClass]: index > 0 }]"
          class="flex items-center cursor-pointer"
        >
          <div class="w-6 h-6 mr-3 flex-shrink-0 flex items-center justify-center"> <img
              v-if="itemImageProperty && item[itemImageProperty]"
              :src="item[itemImageProperty]"
              :alt="item[displayProperty] || 'item image'"
              class="w-full h-full object-cover rounded-full"
              @error="onImageError" />
            <div
              v-else-if="showItemCircle"
              class="w-4 h-4 bg-gray-400 rounded-full"
            ></div>
             </div>
          <span>{{ item[displayProperty] }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, watch } from 'vue';

  const props = defineProps({
    id: { type: String, required: true },
    label: { type: String, required: true },
    items: { type: Array, required: true },
    modelValue: { type: String, default: '' },

    // Item Handling
    itemKey: { type: String, default: 'id' },
    displayProperty: { type: String, default: 'name' },
    itemImageProperty: { type: String, default: null },

    placeholder: { type: String, default: '' },
    inputClass: { type: String, default: 'bg-secondary ring-2 ring-white/25 rounded-lg px-4 py-2 focus:outline-none focus:ring-white/50' },
    dropdownClass: { type: String, default: 'bg-secondary ring-1 ring-white/25 rounded-lg shadow-lg' },
    itemClass: { type: String, default: 'px-4 py-2 hover:bg-white/10 text-white' },
    itemDividerClass: { type: String, default: 'border-t border-white/25' },
    showItemCircle: { type: Boolean, default: true }
  });

  const emit = defineEmits(['update:modelValue']);

  const query = ref(props.modelValue);
  const showDropdown = ref(false);

  watch(() => props.modelValue, (newValue) => {
    if (query.value !== newValue) {
      query.value = newValue;
    }
  });

  const filteredItems = computed(() => {
    const searchQuery = query.value?.trim()?.toLowerCase();

    // If query is empty, show everything
    if (!searchQuery) {
      return props.items;
    }

    return props.items.filter(item =>
      item[props.displayProperty]?.toLowerCase().includes(searchQuery)
    );
  });

  const handleInput = () => {
      showDropdown.value = true;
  };

  const selectItem = (item) => {
    if (item[props.displayProperty] === props.modelValue) return;
    const displayValue = item[props.displayProperty];
    query.value = displayValue;
    emit('update:modelValue', displayValue);
    showDropdown.value = false;
  };

  const hideDropdown = () => {
    setTimeout(() => {
      // Logic for handling blur remains the same
      if(query.value !== props.modelValue) {
        // Option 1: Reset to last selected value if user didn't choose
        // query.value = props.modelValue;
      }
      showDropdown.value = false;
    }, 150);
  };

  const onImageError = (event) => {
    console.warn('Image failed to load:', event.target.src);
    // Optional: replace with a default placeholder image
    // event.target.src = '/path/to/default/placeholder.png';
    // Or hide the image element and show the circle (more complex state needed)
    event.target.style.display = 'none';
  };

</script>

<style scoped>
/* Add any component-specific styles here if absolutely necessary */
</style>