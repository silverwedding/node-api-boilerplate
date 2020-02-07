
import app from './app';

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.info(`Application started. Listening on port: ${PORT}`);
});
