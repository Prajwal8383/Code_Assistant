const {SavedEntry} = require('../models');

const saveEntry=async(req,res)=>{
    const { userId, prompt, response } = req.body;
    try {
      // Ensure user has no more than 3 saved entries
      const entriesCount = await SavedEntry.countDocuments({ userId });
      if (entriesCount >= 3) {
        return res.status(400).json({ message: 'Maximum of 3 saved entries allowed' });
      }
  
      const newEntry = new SavedEntry({ userId, prompt, response });
      await newEntry.save();
      res.status(201).json(newEntry);
    } catch (error) {
      res.status(500).json({ message: 'Error saving entry', error });
    }
}

const getEntries=async(req,res)=>{
    try {
        const entries = await SavedEntry.find({ userId: req.params.userId });

        res.status(200).json(entries);
      } catch (error) {
        res.status(500).json({ message: 'Error retrieving entries', error });
      }
}

const deleteEntry=async(req,res)=>{
    try {
        const entry = await SavedEntry.findByIdAndDelete(req.params.entryId);
        res.status(200).json(entry);
        } catch (error) {
            res.status(500).json({ message: 'Error deleting entry', error });
            }
}

module.exports={saveEntry, getEntries,deleteEntry}