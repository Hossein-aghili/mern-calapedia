import Brand from "../Models/brand.model.js";
import Category from "../Models/category.model.js";
import Product from "../Models/product.model.js";

export const search = catchAsync(async (req, res, next) => {
  const { query } = req.body;
  const { limit = 10, page = 1 } = req?.query;
  const skip = (page - 1) * limit;
  const products = await Product.find({
    title: { $regex: query, $options: "i" },
  })
    .sort("-createdAt")
    .skip(skip)
    .limit(limit);
  const brands = await Brand.find({ name: { $regex: query, $options: "i" } })
    .sort("-createdAt")
    .skip(skip)
    .limit(limit);
  const categories = await Category.find({
    $and: [{ name: { $regex: query, $options: "i" } }, { isActive: true }],
  })
    .sort("-createdAt")
    .skip(skip)
    .limit(limit);

    return res.status(200).json({
        data:{brands,categories,products},
        success:true
    })
});