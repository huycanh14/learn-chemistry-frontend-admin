import { TheoryService } from "../services/theory.service";

var state = {
	theory: {
		relationships: {
			grade_id: "",
			chapter_id: "",
			lesson_id: "",
		},
	},
	theories: [],
	loading: true,
};

var getters = {};

var mutations = {
	getTheoriesByLessonId(state, data) {
		state.theories = data;
	},
};

var actions = {
	getTheoriesByLessonId({ commit }, lesson_id) {
		return TheoryService.getTheoriesByLessonId(lesson_id)
			.then((response) => {
				if (response.status == 200)
					commit("getTheoriesByLessonId", response.data.data);
				return response;
			})
			.catch((err) => err.message);
	},

	createTheory({ dispatch }, payload) {
		return TheoryService.createTheory(payload)
			.then((response) => {
				if (response.status == 200)
					dispatch(
						"getTheoriesByLessonId",
						response.data.data.relationships.lesson_id,
					);
				return response;
			})
			.catch((err) => err.message);
	},
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
