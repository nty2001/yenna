const Products = require("../models/productModel");

class API {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  // loc
  filtering() {
    const queryObj = { ...this.queryString };
    // truoc khi xoa
    console.log({ before: queryObj }); // console.log(req.query)
    // sau khi xoa
    const excluded = ["page", "sort", "limit"];
    excluded.forEach((e) => delete queryObj[e]);
    console.log({ after: queryObj });
    let queryStr=JSON.stringify(queryObj);
    console.log({queryObj,queryStr});
    queryStr=queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g,match=>"$"+match);
    this.query.find(JSON.parse(queryStr))
    // loc theo gia, ky tu
    // gt: loc lon hon 10, lon hon 60 kh co
    // lt: loc cac san pham co gia tri nho hon VD: nho hon 60
    return this;
  }
  //sapxep
  sorting() {
    // neu la chữ
    if(this.queryString.sort){
      // chuyển các ký tự thành
      const sortBy=this.queryString.sort.split(",").join("");
      this.query=this.query.sort(sortBy)
    }else{
      //  lọc theo tất cả trừ createdAt 
      this.query=this.query.sort("-createdAt")
    }
    return this;
  }
  // phantrang
  paginating() {
    const page=this.queryString.page * 1 || 1;
    // 1 có trang có bn sản phẩm VD 1 trang có 1 sp,
    const limit = this.queryString.limit * 1 || 8;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;

  }
}

const productCtrl = {
  getProducts: async (req, res) => {
    try {
      const features = new API(Products.find(), req.query).filtering().sorting().paginating();

      const products = await features.query;
      res.json({ status:"secces", result:products.length,products:products });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      const {
        product_id,
        title,
        description,
        price,
        contact,
        images,
        categories,
      } = req.body;
      //   res.json(req.body.contact);

      if (!images) {
        return res.status(400).json({ msg: "No images Selected" });
      }
      const product = await Products.findOne({ product_id });
      if (product) {
        return res.status(400).json({ msg: "This product already exist" });
      }
      const newProduct = await Products({
        product_id,
        title: title.toLowerCase(),
        description,
        price,
        contact,
        images,
        categories,
      });

      //   res.json({newProduct})
      await newProduct.save();
      res.json("create a product");
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await Products.findByIdAndDelete(req.params.id);
      res.json("delete a product");
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const {
        product_id,
        title,
        description,
        price,
        contact,
        images,
        categories,
      } = req.body;
      if (!images) {
        return res.status(400).json({ msg: "No images Selected" });
      }
      await Products.findOneAndUpdate(
        { _id: req.params.id },
        {
          title,
          description,
          price,
          contact,
          images,
          categories,
        }
      );
      res.json("update a product");
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = productCtrl;
