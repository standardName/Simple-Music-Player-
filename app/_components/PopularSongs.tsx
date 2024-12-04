"use client";
import styles from "@/app/styles/PopularSongs.module.css";
import Image from "next/image";
import ScrollSection from "./_subcomponents/ScrollSection";
import { playerStore } from "@/lib/store";
import { useMemo, useRef } from "react";
import { Track } from "@/types";

const background = [
  "#822007",
  "#2360a5",
  "#1a2752",
  "#7a3a0f",
  "#276870",
  "3f1518",
];

const PopularSongs = () => {
  const listRef = useRef(null);
  const data = playerStore((state) => state.data);
  const audioRef = playerStore((state) => state.audioRef);
  const setCurrentTrack = (state: Track) =>
    playerStore.getState().setCurrentTrack(state);
  const setPlay = (state: boolean) => playerStore.getState().setPlay(state);
  const genre = playerStore((state) => state.genre);

  const genreData = data?.filter(
    (item) => item.genre.toLocaleLowerCase() === genre.toLowerCase()
  );

  const colors = useMemo(
    () =>
      data
        ? data.map(
            () => background[Math.floor(Math.random() * background.length)]
          )
        : [],
    [data]
  );

  function setTrack(track: Track) {
    if (audioRef.current) {
      setCurrentTrack(track);
      audioRef.current.load();
      audioRef.current.play();
      setPlay(true);
    }
  }
  return (
    <div className={styles["popular-songs"]}>
      <ScrollSection ref={listRef} title="Popular Songs" />
      <ul className={styles["list"]} ref={listRef}>
        {genreData?.map((item, i) => (
          <li
            onClick={() => setTrack(item)}
            key={item.id}
            style={{
              backgroundColor: colors[i] || "#fff",
            }}
          >
            <Image
              src={item.cover}
              width={65}
              height={65}
              alt={item.track_name}
            />
            <h4>{item.track_name}</h4>
            <h5>{item.artist}</h5>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularSongs;
