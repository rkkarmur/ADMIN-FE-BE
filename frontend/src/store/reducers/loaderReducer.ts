// Loading Reducer Types
interface LoadingState {
	authLoading: boolean;
	welcomeDataLoading: boolean;
	[key: string]: boolean;
}

interface SetLoadingActionPayload {
	scope: string;
	status: boolean;
}

interface SetLoadingAction {
	type: "SET_LOADING";
	payload: SetLoadingActionPayload;
}

type LoadingAction = SetLoadingAction;

export const loadingReducer = (state: LoadingState = { authLoading: false, welcomeDataLoading: false }, action: LoadingAction): LoadingState => {
	switch (action.type) {
		case "SET_LOADING":
			return {
				...state,
				[`${action.payload.scope}Loading`]: action.payload.status,
			};
		default:
			return state;
	}
};
