<template>
  <div class="sample">
    <div class="top-wrapper">
      <div class="container">
        <div class="row">
          <form>
            <fieldset>
              <legend>従業員情報</legend>
              <table>
                <tr>
                  <th nowrap>従業員名</th>
                  <td>
                    <span>{{ currentEmployee.name }} </span>
                  </td>
                </tr>
                <tr>
                  <th nowrap>写真</th>
                  <td>
                    <img v-bind:src="currentEmployeeImage" />
                  </td>
                </tr>
                <tr>
                  <th nowrap>性別</th>
                  <td>
                    <span>{{ currentEmployee.gender }}</span>
                  </td>
                </tr>
                <tr>
                  <th nowrap>入社日</th>
                  <td>
                    <span>{{ currentEmployee.hireDate }}</span>
                  </td>
                </tr>
                <tr>
                  <th nowrap>メールアドレス</th>
                  <td>
                    <span>{{ currentEmployee.mailAddress }}</span>
                  </td>
                </tr>
                <tr>
                  <th nowrap>郵便番号</th>
                  <td>
                    <span>{{ currentEmployee.zipCode }}</span>
                  </td>
                </tr>
                <tr>
                  <th nowrap>住所</th>
                  <td>
                    <span>{{ currentEmployee.address }}</span>
                  </td>
                </tr>
                <tr>
                  <th nowrap>電話番号</th>
                  <td>
                    <span>{{ currentEmployee.telephone }}</span>
                  </td>
                </tr>
                <tr>
                  <th nowrap>給料</th>
                  <td>
                    <span>{{ currentEmployee.salary }}円</span>
                  </td>
                </tr>
                <tr>
                  <th nowrap>特性</th>
                  <td>
                    <span>{{ currentEmployee.characteristics }}</span>
                  </td>
                </tr>
                <tr>
                  <th nowrap>扶養人数</th>
                  <td>
                    <div class="input-field col s12">
                      <div class="error">{{ errorMessage }}</div>
                      <input
                        v-model="currentDependentsCount"
                        id="dependentsCount"
                        type="text"
                        class="validate"
                        value="3"
                        required
                      />
                      <label for="dependentsCount2"></label>
                    </div>
                  </td>
                </tr>
              </table>

              <button
                v-on:click="update"
                type="button"
                class="btn btn-register waves-effect waves-light"
              >
                更新
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Employee } from "@/types/employee";
import axios from "axios";
@Component
export default class EmployeeDetail extends Vue {
  //対象の従業員オブジェクト
  private currentEmployee = new Employee(
    0,
    "",
    "",
    "",
    new Date(),
    "",
    "",
    "",
    "",
    0,
    "",
    0
  );
  //エラーメッセージ
  private errorMessage = "";
  //対象の従業員のimageパス
  private currentEmployeeImage = "";
  //対象の従業員の扶養人数
  private currentDependentsCount = 0;
  /**
   *VuexストアのGetter経由で受け取ったリクエストパラメータのIDから１件の従業員情報を取得する.
   */
  created(): void {
    console.log("createdイベント発生");
    const employeeId = Number(this.$route.params.id); // $routeは$routerの{}一個分&リクエストパラメータのidの数字(文字列)を取得
    this.currentEmployee = this.$store.getters.getEmployeeById(employeeId); // 引数にemployeeIdを設定
    // 画像取得
    this.currentEmployeeImage =
      "http://153.127.48.168:8080/ex-emp-api/img/" + this.currentEmployee.image; // 画像ファイル名→this.currentEmployee.image
    // 扶養人数取得
    this.currentDependentsCount = this.currentEmployee.dependentsCount;
  }
  /**
   *扶養人数を更新する.
   *@returns Promiseオブジェクト
   */
  async update(): Promise<void> {
    const responce = await axios.post(
      "http://153.127.48.168:8080/ex-emp-api/employee/update",
      {
        id: this.currentEmployee.id,
        dependentsCount: this.currentDependentsCount,
      }
    );
    console.dir("responce:" + JSON.stringify(responce));
    if (responce.data.status === "success") {
      this.$router.push("/employeeList");
    } else {
      this.errorMessage = "更新できませんでした";
    }
  }
}
</script>

<style scoped></style>
