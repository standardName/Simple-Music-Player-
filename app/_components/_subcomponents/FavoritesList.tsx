"use client";
import styles from "@/app/styles/Favorite.module.css";
import { playerStore } from "@/lib/store";
import Image from "next/image";
import { IoIosPlay } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { Track } from "@/types";
const FavoritesList = () => {
  const deleteFavorite = (state: Track) =>
    playerStore.getState().deleteFavorite(state);
  const favorites = playerStore((state) => state.favorites);
  const audioRef = playerStore((state) => state.audioRef);
  const setCurrentTrack = playerStore((state) => state.setCurrentTrack);
  const setPlay = playerStore((state) => state.setPlay);
  function setTrack(track: Track) {
    if (audioRef.current) {
      setCurrentTrack(track);
      audioRef.current.load();
      audioRef.current.play();
      setPlay(true);
    }
  }
  return (
    <div className={styles["favorite-list"]}>
      {favorites.map((item) => (
        <div className={styles["favorite-item"]} key={item.id}>
          <Image
            src={item.cover}
            width={35}
            height={35}
            alt={item.track_name}
          />{" "}
          <h4 className={styles["track-name"]}>{item.track_name}</h4>{" "}
          <h5 className={styles["artist"]}>{item.artist}</h5>{" "}
          <h6>{item.duration}</h6>
          <div className={styles["btns"]}>
            <button
              className={styles["play-btn"]}
              onClick={() => setTrack(item)}
            >
              <IoIosPlay />
            </button>
            <button onClick={() => deleteFavorite(item)}>
              <FaRegTrashAlt />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavoritesList;
