import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { shallowMount, flushPromises } from "@vue/test-utils";
import TheUserNameEditor from "../TheUserNameEditor.vue";
import axios from "axios";
import { createStore } from "vuex";

// https://testdriven.io/blog/vue-unit-testing/
// Mock the axios library
vi.mock("axios", () => {
  return {
    default: {
      get: vi.fn(), //mock get
      post: vi.fn(), //mock post
    },
  };
});

describe("TheUserNameEditor.vue test isXID", () => {
  beforeEach(() => {
    localStorage.setItem("userName", "00000000000000000000");
  });
  it("check 9m4e2mr0ui3e8a215n4g is valid", () => {
    const wrapper = shallowMount(TheUserNameEditor);
    expect(wrapper.vm.isXID("9m4e2mr0ui3e8a215n4g")).toBe(true);
  });
  it("check cfejfguot5un1fu2era0 is valid", () => {
    const wrapper = shallowMount(TheUserNameEditor);
    expect(wrapper.vm.isXID("cfejfguot5un1fu2era0")).toBe(true);
  });
  it("check string including an x,y, or z is invalid", () => {
    const wrapper = shallowMount(TheUserNameEditor);
    expect(wrapper.vm.isXID("cfejfguot5un1fu2erax")).toBe(false);
  });
  it("check string including punctuation is invalid", () => {
    const wrapper = shallowMount(TheUserNameEditor);
    expect(wrapper.vm.isXID("cfejfguot5un1fu2era:")).toBe(false);
  });
  it("check short string is invalid", () => {
    const wrapper = shallowMount(TheUserNameEditor);
    expect(wrapper.vm.isXID("cfejfguot5un1fu2era")).toBe(false);
  });
  it("check long string is invalid", () => {
    const wrapper = shallowMount(TheUserNameEditor);
    expect(wrapper.vm.isXID("cfejfguot5un1fu2era01")).toBe(false);
  });
  it("check string with capitalised letter is invalid", () => {
    const wrapper = shallowMount(TheUserNameEditor);
    expect(wrapper.vm.isXID("cFejfguot5un1fu2era01")).toBe(false);
  });
});

describe("TheUserNameEditor.vue test successfully get name", () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  it("renders userName from localStorage when component is created", async () => {
    // render the component
    localStorage.setItem("userName", "9m4e2mr0ui3e8a215n4g");

    const wrapper = shallowMount(TheUserNameEditor);

    await flushPromises(); //wait til DOM updates

    // check that the userName is extracted from localStorage
    expect(wrapper.vm.userName).toMatch("9m4e2mr0ui3e8a215n4g");
    expect(wrapper.text()).toContain("9m4e2mr0ui3e8a215n4g");
  });

  it("renders userName from server if none in local storage when component is created", async () => {
    //https://stackoverflow.com/questions/69330156/how-to-add-fake-store-in-shallowmount-using-vue3-typescript-in-jest-unit-tes

    const store = createStore({
      state() {
        return {
          userName: "testuser",
        };
      },
      mutations: {
        setUserName(state, userName) {
          state.userName = userName;
        },
      },
    });
    // render the component

    localStorage.setItem("userName", "");
    axios.post.mockResolvedValue({
      data: { user_name: "cfejfguot5un1fu2era0" },
    });

    const wrapper = shallowMount(TheUserNameEditor, {
      global: {
        plugins: [store],
      },
    });

    await flushPromises(); //wait til DOM updates

    expect(axios.post).toHaveBeenCalledWith("undefined/api/v1/users/unique");
    expect(wrapper.vm.userName).toMatch("cfejfguot5un1fu2era0");
    expect(wrapper.text()).toContain("cfejfguot5un1fu2era0");
  });
});
