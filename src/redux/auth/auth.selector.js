import { createSelector } from "reselect";

const selectAuthentication = (state) => state.authentication;

const selectAuth = createSelector(
  [selectAuthentication],
  (authSlice) => authSlice && authSlice.auth
);

export const selectLoading = createSelector(
  [selectAuthentication],
  (authSlice) => authSlice && authSlice.loading
);

export const selectSubmitLoading = createSelector(
  [selectAuthentication],
  (authSlice) => authSlice && authSlice.submitLoading
);

export const selectScoreLoading = createSelector(
  [selectAuthentication],
  (authSlice) => authSlice && authSlice.scoreLoading
);

export const selectUser = createSelector(
  [selectAuth],
  (auth) => auth && auth.user
);

export const selectRole = createSelector(
  [selectUser],
  (user) => user && user.role
);

const selectTokens = createSelector(
  [selectAuth],
  (auth) => auth && auth.tokens
);

export const selectAccessToken = createSelector(
  [selectTokens],
  (tokens) => tokens && tokens.access.token
);

export const selectRefreshToken = createSelector(
  [selectTokens],
  (tokens) => tokens && tokens.refresh.token
);

export const selectAvatar = createSelector(
  [selectUser],
  (user) => user && user.avatar
);

export const selectName = createSelector(
  [selectUser],
  (user) => user && user.username
);

export const selectScore = createSelector(
  [selectUser],
  (user) => user && user.score
);
