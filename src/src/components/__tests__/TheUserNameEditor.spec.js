import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { shallowMount, flushPromises } from "@vue/test-utils";
import TheUserNameEditor from "../TheUserNameEditor.vue";
//import axios from "axios";

// https://testdriven.io/blog/vue-unit-testing/
// Mock the axios library
//vi.mock("axios", () => {
//  return {
//    default: {
//      get: vi.fn(), //mock get
//      post: vi.fn(), //mock post
//    },
//  };
//});

describe("TheUserNameEditor.vue test successfully get name in local storage", () => {
  it("renders userName when component is created", async () => {
    // render the component
    localStorage.setItem("userName", "9m4e2mr0ui3e8a215n4g");

    const wrapper = shallowMount(TheUserNameEditor);

    await flushPromises(); //wait til DOM updates

    // check that the userName is extracted from localStorage
    expect(wrapper.vm.userName).toMatch("9m4e2mr0ui3e8a215n4g");

    // TODO check that the user name is rendered
  });
});
