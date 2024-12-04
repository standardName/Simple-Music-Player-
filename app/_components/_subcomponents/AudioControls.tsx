"use client";
import styles from "../../styles/Player.module.css";
import { LuPause } from "react-icons/lu";
import { LuSkipBack } from "react-icons/lu";
import { LuPlay } from "react-icons/lu";
import { LuSkipForward } from "react-icons/lu";
import { playerStore } from "@/lib/store";
import { Track } from "@/types";

function AudioControls() {
  const play = playerStore((state) => state.play);
  const audioRef = playerStore((state) => state.audioRef);
  const data = playerStore((state) => state.data);
  const currentTrack = playerStore((state) => state.currentTrack);
  const setCurrentTrack = (state: Track) =>
    playerStore.getState().setCurrentTrack(state);
  const setPlay = (state: boolean) => playerStore.getState().setPlay(state);
  const setDuration = (state: number) =>
    playerStore.getState().setDuration(state);

  const playAudio = () => {
    if (audioRef.current && !play) {
      audioRef.current.play();
      setDuration(audioRef.current.duration);
      setPlay(true);
    } else if (audioRef.current && play) {
      audioRef.current.pause();
      setPlay(false);
    }
  };
  async function setTrackPos(action: string) {
    setDuration(0);
    if (data) {
      const index = data.findIndex((item) => item.id === currentTrack?.id);
      let curIndex = index;
      if (action === "next") {
        curIndex = index + 1 < data.length ? index + 1 : index;
      } else if (action === "prev") {
        curIndex = index - 1 >= 0 ? index - 1 : index;
      }
      setCurrentTrack(data[curIndex]);
      setPlay(true);
      if (audioRef.current) {
        audioRef.current.load();
        audioRef.current.play();
        audioRef.current.onloadedmetadata = () => {
          setDuration(audioRef.current!.duration);
        };
      }
    }
  }

  return (
    <div className={styles["controls-container"]}>
      <button className={styles.prev} onClick={() => setTrackPos("prev")}>
        <LuSkipBack />
      </button>

      <button onClick={playAudio} className={styles["play-btn"]}>
        {!play ? <LuPlay className={styles["play-btn-pad"]} /> : <LuPause />}{" "}
      </button>

      <button onClick={() => setTrackPos("next")}>
        <LuSkipForward />
      </button>
    </div>
  );
}

export default AudioControls;
