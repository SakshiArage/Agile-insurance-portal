const Policy = require('../models/Policy');

// ─────────────────────────────────────────────────────────────
// GET /api/policies
// GET /api/policies?category=health
// ─────────────────────────────────────────────────────────────
const getAllPolicies = async (req, res) => {
  try {
    const { category, page = 1, limit = 12 } = req.query;

    // Build filter — always only active policies
    const filter = { isActive: true };
    if (category && category !== 'all') {
      filter.category = category.toLowerCase();
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [policies, total] = await Promise.all([
      Policy.find(filter)
        .sort({ createdAt: -1 })          // newest first
        .skip(skip)
        .limit(Number(limit))
        .populate('admin', 'name email'),  // include admin info
      Policy.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      count: policies.length,
      total,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      data: policies,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────────────────────
// GET /api/policies/search?q=keyword
// ─────────────────────────────────────────────────────────────
const searchPolicies = async (req, res) => {
  try {
    const { q, page = 1, limit = 12 } = req.query;

    if (!q || q.trim() === '') {
      return res.status(400).json({ success: false, message: 'Search query is required' });
    }

    const skip = (Number(page) - 1) * Number(limit);

    // MongoDB $text search (uses the text index defined in the model)
    const filter = {
      isActive: true,
      $text: { $search: q.trim() },
    };

    const [policies, total] = await Promise.all([
      Policy.find(filter, { score: { $meta: 'textScore' } })
        .sort({ score: { $meta: 'textScore' } }) // best match first
        .skip(skip)
        .limit(Number(limit))
        .populate('admin', 'name email'),
      Policy.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      count: policies.length,
      total,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      query: q,
      data: policies,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────────────────────
// GET /api/policies/:id
// ─────────────────────────────────────────────────────────────
const getPolicyById = async (req, res) => {
  try {
    const policy = await Policy.findById(
        req.params.id).populate('admin', 'name email');
    if (!policy) {
        return 
            res.status(404).
            json({ success: false, 
            message: 'Policy not found' 
        });
    }

    res.status(200).
    json({ 
            success: true, 
            data: policy 
        });
    } 
    catch (error) {
    // Handle invalid ObjectId format
    if (error.name === 'CastError') {
        return 
            res.status(400).
            json({ 
                success: false, 
                message: 'Invalid policy ID' 
            });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────────────────────
// POST /api/policies  (Admin only — already working, kept here for reference)
// ─────────────────────────────────────────────────────────────
const createPolicy = async (req, res) => {
  try {
    const policy = await Policy.create({ ...req.body, admin: req.admin._id });
    res.status(201).json({ success: true, data: policy });
  } catch (error) {
    if (error.code === 11000) {
        return 
            res.status(400).
            json({ 
                success: false, 
                message: 'Policy number already exists' 
            });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────────────────────
// PUT /api/policies/:id  (Admin only)
// ─────────────────────────────────────────────────────────────
const updatePolicy = async (req, res) => {
  try {
    const policy = await Policy.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!policy) {
      return res.status(404).json({ success: false, message: 'Policy not found' });
    }

    res.status(200).json({ success: true, data: policy });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────────────────────
// DELETE /api/policies/:id  (Admin only — soft delete)
// ─────────────────────────────────────────────────────────────
const deletePolicy = async (req, res) => {
  try {
    const policy = await Policy.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!policy) {
        return 
            res.status(404).
            json({ 
                success: false, 
                message: 'Policy not found' 
            });
    }
    res.status(200).json({ success: true, message: 'Policy deactivated successfully' });
  } 
    catch (error) {
        res.status(500).
        json({ 
            success: false, 
            message: error.message 
        });
  }
};

module.exports = {
  getAllPolicies,
  searchPolicies,
  getPolicyById,
  createPolicy,
  updatePolicy,
  deletePolicy,
};