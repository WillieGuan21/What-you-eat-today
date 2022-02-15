<template>
  <div class="containers w-full flex justify-center m-2">
    <div class="food">
      <div class="text-center text-4xl font-bold text-orange-600">Let's choose your meals</div>
      <div class="flex mt-8 ml-2 setting">
        <Button class="settingBtn" label="Setting" icon="pi pi-external-link" @click="openModal" />
      </div>
      <div class="grid grid-cols-3 gap-2 mt-8 footBtn">
        <Button
          class="mx-2 bg-yellow-600 border-yellow-600 footBtn-chi"
          v-for="x in foods"
          :key="x.key"
          :label="x.name"
        />
      </div>
      <div class="flex justify-end mt-8 mr-2 setting">
        <Button class="settingBtn" @click="getfinally">Filtering</Button>
      </div>
      <div class="mt-8 text-center text-3xl font-bold text-neutral-600">
        Today will eat : {{ finallFood }}
      </div>

      <Dialog
        class="settingDialog"
        header="Set up your meals"
        v-model:visible="displayModal"
        :style="{ width: '50vw' }"
        :breakpoints="{ '960px': '80vw' }"
        :modal="true"
        :closable="false"
      >
        <div class="p-2">
          <Button label="add" icon="pi pi-pencil" @click="displayEdit = true" />
        </div>
        <div class="grid sm:grid-cols-1 md:grid-cols-4 gap-2 p-2">
          <div
            class="p-field-checkbox flex gap-2 items-center"
            v-for="item in defaultList"
            :key="item.id"
          >
            <Checkbox :id="item.name" name="item" :value="item" v-model="defaultName" />
            <label :for="item.name" class="text-xl">{{ item.name }}</label>
          </div>
        </div>
        <template #footer>
          <Button label="No" icon="pi pi-times" @click="closeModal" class="p-button-text" />
          <Button label="Yes" icon="pi pi-check" @click="confirm" autofocus />
        </template>
      </Dialog>

      <Dialog
        header="Add item"
        v-model:visible="displayEdit"
        :style="{ width: '50vw' }"
        :modal="true"
        :closable="false"
      >
        <div class="mt-1">
          <InputText class="w-full" type="text" v-model="addWord" />
        </div>
        <template #footer>
          <Button label="Cancle" @click="editClose" class="p-button-text" />
          <Button label="Add" @click="editConfirm" autofocus />
        </template>
      </Dialog>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import axios from "axios";
import Layout from "../../components/layout/index.vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const foods = ref([
      { name: "麥當勞" },
      { name: "漢堡王" },
      { name: "老周牛肉麵" },
      { name: "Mr.Dount" },
    ]);
    const test = computed(() => {
      return store.state.foods;
    });
    const finallFood = ref(null);
    const getfinally = () => {
      const val = Object.values(foods.value);
      let myArray = [];
      val.forEach((i) => {
        myArray.push(i.name);
      });
      store.dispatch("a_calladdFoods", myArray);

      const myselected = Math.floor(Math.random() * test.value.length);
      finallFood.value = test.value[myselected];
    };

    const displayModal = ref(false);
    const closeModal = () => {
      displayModal.value = false;
      if (defaultName.value === foods.value) {
        return;
      } else {
        defaultName.value = foods.value;
      }
    };
    const confirm = () => {
      displayModal.value = false;
      foods.value = defaultName.value;
    };
    const openModal = () => {
      displayModal.value = true;
    };
    const defaultList = ref([
      { name: "麥當勞" },
      { name: "漢堡王" },
      { name: "老周牛肉麵" },
      { name: "Mr.Dount" },
      { name: "狸燒" },
      { name: "摩斯漢堡" },
      { name: "pizza Hot" },
      { name: "韓式" },
      { name: "胖老爹" },
      { name: "火鍋" },
    ]);
    const defaultName = ref(defaultList.value.slice(0, 4));

    const displayEdit = ref(false);
    const editClose = () => {
      displayEdit.value = false;
      addWord.value = "";
    };
    const editConfirm = () => {
      displayEdit.value = false;
      defaultList.value.push({ name: addWord.value });
      addWord.value = "";
    };
    const addWord = ref("");

    return {
      foods,
      getfinally,
      store,
      test,
      finallFood,
      closeModal,
      openModal,
      displayModal,
      defaultList,
      defaultName,
      confirm,
      displayEdit,
      editClose,
      editConfirm,
      addWord,
    };
  },
};
</script>

<style lang="scss" scoped>
.wapper-div {
  @apply flex items-center mb-3;
  min-width: 370px;
}

.setting {
  .settingBtn {
    @apply bg-amber-500 border-amber-500;
  }
  ::v-deep(.p-button:enabled:hover) {
    background-color: #d97706;
    border-color: #d97706;
  }
}

.footBtn {
  ::v-deep(.p-button:enabled:hover) {
    background-color: #b45309;
    border-color: #b45309;
  }
}

.footBtn-chi {
  word-break: break-word;
}

.containers {
  overflow-y: hidden;
  background-image: url("../../src/assets/eat.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
}
.warpLeft {
  background-color: bisque;
  height: 100%;
  overflow-y: scroll;
  padding: 20px 0px;
  ul {
    padding: 0px 20px;
    color: #27272a;
    font-size: 20px;
    li {
      padding: 20px 12px;
      // height: 3rem;
      // line-height: 3rem;
    }
    li:hover {
      background-color: #d4d4d8;
      cursor: pointer;
    }
  }
}
.warpRight {
  background-color: darkgrey;
  height: 100%;
  overflow-y: auto;
  padding: 14px;
}
.food {
  width: 800px;
  height: auto;
  ::v-deep(.p-selectbutton) {
    div {
      margin: 10px;
      border: none;
    }
  }
}
</style>
