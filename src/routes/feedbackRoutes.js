import { createFeedback, getAllFeedback, deleteFeedback } from "../controllers/feedbackController.js";

const feedbackRoutes = (app) => {
    app.post("/api/feedback", createFeedback);
    app.get("/api/feedback", getAllFeedback);
    app.delete("/api/feedback/:id", deleteFeedback); 
};

export default feedbackRoutes;
