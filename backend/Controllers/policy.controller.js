const Policy = require("../models/Policy");

//  ADMIN — Create a new policy
//  Route  : POST /api/policies/admin/create
//  Access : Admin only  (protect with verifyAdmin middleware)
//  Body   : all Policy schema fields
const createPolicy = async (req, res) => {
  try {
    const {
      category,
      companyName,
      companyLogo,
      policyName,
      monthlyPremium,
      coverageAmount,
      claimRatio,
      validityYears,
      rating,
      emiAvailable,
      policyType,
      features,
      description,
    } = req.body;

    // Required fields
    if (!category || !companyName || !policyName) {
      return res.status(400).json({
        success: false,
        message: "category, companyName, and policyName are required.",
      });
    }

    // Prevent duplicate policy names under same company
    const duplicate = await Policy.findOne({
      companyName: companyName.trim(),
      policyName: policyName.trim(),
    });

    if (duplicate) {
      return res.status(409).json({
        success: false,
        message: `"${policyName}" already exists for ${companyName}.`,
      });
    }

    // Create and save 
    const policy = await Policy.create({
      category,
      companyName:    companyName.trim(),
      companyLogo:    companyLogo   || "",
      policyName:     policyName.trim(),
      monthlyPremium: monthlyPremium || 0,
      coverageAmount: coverageAmount || 0,
      claimRatio:     claimRatio     || 0,
      validityYears:  validityYears  || 1,
      rating:         rating         || 0,
      emiAvailable:   emiAvailable   || false,
      policyType:     policyType     || "",
      features:       features       || [],
      description:    description    || "",
      isActive:       true,
    });

    return res.status(201).json({
      success: true,
      message: "Policy created successfully.",
      policy,
    });

  } catch (error) {
    // Mongoose validation error (e.g. category not in enum)
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }

    console.error("[createPolicy]", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

//  ADMIN — Update an existing policy
//  Route  : PUT /api/policies/admin/:id
//  Access : Admin only
const updatePolicy = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Policy.findByIdAndUpdate(
      id,
      { $set: req.body },        // only overwrite fields that are sent
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Policy not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Policy updated successfully.",
      policy: updated,
    });

  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    if (error.name === "CastError") {
      return res.status(400).json({ success: false, message: "Invalid policy ID." });
    }

    console.error("[updatePolicy]", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// ═══════════════════════════════════════════════════════════════════
//  ADMIN — Soft-delete (deactivate) a policy
//  Route  : DELETE /api/policies/admin/:id
//  Access : Admin only
//
//  We never hard-delete — existing purchases still reference this
//  policy. Setting isActive = false hides it from users.
// ═══════════════════════════════════════════════════════════════════
const deactivatePolicy = async (req, res) => {
  try {
    const { id } = req.params;

    const policy = await Policy.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!policy) {
      return res.status(404).json({ success: false, message: "Policy not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Policy deactivated successfully.",
      policy,
    });

  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ success: false, message: "Invalid policy ID." });
    }
    console.error("[deactivatePolicy]", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// ═══════════════════════════════════════════════════════════════════
//  ADMIN — Get ALL policies (active + inactive) for dashboard
//  Route  : GET /api/policies/admin/all
//  Access : Admin only
// ═══════════════════════════════════════════════════════════════════
const getAllPoliciesAdmin = async (req, res) => {
  try {
    const policies = await Policy.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: policies.length,
      policies,
    });
  } catch (error) {
    console.error("[getAllPoliciesAdmin]", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

//  USER — Get all active policies by category
//  Route  : GET /api/policies/category/:category
//  Access : Public (user does not need to be logged in to browse)
//
//  Frontend sends: /api/policies/category/health
//  Returns lightweight card data — only what a listing page needs.
const getPoliciesByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const allowedCategories = ["health", "life", "auto", "home", "travel"];

    if (!allowedCategories.includes(category.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: `Invalid category. Choose from: ${allowedCategories.join(", ")}`,
      });
    }

    const policies = await Policy.find({
      category:  category.toLowerCase(),
      isActive:  true,
    }).select(
      // Only the fields a policy card on the listing page needs
      "companyName companyLogo policyName monthlyPremium coverageAmount claimRatio rating emiAvailable validityYears features"
    );

    if (!policies.length) {
      return res.status(404).json({
        success: false,
        message: `No active policies found for category: ${category}`,
      });
    }

    return res.status(200).json({
      success:  true,
      category: category.toLowerCase(),
      count:    policies.length,
      policies,
    });

  } catch (error) {
    console.error("[getPoliciesByCategory]", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// ═══════════════════════════════════════════════════════════════════
//  USER — Get full details of a single policy
//  Route  : GET /api/policies/:id
//  Access : Public
//
//  Returns every field so the React detail page renders completely
//  from a single API call — no second request needed.
// ═══════════════════════════════════════════════════════════════════
const getPolicyById = async (req, res) => {
  try {
    const { id } = req.params;

    const policy = await Policy.findById(id);

    if (!policy) {
      return res.status(404).json({
        success: false,
        message: "Policy not found.",
      });
    }

    return res.status(200).json({
      success: true,
      policy,
    });

  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ success: false, message: "Invalid policy ID format." });
    }
    console.error("[getPolicyById]", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};


module.exports = {
  // Admin
  createPolicy,
  updatePolicy,
  deactivatePolicy,
  getAllPoliciesAdmin,
  // User
  getPoliciesByCategory,
  getPolicyById,
};