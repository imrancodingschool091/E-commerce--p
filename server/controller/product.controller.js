import { Product } from "../model/product.model.js";
import { User } from "../model/user.model.js";

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        if (!name || !description || !price || !category) return res.status(400).json({ message: "all fields are required" });

        const product = await Product.create({ name, description, price, category });
        res.status(201).json({ message: "Product Created Successfully", product })

    } catch (error) {
        return res.status(500).json({ message: error.message })

    }

}

export const getPrdocuts = async (req, res) => {

    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const products = await Product.find().skip(skip).limit(limit);

        const totalProducts = await Product.countDocuments();

        res.status(200).json({
            success: true,
            products,
            currentPage: page,
            totalPages: Math.ceil(totalProducts / limit),
            totalProducts
        })

    } catch (error) {
        return res.status(500).json({ message: error.message })

    }

}


export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json({
            success: true,
            product
        });

    } catch (error) {
        return res.status(500).json({ message: error.message })

    }
}


export const searchProduct = async (req, res) => {
    try {
        const searchTerm = req.query.term;
        if (!searchTerm) return res.status(400).json({ message: "Search Term Does Not Match" });

        const products = await Product.find({
            $or: [
                { name: { $regex: searchTerm, $options: "i" } },
                { description: { $regex: searchTerm, $options: "i" } }
            ]
        })

        res.status(200).json({
            success: true,
            products
        });


    } catch (error) {
        return res.status(500).json({ message: error.message })

    }
}




export const addProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // check if user already reviewed
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.userId.toString()
    );
    if (alreadyReviewed) return res.status(400).json({ message: "Product already reviewed" });

    // fetch user to get name
    const user = await User.findById(req.userId);

    const review = {
      user: req.userId, // user id
      name: user.name,  // get name from DB
      rating: Number(rating),
      comment
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.averageRating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({
      success: true,
      message: "Review added"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getProductReviews = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id).select("reviews averageRating numReviews");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      reviews: product.reviews,
      averageRating: product.averageRating,
      numReviews: product.numReviews,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
