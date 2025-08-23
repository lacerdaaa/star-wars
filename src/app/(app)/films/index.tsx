import { Film } from "@/src/models/film";
import { SwapiService } from "@/src/services/swapiService";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Params } from "../characters/[id]";


export default function FilmDetailScreen() {
  const { id } = useLocalSearchParams<Params>();

  const [film, setFilm] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    SwapiService.searchFilms()
  });

  const loadFilms = async () => {
    setLoading(true);
    const data = await SwapiService.searchFilms();
    setFilm(data);
    setLoading(false);
  };

  const searchFilm = async () => {
    setLoading(true);
    const data = await SwapiService.searchFilms(search);
    setFilm(data);
    setLoading(false);
  };

  return (
    <div>

    </div>
  )
}