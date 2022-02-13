<template>
  <div>
    ログアウト中・・・
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
@Component
export default class logoutAdmin extends Vue {
  /**
   *ログアウトする.
   *@returns Promiseオブジェクト
   */
  async created(): Promise<void> {
    const responce = await axios.get(
      "http://153.127.48.168:8080/ex-emp-api/logout"
    );
    console.dir("responce:" + JSON.stringify(responce));
    this.$router.push("/loginAdmin"); // ログイン画面に遷移するだけでOK
  }
}
</script>

<style scoped></style>
