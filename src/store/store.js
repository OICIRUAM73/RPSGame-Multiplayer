import { writable } from "svelte/store";

const expirationDuration = 1000 * 60 * 60;

export const roomName = writable(getLocalStorageString("room_name", "roomName"));
roomName.subscribe((val) => localStorage.setItem("roomName", val));

export const isHost = writable(getLocalStorageBoolean("is_host", "isHost"));
isHost.subscribe((val) => localStorage.setItem("isHost", val));

export const playerName = writable(getLocalStorageString("player_name", "playerName") || "Guest-" + new Date().getTime());
playerName.subscribe((val) => localStorage.setItem("playerName", val));
export const opponentName = writable(undefined);

export const playerScore = writable(getLocalStorageInt("player_score", "playerScore"));
playerScore.subscribe((val) => localStorage.setItem("playerScore", val));
export const opponentScore = writable(getLocalStorageInt("opponent_score", "opponentScore"));
opponentScore.subscribe((val) => localStorage.setItem("opponent_score", val));

export const showModal = writable(false);

const initPicked = {};
export const userPicked = writable(initPicked);

export function initUserPicked() {
  userPicked.update((current) => {
    return {};
  });
}

function getLocalStorageInt(name, itemName) {
  const prevAccepted = localStorage.getItem(`${name}_accepted`);
  const currentTime = new Date().getTime();

  const notAccepted = prevAccepted == undefined;
  const prevAcceptedExpired =
    prevAccepted != undefined && currentTime - prevAccepted > expirationDuration;
  if (notAccepted || prevAcceptedExpired) {
    localStorage.setItem(`${name}_accepted`, currentTime);
    return 0;
  } else {
    return parseInt(localStorage.getItem(itemName)) || 0;
  }
}

function getLocalStorageString(name, itemName) {
  const prevAccepted = localStorage.getItem(`${name}_accepted`);
  const currentTime = new Date().getTime();

  const notAccepted = prevAccepted == undefined;
  const prevAcceptedExpired =
    prevAccepted != undefined && currentTime - prevAccepted > expirationDuration;
  if (notAccepted || prevAcceptedExpired) {
    localStorage.setItem(`${name}_accepted`, currentTime);
    return undefined;
  } else {
    if (
      localStorage.getItem(itemName) === null ||
      localStorage.getItem(itemName) === undefined ||
      localStorage.getItem(itemName) === "null" ||
      localStorage.getItem(itemName) === "undefined"
    )
      return undefined;
    return localStorage.getItem(itemName);
  }
}

function getLocalStorageBoolean(name, itemName) {
  const prevAccepted = localStorage.getItem(`${name}_accepted`);
  const currentTime = new Date().getTime();

  const notAccepted = prevAccepted == undefined;
  const prevAcceptedExpired =
    prevAccepted != undefined && currentTime - prevAccepted > expirationDuration;
  if (notAccepted || prevAcceptedExpired) {
    localStorage.setItem(`${name}_accepted`, currentTime);
    return false;
  } else {
    if (
      localStorage.getItem(itemName) === null ||
      localStorage.getItem(itemName) === undefined ||
      localStorage.getItem(itemName) === "null" ||
      localStorage.getItem(itemName) === "undefined"
    )
      return false;
    return localStorage.getItem(itemName) === "true";
  }
}
