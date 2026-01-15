import { Cart } from "../model/cart.model.js";
import { Product } from "../model/product.model.js";

/**
 * ➕ Add item to cart
 * POST /api/cart
 */
export const addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const userId = req.userId;

  try {
    // optional: check product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [],
      });
    }

    const index = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (index > -1) {
      cart.items[index].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add to cart" });
  }
};

/**
 * 🛒 Get logged-in user's cart
 * GET /api/cart
 */
export const getCart = async (req, res) => {
  try {
    const userId = req.userId;

    const cart = await Cart.findOne({ user: userId })
      .populate("items.product");

    res.status(200).json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};

/**
 * ❌ Remove item from cart
 * DELETE /api/cart/:itemId
 */
export const removeCartItem = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.id(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    item.remove();
    await cart.save();

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Failed to remove item" });
  }
};
