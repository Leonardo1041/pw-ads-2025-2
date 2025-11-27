import { useState, useEffect } from "react";
import axios from "axios";
import {Typography,Card,CardContent,CardMedia,CardActions,Button,} from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import vintageCarsImg from './assets/vintage-cars.png';

function Likes() {
  const [likes, setLikes] = useState(() => {
    const armazenado = localStorage.getItem("likes");
    return armazenado ? JSON.parse(armazenado) : 0;
  });

  const [info, setInfo] = useState("");

  useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(likes));
  }, [likes]);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE}/sobre/1`);
        setInfo(response.data.info);
      } catch (error) {
        console.error("Erro ao buscar info da API:", error);
      }
    };

    fetchInfo();
  }, []);

  const incrementarLikes = () => {
    setLikes(prev => prev + 1);
  };

  return (
    <div>
      <Card sx={{ maxWidth: 600, marginBottom: 4 }}>
        <CardMedia
          component="img"
          height="220"
          image={vintageCarsImg}
          alt="Leonardo Tavares Pavan"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Sobre o Autor
          </Typography>

          <Typography variant="body1" color="text.primary">
            {info || "Leonardo Tavares Pavan é alguem que está formando na Fatec e está atualmente formando o 5 semestre agora ele está escrevendo este pequeno texto para outros olharem para ele."}
          </Typography>
        </CardContent>

        <CardActions>
          <Button
            variant="contained"
            startIcon={<ThumbUpIcon />}
            onClick={incrementarLikes}
          >
            Curtir ({likes})
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default Likes;