import StoreModel from "../models/storeModel";

const storeController = {
  // Create a new store
  createStore: async (req, res) => {
    try {
      const { name, address, phone } = req.body;
      const store = new StoreModel({ name, address, phone });
      await store.save();
      res.status(201).json({ message: "Store created successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error creating store" });
    }
  },

  // Get all stores
  getAllStores: async (req, res) => {
    try {
      const stores = await StoreModel.find().exec();
      res.json(stores);
    } catch (error) {
      res.status(500).json({ message: "Error getting stores" });
    }
  },

  // Get a single store by ID
  getStoreById: async (req, res) => {
    try {
      const id = req.params.id;
      const store = await StoreModel.findById(id).exec();
      if (!store) {
        res.status(404).json({ message: "Store not found" });
      } else {
        res.json(store);
      }
    } catch (error) {
      res.status(500).json({ message: "Error getting store" });
    }
  },

  // Update a store
  updateStore: async (req, res) => {
    try {
      const id = req.params.id;
      const { name, address, phone } = req.body;
      const store = await StoreModel.findByIdAndUpdate(
        id,
        { name, address, phone },
        { new: true }
      ).exec();
      if (!store) {
        res.status(404).json({ message: "Store not found" });
      } else {
        res.json({ message: "Store updated successfully" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating store" });
    }
  },

  // Delete a store
  deleteStore: async (req, res) => {
    try {
      const id = req.params.id;
      await StoreModel.findByIdAndRemove(id).exec();
      res.json({ message: "Store deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting store" });
    }
  },
};

export default storeController;
