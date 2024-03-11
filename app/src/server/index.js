import app from "./app.js";
import { PORT } from "./utils/config.js";
import logger from "./utils/logger.js";

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});