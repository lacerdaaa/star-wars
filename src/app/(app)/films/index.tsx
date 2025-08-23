import { Film } from "@/src/models/film";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Params } from "../characters/[id]";


export default function FilmDetailScreen() {
  const { id } = useLocalSearchParams<Params>();

  const [film, setFilm] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState<string>('');


  return (
    <div>

    </div>
  )
}