<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Employee } from "@/types/employee";
import axios from "axios";
@Component
export default class EmployeeDetail extends Vue {
  //対象の従業員オブジェクト
  private currentEmployee = "";
  //エラーメッセージ
  private errorMessage = "";
  //対象の従業員のimageパス
  private currentEmployeeImage = "";
  //対象の従業員の扶養人数
  private currentDependentsCount = 0;
  /**
   *VuexストアのGetter経由で受け取ったリクエストパラメータのIDから１件の従業員情報を取得する
   */
  created(): void {
    console.log("createdイベント発生");
    const employeeId = Number(this.$route.params.id);
    this.currentEmployee = this.$store.getters.getEmployeeId(employeeId);
    this.currentEmployeeImage =
      "http://153.127.48.168:8080/ex-emp-api/img/e1.png";
    this.currentDependentsCount = 3;
  }
}
</script>

<style scoped></style>
