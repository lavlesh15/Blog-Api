const Blogs = require("../models/Blogs.js");

exports.getAllBlogsController = async (req, res) => {
  // Controller that fetch all blogs.

  try {
    const data = await Blogs.find({});
    res.status(200).json({
      success: true,
      message: "Retrieved successfully",
      data,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getBlogController = async (req, res) => {
  // Controller that fetch blog of specific Id
  // Input : Id as Param , output : Blog with Specific id

  try {
    const id = req.params.id;
    const blog = await Blogs.findById(id);

    if (!blog) {
      throw new Error("No Such Blog Exist");
    }

    res.status(200).json({
      success: "true",
      message: "Retrieved successfully",
      data: blog,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

exports.createBlogController = async (req, res) => {
  // Controller that creates a new Blog
  // Input : data need for blog through req.Body

  try {
    const { title, content, author } = req.body;
    const newBlog = await Blogs.create({
      title,
      content,
      author,
    });

    res.status(201).json({
      success: "true",
      data: newBlog,
    });
  } catch (error) {
    res.status(401).json({
      success: "false",
      message: error.message,
    });
  }
};

exports.deleteBlogController = async (req, res) => {
  // Controller to delete blog with specific Id
  // Input : Id of blog

  try {
    const id = req.params.id;
    const blog = await Blogs.findById(id);

    if (!blog) {
      throw new Error("No Such Blog Exist");
    }

    const deletedBlog = await Blogs.deleteOne({ _id: id });
    res.status(200).json({
      success: "true",
      message: "Deleted successfully",
      data: deletedBlog,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

exports.UpdateBlogController = async (req, res) => {
  // Controller to update blog with specific Id
  // input : Id of blog and data to be updated

  try {
    const id = req.params.id;
    const blog = await Blogs.findById(id);

    if (!blog) {
      throw new Error("No Such Blog Exist");
    }

    const dataToUpdate = req.body;

    const updatedData = await Blogs.findOneAndUpdate(
      { _id: id },
      dataToUpdate,
      { new: true }
    );

    res.status(200).json({
      success: "true",
      message: "updated successfully",
      data: updatedData,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

exports.addLikeController = async (req, res) => {
  // Controller to Add like to blog with specific Id
  // input : Id of blog

  try {
    const id = req.params.id;
    const blog = await Blogs.findById(id);

    if (!blog) {
      throw new Error("No Such Blog Exist");
    }

    blog.likes += 1;
    const data = await blog.save();

    res.status(200).json({
      success: "true",
      message: "Like Added successfully",
      data,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

exports.clapBlogController = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blogs.findById(id);

    if (!blog) {
      throw new Error("No such blog exixst");
    }
    
      blog.clap += 1;

    const data = await blog.save();

    res.status(200).json({
      success: true,
      message: "clap incremented Succesfully",
      data,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
