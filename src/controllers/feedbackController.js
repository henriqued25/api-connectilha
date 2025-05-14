import dbPool from "../config/dbConfig.js";

export const createFeedback = async (req, res) => {
    const feedbackData = req.body;

    try {

        const missingFields = [];

        if (!feedbackData.bus_number)
            missingFields.push("Número do ônibus (bus_number)"
        );

        if (!feedbackData.bus_line)
            missingFields.push("Linha do ônibus (bus_line)"
        );

        if (feedbackData.overall_rating === undefined)
            missingFields.push("Avaliação geral (overall_rating)"
        );

        if (feedbackData.safety_rating === undefined)
            missingFields.push("Avaliação de segurança (safety_rating)"
        );

        if (missingFields.length > 0) {
            return res.status(400).json({
                error: `Os seguintes campos obrigatórios estão faltando: ${missingFields.join(", ")}.`,
            });
        }

        const query = `
            INSERT INTO feedback_users (
                bus_number,
                bus_line,
                excessive_delay,
                bus_overcrowded,
                lack_of_accessibility,
                air_conditioning_broken,
                driver_misconduct,
                route_change,
                vehicle_poor_condition,
                comment,
                boarding_point,
                occurrence_location,
                overall_rating,
                safety_rating,
                improvement_suggestions
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const [result] = await dbPool.promise().query(query, [
            feedbackData.bus_number,
            feedbackData.bus_line,
            feedbackData.excessive_delay,
            feedbackData.bus_overcrowded,
            feedbackData.lack_of_accessibility,
            feedbackData.air_conditioning_broken,
            feedbackData.driver_misconduct,
            feedbackData.route_change,
            feedbackData.vehicle_poor_condition,
            feedbackData.comment,
            feedbackData.boarding_point,
            feedbackData.occurrence_location,
            feedbackData.overall_rating,
            feedbackData.safety_rating,
            feedbackData.improvement_suggestions,
        ]);

        res.status(201).json({
            message: "Feedback enviado com sucesso!",
            feedbackId: result.insertId,
        });

    } catch (error) {
        console.error("Erro ao inserir feedback:", error); 
        console.error("Detalhes do erro:", error.message); 
        console.error("Stack trace:", error.stack);
        
        return res.status(500).json({
            error: "Erro ao salvar o feedback no banco de dados."
        });
    }
};

export const getAllFeedback = async (req, res) => {
    try {
        const query = `
            SELECT
                id_feedback,
                bus_number,
                bus_line,
                excessive_delay,
                bus_overcrowded,
                lack_of_accessibility,
                air_conditioning_broken,
                driver_misconduct,
                route_change,
                vehicle_poor_condition,
                comment,
                boarding_point,
                occurrence_location,
                submission_datetime,
                overall_rating,
                safety_rating,
                improvement_suggestions
            FROM
                feedback_users
            ORDER BY
                submission_datetime DESC;
        `;

        const [rows] = await dbPool.execute(query);

        res.status(200).json(rows);

    } catch (error) {
        console.error("Erro ao buscar todos os feedbacks:", error);
        return res.status(500).json({ error: "Erro ao buscar os feedbacks no banco de dados." });
    }
};

export const deleteFeedback = async (req, res) => {
    const feedbackId = req.params.id;

    try {
        const query = `
            DELETE FROM feedback_users
            WHERE id_feedback = ?
        `;

        const [result] = await dbPool.execute(query, [feedbackId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Feedback não encontrado." });
        }

        res.status(200).json({ message: `Feedback com ID ${feedbackId} excluído com sucesso!` });

    } catch (error) {
        console.error(`Erro ao excluir feedback com ID ${feedbackId}:`, error);
        return res.status(500).json({ error: "Erro ao excluir o feedback do banco de dados." });
    }
};
