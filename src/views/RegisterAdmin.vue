<template>
  <div class="sample">
    <div class="top-wrapper">
      <div class="container">
        <div class="row register-page">
          <div class="error" v-for="error of errors" v-bind:key="error">
            {{ error }}
          </div>
          <div class="error">{{ errorMessage }}</div>
          <form class="col s12" id="reg-form">
            <div class="row">
              <div class="input-field col s6">
                <input
                  v-model="lastName"
                  id="last_name"
                  type="text"
                  class="validate"
                  required
                />
                <label for="last_name">姓</label>
              </div>
              <div class="input-field col s6">
                <input
                  v-model="firstName"
                  id="first_name"
                  type="text"
                  class="validate"
                  required
                />
                <label for="first_name">名</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input
                  v-model="mailAddress"
                  id="email"
                  type="email"
                  class="validate"
                  required
                />
                <label for="email">メールアドレス</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input
                  v-model="password"
                  id="password"
                  type="password"
                  class="validate"
                  minlength="8"
                  required
                />
                <label for="password">パスワード</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s6">
                <button
                  class="btn btn-large btn-register waves-effect waves-light"
                  v-on:click="registerAdmin"
                  type="button"
                >
                  登録
                  <i class="material-icons right">done</i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
@Component
export default class RegisterAdmin extends Vue {
  // 入力値チェックのエラーメッセージ
  private errors: Array<string> = [];
  //登録者のエラーメッセージ
  private errorMessage = "";
  // 姓
  private lastName = "";
  // 名
  private firstName = "";
  // メールアドレス
  private mailAddress = "";
  // パスワード
  private password = "";

  /**
   *管理者情報を登録する.
   *@returns Promiseオブジェクト
   */
  async registerAdmin(): Promise<void> {
    // エラーチェック
    this.errors = [];
    if (this.lastName === "" || this.firstName === "") {
      this.errors.push("姓または名が入力されていません");
    }
    if (this.mailAddress === "") {
      this.errors.push("メールアドレスが入力されていません");
    }
    if (this.password === "") {
      this.errors.push("パスワードが入力されていません");
    }
    // エラーが１つ以上あれば処理を止める
    if (0 < this.errors.length) {
      return; //処理終了のreturn
    }

    //管理者情報登録処理
    const responce = await axios.post(
      "http://153.127.48.168:8080/ex-emp-api/insert",
      {
        name: this.lastName + "" + this.firstName,
        mailAddress: this.mailAddress,
        password: this.password,
      }
    );
    console.dir("responce:" + JSON.stringify(responce));
    if (responce.data.status === "success") {
      this.$router.push("/loginAdmin");
    } else {
      this.errorMessage = "登録できませんでした";
    }
  }
}
</script>

<style scoped>
.register-page {
  width: 600px;
}
.error {
  color: red;
}
</style>
