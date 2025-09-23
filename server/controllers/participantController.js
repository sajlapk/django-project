const Participant = require('../models/participantModel');

const addParticipant = async (req, res) => {
    try{
        const { name, age, height, weight } = req.body;
        if(!name || !age || !height || !weight){
            return res.status(400).json({ message: 'Please fill in all required fields' });
        }

        const newParticipant = new Participant({
            name,
            age: Number(age),
            height: Number(height),
            weight: Number(weight)
        });

        const savedParticipant = await newParticipant.save();
        res.status(201).json(savedParticipant);
    }catch(error){
        console.error("Error adding participant:", error);
        res.status(500).json({ message: "Server error while adding participant" });
    }
};

module.exports = {
    addParticipant
};