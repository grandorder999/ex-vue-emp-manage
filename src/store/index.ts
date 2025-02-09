/**
 * 共通情報を持たせたVuexストア設定ファイルです.
 */
import Vue from "vue";
import Vuex from "vuex";
import { Employee } from "@/types/employee";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    // 従業員数
    totalEmployeeCount: 0,
    // 従業員一覧
    employees: new Array<Employee>(),
  }, // end state
  actions: {
    /**
     * 従業員一覧情報をWebAPIから取得してmutationを呼び出す.
     *
     * @param context - コンテキスト
     */
    async getEmployeeList(context) {
      const responce = await axios.get(
        "http://153.127.48.168:8080/ex-emp-api/employee/employees"
      );
      console.dir("responce:" + JSON.stringify(responce));
      const payload = responce.data;
      context.commit("showEmployeeList", payload);
    },
  }, // end actions
  mutations: {
    /**
     *従業員一覧情報を作成してstateに格納する.
     *
     * @param state - ステート
     * @param payload - WebAPIから取得した従業員情報
     */
    showEmployeeList(state, payload) {
      state.totalEmployeeCount = payload.totalEmployeeCount;
      state.employees = new Array<Employee>();
      for (const employee of payload.employees) {
        state.employees.push(
          new Employee(
            employee.id,
            employee.name,
            employee.image,
            employee.gender,
            employee.hireDate,
            employee.mailAddress,
            employee.zipCode,
            employee.address,
            employee.telephone,
            employee.salary,
            employee.characteristics,
            employee.dependentsCount
          )
        );
      }
    },
  }, // end mutations
  getters: {
    /**
     * 従業員数を返す.
     *
     * @param state - ステート
     * @returns 従業員数
     */
    getEmployeeCount(state) {
      return state.totalEmployeeCount;
    },
    /**
     * 従業員一覧を返す
     *
     * @param state - ステート
     * @returns 従業員一覧
     */
    getEmployees(state) {
      return state.employees;
    },
    /**
     * IDから従業員を１件検索し返す
     *
     * @param state - ステート
     * @returns 従業員情報
     */
    getEmployeeById(state) {
      return (id: number) => {
        return state.employees.filter((employee) => employee.id === id)[0];
        // const newEmployee = state.employees.filter((employee) => employee.id === id);
        // return newEmployee[0]; でも可
      };
    },
  }, // end getters
  modules: {}, // end modules
});
