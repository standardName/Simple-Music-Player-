"use client";
import { playerStore } from "@/lib/store";
import styles from "../../styles/Header.module.css";
import { IoSearchOutline } from "react-icons/io5";
import { useState } from "react";
import { Track } from "@/types";
function Search() {
  const [res, setRes] = useState<Track[]>([]);
  const data = playerStore((state) => state.data);
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

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    if (data) {
      const value = e.target.value;
      const searchResult = data?.filter((item) =>
        item.track_name.toLowerCase().includes(value.toLowerCase())
      );
      setRes(searchResult);
      if (value === "") {
        setRes([]);
      }
    }
  }

  return (
    <div className={styles.search}>
      <form action="">
        <input
          id="search"
          placeholder="Search for a song"
          type="search"
          className={styles["search-input"]}
          autoComplete="off"
          onChange={(e) => handleSearch(e)}
        />
        <label htmlFor="search" className={styles["search-label"]}>
          <IoSearchOutline />
        </label>
      </form>
      {res.length > 0 && (
        <div>
          {res.map((item) => (
            <div
              role="button"
              className={styles["search-item"]}
              key={item.id}
              onClick={() => setTrack(item)}
            >
              {item.track_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
